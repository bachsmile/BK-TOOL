import edu from "@/router/admin/edu.router";
import more from "@/router/admin/more.router";

export default [
  // quản lý admin
  {
    path: "/admin",
    name: "admin",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/pages/fashion/TShirt.vue"),
      },

      // user
      ...edu,
      //more
      ...more,
    ],
  },
];
