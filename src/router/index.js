import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

export const asyncRouterMap = [
  {
    path: '/users',
    component: Layout,
    redirect: '/users/index',
    name: '用户管理',
    meta: { title: '用户管理', icon: 'example', roles: ['admin'] },
    children: [
      {
        path: 'index',
        name: '用户管理',
        component: () => import('@/views/users/index'),
        meta: { title: '用户管理', icon: 'example' }
      },
      {
        path: 'create',
        name: '创建',
        component: () => import('@/views/users/create'),
        meta: { title: '创建', icon: 'tree' },
        hidden: true
      },
      {
        path: 'update',
        name: '更新',
        component: () => import('@/views/users/update'),
        meta: { title: '更新', icon: 'tree' },
        hidden: true
      },
      {
        path: 'reset/password',
        name: '更新密码',
        component: () => import('@/views/users/resetPassword'),
        meta: { title: '更新密码', icon: 'tree' },
        hidden: true
      }
    ]
  },

  {
    path: '/report',
    component: Layout,
    redirect: '/report/material',
    name: '报表',
    meta: { title: '报表', icon: 'example' },
    children: [
      {
        path: 'material',
        name: '材料',
        component: () => import('@/views/report/material'),
        meta: { title: '材料', icon: 'example' }
      },
      {
        path: 'user',
        name: '人员',
        component: () => import('@/views/report/user'),
        meta: { title: '人员', icon: 'tree' }
      }
    ]
  },

  {
    path: '/order',
    component: Layout,
    redirect: '/order/index',
    name: '订单管理',
    meta: { title: '订单管理', icon: 'example' },
    children: [
      {
        path: 'index',
        name: '订单管理',
        component: () => import('@/views/order/index'),
        meta: { title: '订单管理', icon: 'example', roles: ['admin', 'sale', 'operator'] }
      },
      {
        path: 'create',
        name: '创建',
        component: () => import('@/views/order/create'),
        meta: { title: '创建', icon: 'tree', roles: ['admin', 'sale', 'operator'] },
        hidden: true
      },
      {
        path: ':id/update',
        name: '更新',
        component: () => import('@/views/order/update'),
        meta: { title: '更新', icon: 'tree', roles: ['admin', 'sale', 'operator'] },
        hidden: true
      },
      {
        path: ':id/design/update',
        name: '定制规格',
        component: () => import('@/views/order/design'),
        meta: { title: '定制规格', icon: 'tree', roles: ['admin', 'sale', 'operator'] },
        hidden: true
      }
    ]
  },

  {
    path: '/sofa',
    component: Layout,
    redirect: '/sofa/index',
    name: '产品管理',
    meta: { title: '产品管理', icon: 'example', roles: ['admin', 'operator'] },
    children: [
      {
        path: 'index',
        name: '产品管理',
        component: () => import('@/views/sofa/index'),
        meta: { title: '产品管理', icon: 'example' }
      },
      {
        path: 'create',
        name: '创建',
        component: () => import('@/views/sofa/create'),
        meta: { title: '创建', icon: 'tree' },
        hidden: true
      },
      {
        path: ':id/update',
        name: '更新',
        component: () => import('@/views/sofa/update'),
        meta: { title: '更新', icon: 'tree' },
        hidden: true
      }
    ]
  },

  {
    path: '/sofa/:id/items',
    component: Layout,
    redirect: '/sofa/index',
    name: '产品管理',
    meta: { title: '产品管理', icon: 'example' },
    hidden: true,
    children: [
      {
        path: 'index',
        name: '产品规格管理',
        component: () => import('@/views/sofaItem/index'),
        meta: { title: '产品规格管理', icon: 'example' },
        hidden: true
      },
      {
        path: 'create',
        name: '创建',
        component: () => import('@/views/sofaItem/create'),
        meta: { title: '创建', icon: 'tree' },
        hidden: true
      },
      {
        path: ':itemId/update',
        name: '更新',
        component: () => import('@/views/sofaItem/update'),
        meta: { title: '更新', icon: 'tree' },
        hidden: true
      }
    ]
  }
]

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap.concat(asyncRouterMap)
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
