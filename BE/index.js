const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');

// Danh sách tất cả proxy
const proxyList = [
  {
    ip: '38.154.227.167',
    port: '5868',
    username: 'wurmknwe',
    password: 'r2ljyi2zkffy'
  },
  {
    ip: '38.153.152.244',
    port: '9594',
    username: 'wurmknwe',
    password: 'r2ljyi2zkffy'
  },
  {
    ip: '86.38.234.176',
    port: '6630',
    username: 'wurmknwe',
    password: 'r2ljyi2zkffy'
  },
  {
    ip: '173.211.0.148',
    port: '6641',
    username: 'wurmknwe',
    password: 'r2ljyi2zkffy'
  },
  {
    ip: '161.123.152.115',
    port: '6360',
    username: 'wurmknwe',
    password: 'r2ljyi2zkffy'
  },
  {
    ip: '216.10.27.159',
    port: '6837',
    username: 'wurmknwe',
    password: 'r2ljyi2zkffy'
  },
  {
    ip: '154.36.110.199',
    port: '6853',
    username: 'wurmknwe',
    password: 'r2ljyi2zkffy'
  },
  {
    ip: '173.0.9.70',
    port: '5653',
    username: 'wurmknwe',
    password: 'r2ljyi2zkffy'
  },
  {
    ip: '45.151.162.198',
    port: '6600',
    username: 'wurmknwe',
    password: 'r2ljyi2zkffy'
  },
  {
    ip: '185.199.229.156',
    port: '7492',
    username: 'wurmknwe',
    password: 'r2ljyi2zkffy'
  }
];

// Hàm test proxy
async function testProxy(proxy) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      `--proxy-server=http://${proxy.ip}:${proxy.port}`,
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });

  try {
    const page = await browser.newPage();
    await page.authenticate({
      username: proxy.username,
      password: proxy.password
    });

    await page.goto('http://example.com', {
      waitUntil: 'networkidle2',
      timeout: 10000
    });

    await browser.close();
    return true;
  } catch (error) {
    console.log(`Proxy ${proxy.ip}:${proxy.port} failed: ${error.message}`);
    await browser.close();
    return false;
  }
}

// Hàm lấy danh sách proxy hoạt động
async function getFreeProxies() {
  console.log('Testing proxies...');
  const workingProxies = [];
  let currentIndex = 0;

  // Tiếp tục test cho đến khi có đủ 3 proxy hoạt động hoặc đã test hết danh sách
  while (workingProxies.length < 3 && currentIndex < proxyList.length) {
    const proxy = proxyList[currentIndex];
    const isWorking = await testProxy(proxy);
    if (isWorking) {
      console.log(`Proxy ${proxy.ip}:${proxy.port} is working!`);
      workingProxies.push({
        url: `http://${proxy.ip}:${proxy.port}`,
        username: proxy.username,
        password: proxy.password
      });
    }
    currentIndex++;
  }

  if (workingProxies.length < 3) {
    throw new Error(`Not enough working proxies. Only found ${workingProxies.length}`);
  }

  return workingProxies;
}

// Hàm thiết lập overlay đơn giản
async function setupPageEvents(page, isMaster = false, browserNumber = 0, proxyAddress = '') {
  try {
    // Đợi trang load với timeout ngắn hơn
    await Promise.race([
      page.waitForFunction(() => document.readyState === 'complete'),
      new Promise(resolve => setTimeout(resolve, 5000))
    ]);
    
    // Thiết lập event listeners
    await page.evaluate((isMaster, browserNumber, proxyAddress) => {
      try {
        // Xóa overlay cũ nếu có
        const existingOverlay = document.querySelector('.browser-overlay');
        if (existingOverlay) {
          existingOverlay.remove();
        }

        const div = document.createElement('div');
        div.className = 'browser-overlay';
        div.style.cssText = `position:fixed;top:0;left:0;padding:5px;z-index:9999;font-family:Arial;font-size:11px;
          background:${isMaster ? 'rgba(0,255,0,0.8)' : 'rgba(255,0,0,0.8)'};color:white;border-radius:3px;`;
        div.innerHTML = `${isMaster ? '🎮 Master' : '🔄 Slave'} #${browserNumber + 1}<br>${proxyAddress}`;
        document.body.appendChild(div);

        if (isMaster) {
          // Xóa event listeners cũ
          if (window._masterClickHandler) {
            document.removeEventListener('click', window._masterClickHandler);
          }
          if (window._masterScrollHandler) {
            window.removeEventListener('scroll', window._masterScrollHandler);
          }
          if (window._masterInputHandler) {
            document.removeEventListener('input', window._masterInputHandler);
          }
          if (window._masterPopStateHandler) {
            window.removeEventListener('popstate', window._masterPopStateHandler);
          }

          // Theo dõi sự kiện click trên master
          window._masterClickHandler = (event) => {
            try {
              const rect = event.target.getBoundingClientRect();
              const x = event.clientX - rect.left;
              const y = event.clientY - rect.top;
              console.log(`SYNC_CLICK:${JSON.stringify({x, y, selector: getSelector(event.target)})}`);

              // Kiểm tra nếu là link
              const link = event.target.closest('a');
              if (link && link.href) {
                event.preventDefault();
                console.log(`SYNC_URL:${link.href}`);
              }
            } catch (error) {
              console.error('Error in click handler:', error);
            }
          };
          document.addEventListener('click', window._masterClickHandler);

          // Theo dõi scroll với throttle
          window._masterScrollHandler = (() => {
            let lastScrollTime = 0;
            const SCROLL_THROTTLE = 16; // Giảm xuống 16ms (khoảng 60fps)
            
            return () => {
              const now = Date.now();
              if (now - lastScrollTime >= SCROLL_THROTTLE) {
                lastScrollTime = now;
                console.log(`SYNC_SCROLL:${JSON.stringify({
                  x: window.scrollX,
                  y: window.scrollY
                })}`);
              }
            };
          })();
          window.addEventListener('scroll', window._masterScrollHandler, { passive: true });

          // Theo dõi input với debounce
          window._masterInputHandler = (() => {
            let inputTimeout;
            return (event) => {
              if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
                clearTimeout(inputTimeout);
                inputTimeout = setTimeout(() => {
                  try {
                    console.log(`SYNC_INPUT:${JSON.stringify({
                      selector: getSelector(event.target),
                      value: event.target.value
                    })}`);
                  } catch (error) {
                    console.error('Error in input handler:', error);
                  }
                }, 100);
              }
            };
          })();
          document.addEventListener('input', window._masterInputHandler);

          // Theo dõi chuyển trang
          const oldPushState = history.pushState;
          history.pushState = function(state, title, url) {
            oldPushState.call(this, state, title, url);
            try {
              console.log(`SYNC_URL:${url || window.location.href}`);
            } catch (error) {
              console.error('Error in pushState handler:', error);
            }
          };

          window._masterPopStateHandler = () => {
            try {
              console.log(`SYNC_URL:${window.location.href}`);
            } catch (error) {
              console.error('Error in popState handler:', error);
            }
          };
          window.addEventListener('popstate', window._masterPopStateHandler);

          // Theo dõi keydown
          window._masterKeyDownHandler = (event) => {
            try {
              const targetElement = event.target;
              console.log(`SYNC_KEYDOWN:${JSON.stringify({
                key: event.key,
                code: event.code,
                selector: getSelector(targetElement),
                isInput: targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA'
              })}`);
            } catch (error) {
              console.error('Error in keydown handler:', error);
            }
          };
          document.addEventListener('keydown', window._masterKeyDownHandler);

          // Theo dõi keyup
          window._masterKeyUpHandler = (event) => {
            try {
              const targetElement = event.target;
              console.log(`SYNC_KEYUP:${JSON.stringify({
                key: event.key,
                code: event.code,
                selector: getSelector(targetElement),
                isInput: targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA'
              })}`);
            } catch (error) {
              console.error('Error in keyup handler:', error);
            }
          };
          document.addEventListener('keyup', window._masterKeyUpHandler);

          // Theo dõi keypress
          window._masterKeyPressHandler = (event) => {
            try {
              const targetElement = event.target;
              console.log(`SYNC_KEYPRESS:${JSON.stringify({
                key: event.key,
                code: event.code,
                selector: getSelector(targetElement),
                isInput: targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA'
              })}`);
            } catch (error) {
              console.error('Error in keypress handler:', error);
            }
          };
          document.addEventListener('keypress', window._masterKeyPressHandler);

          // Theo dõi submit form
          window._masterFormSubmitHandler = (event) => {
            try {
              event.preventDefault();
              console.log(`SYNC_SUBMIT:${JSON.stringify({
                selector: getSelector(event.target),
                action: event.target.action || window.location.href
              })}`);
            } catch (error) {
              console.error('Error in form submit handler:', error);
            }
          };
          document.addEventListener('submit', window._masterFormSubmitHandler);

          // Cleanup old event listeners
          if (window._masterKeyDownHandler) document.removeEventListener('keydown', window._masterKeyDownHandler);
          if (window._masterKeyUpHandler) document.removeEventListener('keyup', window._masterKeyUpHandler);
          if (window._masterKeyPressHandler) document.removeEventListener('keypress', window._masterKeyPressHandler);
          if (window._masterFormSubmitHandler) document.removeEventListener('submit', window._masterFormSubmitHandler);
        }

        // Hàm lấy selector chính xác của element
        function getSelector(element) {
          try {
            if (!element) return '';
            if (element.id) return `#${element.id}`;
            if (element.className) return `.${element.className.split(' ').join('.')}`;
            
            let path = [];
            let current = element;
            while (current && current !== document.body) {
              let selector = current.tagName.toLowerCase();
              if (current.id) {
                selector += `#${current.id}`;
                path.unshift(selector);
                break;
              } else {
                let nth = 1;
                let sibling = current;
                while (sibling.previousElementSibling) {
                  sibling = sibling.previousElementSibling;
                  if (sibling.tagName === current.tagName) nth++;
                }
                if (nth > 1) selector += `:nth-of-type(${nth})`;
              }
              path.unshift(selector);
              current = current.parentElement;
            }
            return path.join(' > ');
          } catch (error) {
            console.error('Error in getSelector:', error);
            return '';
          }
        }
      } catch (error) {
        // Bỏ qua lỗi trong quá trình setup
      }
    }, isMaster, browserNumber, proxyAddress).catch(() => {});

  } catch (error) {
    // Chỉ log lỗi không liên quan đến navigation/execution context
    if (!error.message.includes('Execution context was destroyed') && 
        !error.message.includes('net::ERR_ABORTED')) {
      console.error(`Error in setupPageEvents for browser ${browserNumber}:`, error);
    }
  }
}

async function runSynchronizedBrowsers() {
  console.log('Launching 3 synchronized browsers...');
  const workingProxies = await getFreeProxies();
  const browsers = [];
  const pages = [];

  try {
    // Khởi động 3 trình duyệt với vị trí khác nhau
    for (let i = 0; i < 3; i++) {
      const proxy = workingProxies[i];
      const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {
          width: 600,
          height: 400
        },
        args: [
          `--window-size=600,400`,
          `--window-position=${i * 610},0`,
          `--proxy-server=${proxy.url}`,
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ]
      });
      browsers.push(browser);

      const page = await browser.newPage();
      pages.push(page);

      // Đóng các tab blank
      const browserPages = await browser.pages();
      for (const p of browserPages) {
        if (p !== page) {
          await p.close();
        }
      }

      // Thiết lập xác thực proxy
      await page.authenticate({
        username: proxy.username,
        password: proxy.password
      });

      try {
        await page.goto('http://example.com', {
          waitUntil: 'networkidle2',
          timeout: 60000
        });
        console.log(`Browser ${i+1} has loaded the test page with proxy: ${proxy.url}`);
        
        // Thiết lập các event listener và overlay cho trang sau khi load
        await setupPageEvents(page, i === 0, i, proxy.url);
      } catch (error) {
        console.error(`Failed to load page in Browser ${i+1}:`, error.message);
        throw error;
      }
    }

    // Thiết lập đồng bộ từ master đến các slave
    const mainPage = pages[0];
    mainPage.on('console', async (msg) => {
      const text = msg.text();

      // Xử lý click
      if (text.startsWith('SYNC_CLICK:')) {
        try {
          const data = JSON.parse(text.substring(11));
          await Promise.all(pages.slice(1).map(page =>
            page.evaluate((selector, x, y) => {
              const element = document.querySelector(selector);
              if (element) {
                const event = new MouseEvent('click', {
                  bubbles: true,
                  cancelable: true,
                  clientX: x,
                  clientY: y
                });
                element.dispatchEvent(event);
              }
            }, data.selector, data.x, data.y)
            .catch(() => {}) // Bỏ qua lỗi execution context
          ));
        } catch (err) {
          // Chỉ log lỗi không liên quan đến navigation
          if (!err.message.includes('Execution context was destroyed') && 
              !err.message.includes('net::ERR_ABORTED')) {
            console.error('Error syncing click:', err);
          }
        }
      }

      // Xử lý scroll
      if (text.startsWith('SYNC_SCROLL:')) {
        try {
          const data = JSON.parse(text.substring(12));
          await Promise.all(pages.slice(1).map(page => 
            page.evaluate((x, y) => {
              window.scrollTo({
                left: x,
                top: y,
                behavior: 'instant' // Sử dụng instant để scroll ngay lập tức
              });
            }, data.x, data.y).catch(() => {})
          ));
        } catch (err) {
          if (!err.message.includes('Execution context was destroyed')) {
            console.error('Error syncing scroll:', err);
          }
        }
      }

      // Xử lý input
      if (text.startsWith('SYNC_INPUT:')) {
        try {
          const data = JSON.parse(text.substring(11));
          for (let i = 1; i < pages.length; i++) {
            await pages[i].evaluate((selector, value) => {
              const element = document.querySelector(selector);
              if (element) {
                element.value = value;
                element.dispatchEvent(new Event('input', { bubbles: true }));
              }
            }, data.selector, data.value);
          }
        } catch (err) {
          console.error('Error syncing input:', err);
        }
      }

      // Xử lý chuyển trang
      if (text.startsWith('SYNC_URL:')) {
        try {
          const url = text.substring(9);
          console.log(`Navigating to: ${url}`);
          
          // Chuyển trang master trước
          await mainPage.goto(url, { 
            waitUntil: 'domcontentloaded', // Thay đổi từ networkidle2 sang domcontentloaded
            timeout: 30000 
          });
          await setupPageEvents(mainPage, true, 0, workingProxies[0].url);
          
          // Chuyển trang các slave
          await Promise.all(pages.slice(1).map(async (page, index) => {
            try {
              await page.goto(url, { 
                waitUntil: 'domcontentloaded',
                timeout: 30000 
              });
              await setupPageEvents(page, false, index + 1, workingProxies[index + 1].url);
            } catch (err) {
              // Bỏ qua lỗi navigation
              if (!err.message.includes('net::ERR_ABORTED')) {
                console.error(`Error navigating slave ${index + 1}:`, err);
              }
            }
          }));

          console.log('Navigation completed');
        } catch (err) {
          // Chỉ log lỗi không liên quan đến navigation
          if (!err.message.includes('net::ERR_ABORTED')) {
            console.error('Error during navigation:', err);
          }
        }
      }

      // Xử lý keydown
      if (text.startsWith('SYNC_KEYDOWN:')) {
        try {
          const data = JSON.parse(text.substring(12));
          await Promise.all(pages.slice(1).map(page =>
            page.evaluate((data) => {
              const element = document.querySelector(data.selector);
              if (element) {
                const event = new KeyboardEvent('keydown', {
                  key: data.key,
                  code: data.code,
                  bubbles: true,
                  cancelable: true
                });
                element.dispatchEvent(event);
                if (data.isInput && data.key.length === 1) {
                  element.value += data.key;
                }
              }
            }, data).catch(() => {})
          ));
        } catch (err) {
          if (!err.message.includes('Execution context was destroyed')) {
            console.error('Error syncing keydown:', err);
          }
        }
      }

      // Xử lý keyup
      if (text.startsWith('SYNC_KEYUP:')) {
        try {
          const data = JSON.parse(text.substring(10));
          await Promise.all(pages.slice(1).map(page =>
            page.evaluate((data) => {
              const element = document.querySelector(data.selector);
              if (element) {
                const event = new KeyboardEvent('keyup', {
                  key: data.key,
                  code: data.code,
                  bubbles: true,
                  cancelable: true
                });
                element.dispatchEvent(event);
              }
            }, data).catch(() => {})
          ));
        } catch (err) {
          if (!err.message.includes('Execution context was destroyed')) {
            console.error('Error syncing keyup:', err);
          }
        }
      }

      // Xử lý keypress
      if (text.startsWith('SYNC_KEYPRESS:')) {
        try {
          const data = JSON.parse(text.substring(13));
          await Promise.all(pages.slice(1).map(page =>
            page.evaluate((data) => {
              const element = document.querySelector(data.selector);
              if (element) {
                const event = new KeyboardEvent('keypress', {
                  key: data.key,
                  code: data.code,
                  bubbles: true,
                  cancelable: true
                });
                element.dispatchEvent(event);
              }
            }, data).catch(() => {})
          ));
        } catch (err) {
          if (!err.message.includes('Execution context was destroyed')) {
            console.error('Error syncing keypress:', err);
          }
        }
      }

      // Xử lý submit form
      if (text.startsWith('SYNC_SUBMIT:')) {
        try {
          const data = JSON.parse(text.substring(12));
          await Promise.all(pages.slice(1).map(page =>
            page.evaluate((data) => {
              const form = document.querySelector(data.selector);
              if (form) {
                form.submit();
              }
            }, data).catch(() => {})
          ));
        } catch (err) {
          if (!err.message.includes('Execution context was destroyed')) {
            console.error('Error syncing form submit:', err);
          }
        }
      }
    });

    console.log('Synchronization set up. Actions on Master will be mirrored to Slaves.');
    console.log('Press Ctrl+C to exit the program.');

    await new Promise(resolve => {
      process.on('SIGINT', () => {
        console.log('Received SIGINT. Closing browsers...');
        resolve();
      });
    });

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    for (const browser of browsers) {
      await browser.close();
    }
    console.log('All browsers closed.');
  }
}

// Chạy chương trình
runSynchronizedBrowsers();