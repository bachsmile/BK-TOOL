import _ from 'lodash';
import { ref, Ref } from "vue";
import { useI18n } from 'vue-i18n';

//Cài đặt cố định
declare global {
  interface Window extends propertyGlobal {
    //định nghĩa các property custom ở window
  }
}

// Khai báo các biến dùng global
interface propertyGlobal {
  //reactive
  token?: Ref<string>,
  //const
  _?: _.LoDashStatic,
  i18n?: any,
  isMobile?: boolean
}

//Định nghĩa biến toàn cục (reactvie) có thể thay đổi dữ liệu
const windowDefineReactiveProperty = (app: any) => {
  const global: propertyGlobal = {
    token: ref(''),
  }
  defineProperty(global, 'react')
}
//Định nghĩa biến toàn cục (const) không thể thay đổi dữ liệu
const windowDefineConstProperty = () => {
  const global: propertyGlobal = {
    _: _,
    i18n: useI18n,
    isMobile: (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)),
  }
  defineProperty(global, 'const')
}

//xử lý việc có được phép thay đổi global
const defineProperty = (property: object, type: string) => {
  //register global
  _.forEach(property, (valueProperty: any, key: any) => {
    window[key] = valueProperty
    Object.defineProperty(window, key, {
      value: valueProperty,
      writable: type === 'react'
    });
  })
}

// đăng ký với app
const windowDefineProperty = (app: any) => {
  windowDefineReactiveProperty(app)
  windowDefineConstProperty()
}

export default windowDefineProperty
