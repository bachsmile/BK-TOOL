<template>
  <div class="sidebar" :class="{ 'close': isShowBar }">
    <div class="logo-details">
      <i class='bx bxl-c-plus-plus'></i>
      <span class="logo_name">BS TEAM</span>

    </div>
    <ul class="nav-links">

      <li v-for="item in listMenu" :key="item.showId" :class="{ showMenu: item.show }">
        <div class="iocn-link" @click="toggleSidebarParent(item)">
          <a href="#">
            <i class='bx bx-collection'></i>
            <span class="link_name">{{ t(item.name) }}</span>
          </a>
          <i v-if="item.subMenu?.length" class='bx bxs-chevron-down arrow'></i>
        </div>
        <ul v-if="item.subMenu?.length" class="sub-menu">
          <li v-for="(subItem, idx) in item?.subMenu" :key="idx">
            <RouterLink :to="subItem.link">{{ t(subItem.name) }}</RouterLink>
          </li>
        </ul>
      </li>
      <li>
        <div class="profile-details">
          <div class="profile-content" @click="toggleSidebar">
            <img src="https://img.pikbest.com/origin/09/28/78/14qpIkbEsTIaP.jpg!sw800" alt="profileImg">
          </div>
          <div class="name-job">
            <div class="profile_name">Prem Shahi</div>
            <div class="job">Web Desginer</div>
          </div>
          <i class='bx bx-log-out'></i>
        </div>
      </li>
    </ul>
  </div>
  <section class="home-section">
    <slot></slot>
  </section>
</template>

<script setup lang="ts">
import { MenuItem } from '@/configs/interfaces';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
const { t } = window.i18n()
const isShowBar = ref(true)
function toggleSidebar() {
  isShowBar.value = !isShowBar.value
}


const listMenu = ref<MenuItem[]>([
  {
    name: 'home',
    icon: './assets/icons/home.svg',
    link: '/mark-test',
    showId: 0,
  },
  {
    name: 'education',
    icon: './assets/icons/setting.svg',
    show: false,
    showId: 1,
    subMenu: [
      {
        name: 'time_line',
        link: '/admin/time-line',
        parentId: 1,
      },
    ],
  },
  {
    name: 'Api',
    icon: './assets/icons/org.svg',
    show: false,
    showId: 2,
    subMenu: [
      {
        name: 'education',
        link: '/api/edu',
        parentId: 2,
      },
    ],
  },
  {
    name: 'report',
    icon: './assets/icons/report.svg',
    show: false,
    showId: 3,
    subMenu: [
      {
        name: 'test-report',
        link: '/mark-test/test-report',
        parentId: 3,
      },
      // {
      //   name: 'test-analysis',
      //   link: '/mark-test/test-analysis',
      //   parentId: 3,
      // },
      {
        name: 'diary',
        link: '/mark-test/diary',
        parentId: 3,
      },
    ],
  },
  {
    name: 'help',
    icon: './assets/icons/help.svg',
    show: false,
    showId: 4,
    subMenu: [
      {
        name: 'copyright',
        link: '/mark-test/copyright',
        parentId: 4,
      },
      {
        name: 'instruction-manual',
        link: '/instruction-manual',
        parentId: 4,
      },
      {
        name: 'product-information',
        link: '/mark-test/product-information',
        parentId: 4,
      },
    ],
  },
  {
    name: 'More',
    icon: './assets/icons/help.svg',
    show: false,
    showId: 5,
    subMenu: [
      {
        name: 'fashion',
        link: '/admin/fashion',
        parentId: 5,
      },
    ],
  },
]);

function toggleSidebarParent(item: MenuItem) {
  console.log(item);

  item.show = !item.show
}
const router = useRouter()
// function changeRouter(menu) {
//   this.router.push({ name: 'dashboard' })
// }
</script>

<style lang="scss" scoped>
/* Google Fonts Import Link */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

body {
  overflow: hidden;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 260px;
  background: #11101d;
  z-index: 100;
  transition: all 0.5s ease;
}

.sidebar.close {
  width: 78px;
}

.sidebar .logo-details {
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
}

.sidebar .logo-details i {
  font-size: 30px;
  color: #fff;
  height: 50px;
  min-width: 78px;
  text-align: center;
  line-height: 50px;
}

.sidebar .logo-details .logo_name {
  font-size: 22px;
  color: #fff;
  font-weight: 600;
  transition: 0.3s ease;
  transition-delay: 0.1s;
}

.sidebar.close .logo-details .logo_name {
  transition-delay: 0s;
  opacity: 0;
  pointer-events: none;
}

.sidebar .nav-links {
  height: 100%;
  padding: 30px 0 150px 0;
  overflow: auto;
}

.sidebar.close .nav-links {
  overflow: visible;
}

.sidebar .nav-links::-webkit-scrollbar {
  display: none;
}

.sidebar .nav-links li {
  position: relative;
  list-style: none;
  transition: all 0.4s ease;
}

.sidebar .nav-links li:hover {
  background: #1d1b31;
}

.sidebar .nav-links li .iocn-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar.close .nav-links li .iocn-link {
  display: block
}

.sidebar .nav-links li i {
  height: 50px;
  min-width: 78px;
  text-align: center;
  line-height: 50px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sidebar .nav-links li.showMenu i.arrow {
  transform: rotate(-180deg);
}

.sidebar.close .nav-links i.arrow {
  display: none;
}

.sidebar .nav-links li a {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.sidebar .nav-links li a .link_name {
  font-size: 18px;
  font-weight: 400;
  color: #fff;
  transition: all 0.4s ease;
}

.sidebar.close .nav-links li a .link_name {
  opacity: 0;
  pointer-events: none;
}

.sidebar .nav-links li .sub-menu {
  padding: 6px 6px 14px 80px;
  margin-top: -10px;
  background: #1d1b31;
  display: none;
}

.sidebar .nav-links li.showMenu .sub-menu {
  display: block;
}

.sidebar .nav-links li .sub-menu a {
  color: #fff;
  font-size: 15px;
  padding: 5px 0;
  white-space: nowrap;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.sidebar .nav-links li .sub-menu a:hover {
  opacity: 1;
}

.sidebar.close .nav-links li .sub-menu {
  position: absolute;
  left: 100%;
  top: -10px;
  margin-top: 0;
  padding: 10px 20px;
  border-radius: 0 6px 6px 0;
  opacity: 0;
  display: block;
  pointer-events: none;
  transition: 0s;
}

.sidebar.close .nav-links li:hover .sub-menu {
  top: 0;
  opacity: 1;
  pointer-events: auto;
  transition: all 0.4s ease;
}

.sidebar .nav-links li .sub-menu .link_name {
  display: none;
}

.sidebar.close .nav-links li .sub-menu .link_name {
  font-size: 18px;
  opacity: 1;
  display: block;
}

.sidebar .nav-links li .sub-menu.blank {
  opacity: 1;
  pointer-events: auto;
  padding: 3px 20px 6px 16px;
  opacity: 0;
  pointer-events: none;
}

.sidebar .nav-links li:hover .sub-menu.blank {
  top: 50%;
  transform: translateY(-50%);
}

.sidebar .profile-details {
  position: fixed;
  bottom: 0;
  width: 260px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1d1b31;
  padding: 12px 0;
  transition: all 0.5s ease;
}

.sidebar.close .profile-details {
  background: none;
}

.sidebar.close .profile-details {
  width: 78px;
}

.sidebar .profile-details .profile-content {
  display: flex;
  align-items: center;
}

.sidebar .profile-details img {
  height: 32px;
  width: 32px;
  object-fit: cover;
  border-radius: 16px;
  margin: 0 14px 0 12px;
  background: #1d1b31;
  transition: all 0.5s ease;
}

.sidebar.close .profile-details img {
  padding: 10px;
}

.sidebar .profile-details .profile_name,
.sidebar .profile-details .job {
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  white-space: nowrap;
}

.sidebar.close .profile-details i,
.sidebar.close .profile-details .profile_name,
.sidebar.close .profile-details .job {
  display: none;
}

.sidebar .profile-details .job {
  font-size: 12px;
}

.home-section {
  position: relative;
  background: #f5f5f5;
  height: 100%;
  left: 260px;
  width: calc(100% - 260px);
  transition: all 0.5s ease;
  padding: 1rem;
  box-sizing: border-box;
}

.sidebar.close~.home-section {
  left: 78px;
  width: calc(100% - 78px);
}

.home-content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.home-section .home-content .bx-menu,
.home-section .home-content .text {
  color: #11101d;
  font-size: 35px;
}

.home-section .home-content .bx-menu {
  cursor: pointer;
  margin-right: 10px;
}

.home-section .home-content .text {
  font-size: 26px;
  font-weight: 600;
}

@media screen and (max-width: 400px) {
  .sidebar {
    width: 240px;
  }

  .sidebar.close {
    width: 78px;
  }

  .sidebar .profile-details {
    width: 240px;
  }

  .sidebar.close .profile-details {
    background: none;
  }

  .sidebar.close .profile-details {
    width: 78px;
  }

  .home-section {
    left: 240px;
    width: calc(100% - 240px);
  }

  .sidebar.close~.home-section {
    left: 78px;
    width: calc(100% - 78px);
  }
}
</style>
