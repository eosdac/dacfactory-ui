const routes = [
  {
    path: "/",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Home.vue") },
      { path: "create/:step", component: () => import("pages/Steps") },
      { path: "pricing", component: () => import("pages/Pricing.vue") },
      { path: "how-it-work", component: () => import("pages/HowItWork.vue") },
      { path: "terms", component: () => import("pages/Terms.vue")},
      { path: "dac-creation", component: () => import("pages/DacCreation.vue") },
      { path: "test", component: () => import("pages/Test.vue") }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
