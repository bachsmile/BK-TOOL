const puppeteer = require('puppeteer');

async function runSynchronizedBrowsers() {
  console.log('Launching 3 synchronized browsers...');

  // Mảng chứa các instance browser và page
  const browsers = [];
  const pages = [];

  try {
    // Khởi động 3 trình duyệt với vị trí khác nhau
    for (let i = 0; i < 3; i++) {
      const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: [
          `--window-size=800,600`,
          `--window-position=${i * 810},0`
        ]
      });
      browsers.push(browser);

      // Mở trang mới và truy cập URL đăng nhập
      const page = await browser.newPage();
      pages.push(page);

      // Truy cập trang đăng nhập
      await page.goto('http://avhmarketplace.avinadev.com:8080/login', {
        waitUntil: 'networkidle2',
        timeout: 60000
      });

      console.log(`Browser ${i+1} has loaded the login page.`);
    }

    console.log('All browsers have loaded the login page.');
    console.log('Setting up mouse event synchronization...');

    // Thiết lập lắng nghe sự kiện từ trình duyệt đầu tiên và đồng bộ với các trình duyệt khác
    const mainPage = pages[0];

    // Theo dõi các sự kiện chuột trên trình duyệt đầu tiên
    await mainPage.evaluate(() => {
      // Tạo overlay để hiển thị thông báo
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.backgroundColor = 'rgba(0, 255, 0, 0.3)';
      overlay.style.padding = '10px';
      overlay.style.zIndex = '9999';
      overlay.style.fontWeight = 'bold';
      overlay.textContent = 'BROWSER 1 (MASTER) - Thao tác trên trình duyệt này sẽ đồng bộ với các trình duyệt khác';
      document.body.appendChild(overlay);

      // Hàm gửi thông báo đến Node.js
      window.sendCoordinates = function(eventType, x, y) {
        const eventData = {
          type: eventType,
          x: x,
          y: y
        };
        // Gửi dữ liệu thông qua console để Puppeteer có thể bắt được
        console.log(`SYNC_EVENT:${JSON.stringify(eventData)}`);
      };

      // Lắng nghe sự kiện click
      document.addEventListener('click', (event) => {
        window.sendCoordinates('click', event.clientX, event.clientY);
      });

      // Lắng nghe sự kiện mousedown
      document.addEventListener('mousedown', (event) => {
        window.sendCoordinates('mousedown', event.clientX, event.clientY);
      });

      // Lắng nghe sự kiện mouseup
      document.addEventListener('mouseup', (event) => {
        window.sendCoordinates('mouseup', event.clientX, event.clientY);
      });

      // Lắng nghe sự kiện input để đồng bộ nhập liệu
      document.addEventListener('input', (event) => {
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
          const value = event.target.value;
          const id = event.target.id;
          const className = event.target.className;
          const name = event.target.name;
          const type = event.target.type;
          const tagName = event.target.tagName;
          const selector = event.target.tagName.toLowerCase() +
            (id ? `#${id}` : '') +
            (name ? `[name="${name}"]` : '') +
            (type ? `[type="${type}"]` : '');

          console.log(`SYNC_INPUT:${JSON.stringify({
            selector,
            value,
            id,
            className,
            name,
            type,
            tagName
          })}`);
        }
      });
    });

    // Thiết lập overlay thông báo cho các trình duyệt phụ
    for (let i = 1; i < pages.length; i++) {
      await pages[i].evaluate((browserNumber) => {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
        overlay.style.padding = '10px';
        overlay.style.zIndex = '9999';
        overlay.style.fontWeight = 'bold';
        overlay.textContent = `BROWSER ${browserNumber+1} (SLAVE) - Trình duyệt này đang được điều khiển tự động`;
        document.body.appendChild(overlay);
      }, i);
    }

    // Lắng nghe và xử lý sự kiện từ trình duyệt đầu tiên
    mainPage.on('console', async (msg) => {
      const text = msg.text();

      // Xử lý sự kiện chuột
      if (text.startsWith('SYNC_EVENT:')) {
        try {
          const eventData = JSON.parse(text.substring(11));
          console.log(`Captured ${eventData.type} event at (${eventData.x}, ${eventData.y})`);

          // Đồng bộ sự kiện tới các trình duyệt khác
          for (let i = 1; i < pages.length; i++) {
            const targetPage = pages[i];
            await targetPage.mouse.move(eventData.x, eventData.y);

            if (eventData.type === 'click') {
              await targetPage.mouse.click(eventData.x, eventData.y);
            } else if (eventData.type === 'mousedown') {
              await targetPage.mouse.down();
            } else if (eventData.type === 'mouseup') {
              await targetPage.mouse.up();
            }
          }
        } catch (err) {
          console.error('Error processing mouse event:', err);
        }
      }

      // Xử lý sự kiện nhập liệu
      if (text.startsWith('SYNC_INPUT:')) {
        try {
          const inputData = JSON.parse(text.substring(11));
          console.log(`Captured input event on ${inputData.selector}, value: ${inputData.value}`);

          // Đồng bộ nhập liệu tới các trình duyệt khác
          for (let i = 1; i < pages.length; i++) {
            const targetPage = pages[i];

            // Thử nhiều cách khác nhau để xác định đúng phần tử input
            const strategies = [
              // Theo selector tổng hợp
              async () => {
                if (await targetPage.$(inputData.selector)) {
                  await targetPage.evaluate((selector, value) => {
                    document.querySelector(selector).value = value;
                  }, inputData.selector, inputData.value);
                  return true;
                }
                return false;
              },
              // Theo ID
              async () => {
                if (inputData.id && await targetPage.$(`#${inputData.id}`)) {
                  await targetPage.evaluate((id, value) => {
                    document.getElementById(id).value = value;
                  }, inputData.id, inputData.value);
                  return true;
                }
                return false;
              },
              // Theo name
              async () => {
                if (inputData.name && await targetPage.$(`[name="${inputData.name}"]`)) {
                  await targetPage.evaluate((name, value) => {
                    document.querySelector(`[name="${name}"]`).value = value;
                  }, inputData.name, inputData.value);
                  return true;
                }
                return false;
              },
              // Theo type và vị trí tương đối
              async () => {
                if (inputData.type) {
                  await targetPage.evaluate((type, value) => {
                    const inputs = Array.from(document.querySelectorAll(`input[type="${type}"]`));
                    if (inputs.length > 0) {
                      inputs[0].value = value;
                    }
                  }, inputData.type, inputData.value);
                  return true;
                }
                return false;
              }
            ];

            // Thử từng chiến lược cho đến khi thành công
            for (const strategy of strategies) {
              if (await strategy()) {
                break;
              }
            }
          }
        } catch (err) {
          console.error('Error processing input event:', err);
        }
      }
      // Khi phát hiện thay đổi URL
      if (text.startsWith('SYNC_URL:')) {
        const newUrl = text.substring(9);
        console.log(`Detected URL change: ${newUrl}, updating other browsers...`);

        // Cập nhật URL trên tất cả trình duyệt phụ
        for (let i = 1; i < pages.length; i++) {
          await pages[i].goto(newUrl, { waitUntil: 'networkidle2' });
        }
      }
    });

    console.log('Synchronization set up. Actions on Browser 1 will be mirrored to Browsers 2 and 3.');
    console.log('Press Ctrl+C to exit the program.');

    // Giữ script chạy đến khi người dùng dừng lại
    await new Promise(resolve => {
      process.on('SIGINT', () => {
        console.log('Received SIGINT. Closing browsers...');
        resolve();
      });
    });

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Đóng tất cả các trình duyệt
    for (const browser of browsers) {
      await browser.close();
    }
    console.log('All browsers closed.');
  }
}

// Chạy chương trình
runSynchronizedBrowsers();