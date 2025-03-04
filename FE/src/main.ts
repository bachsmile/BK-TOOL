import { createApp } from "vue";
import "./style.scss";
import "./assets/styles/common.scss";
import App from "./App.vue";
import router from "@/router";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import LayoutDefault from "@/layout/LayoutDefault.vue";
import LayoutFull from "@/layout/LayoutFull.vue";
import LayoutToolBar from "@/layout/LayoutToolBar.vue";
import i18n from "@/plugins/i18n";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// Create vue app
const app = createApp(App);
app.use(router);
app.use(i18n);
app.use(ElementPlus);
windowDefineProperty(app);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("LayoutDefault", LayoutDefault);
app.component("LayoutFull", LayoutFull);
app.component("LayoutToolBar", LayoutToolBar);
// Mount vue app
app.mount("#app");
import windowDefineProperty from "./plugins/global/public/propertyGlobal.public";
