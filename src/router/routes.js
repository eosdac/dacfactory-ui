const routes = [
  {
    path: "/",
    component: () => import("layouts/MyLayout"),
    children: [
      { path: "", component: () => import("pages/Home.vue") },
      { path: "create/:step(step[1-5]+)", component: () => import("pages/Steps") },
      { path: "create/", redirect: "create/step1" },
      { path: "how-it-works", component: () => import("pages/HowItWorks") },
      { path: "terms", component: () => import("pages/Terms") },
      { path: "dac-creation", component: () => import("pages/DacCreation") },
      { path: "test", component: () => import("pages/Test") }
    ]
  },
  {
    path: "/",
    component: () => import("layouts/ContentLayout"),
    children: [
      { path: "pricing", component: () => import("pages/Pricing") }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404")
  });
}

export default routes;
