
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/home.vue') },
      { path: 'create/:step', component: () => import('pages/steps') },
      { path: 'pricing', component: () => import('pages/pricing.vue') },
      { path: 'how-it-works', component: () => import('pages/how-it-works.vue') },
      { path: 'test', component: () => import('pages/test.vue') }
    ]
  },
  
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
