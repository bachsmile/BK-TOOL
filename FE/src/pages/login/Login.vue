<template>
     <div
    class="reg"
    :style="{
      backgroundImage: `url(${bgLogin})`,
    }"
  >
  <div class="reg-form">
    <div class="text-center ts-4 tc-white">
      Đăng nhập
    </div>
    <div class="input-group flex-nowrap mt-4">
        <div class="icon-pass" id="addon-wrapping">
             <FontAwesomeIcon :icon="faUser" />
        </div>
        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping">
    </div>
    <div class="input-group flex-nowrap mt-4">
        <div class="icon-pass" id="addon-wrapping">
            <FontAwesomeIcon :icon="faLock" />
        </div>
        <input type="text" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping">
    </div>
    <div class="mt-4 j-center">
     <button @click="login" type="button" class="btn btn-outline-white">Đăng nhập</button>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import bgLogin from '@/assets/img/bgLogin.jpg'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import router from '@/router/index'
function login() {
  router.push({name:'home-page'})
}
</script>
<style scoped lang="scss">
.reg {
  position: relative;
  width: 100%;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  .reg-form {
    position: absolute;
    top: 50%;
    right: 0%;
    width: 28rem;
    height: auto;
    padding: 2rem;
    border-radius: 8px;
    background-color: #1A6281;
    transform: translate(-30%, -50%);
    .form-control:focus{
        box-shadow:unset;
    }
    .form-control{
        background-color: #1A6281;
        border-top-right-radius: 11px;
        border-bottom-right-radius: 11px;
        color:#ffff;
        &::placeholder {
            color:#ffff;
        }
    }
    
    .icon-pass{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #1A6281;
        border-top-left-radius: 11px;
        border-bottom-left-radius: 11px;
        padding-inline: 12px;
        border: var(--bs-border-width) solid var(--bs-border-color);
        border-right: unset;
    }
  }
  .notify-login-in-setting {
    padding: 12px 16px;
    background-color: rgb(var(--v-warning-50));
    color: rgb(var(--v-warning-600));
  }
}
</style>