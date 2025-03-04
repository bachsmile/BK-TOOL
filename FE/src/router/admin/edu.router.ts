export default [
  {
    path: "time-line",
    name: "time-line",
    component: () => import("@/pages/education/time-line/TimeLine.vue"),
  },
  {
    path: "time-line/edit/:id",
    name: "time-line-edit",
    meta: {
      layout: "LayoutToolBar",
    },
    component: () => import("@/pages/education/time-line/ModifyTimeLine.vue"),
  },
];
