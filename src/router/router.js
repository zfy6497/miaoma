import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['@/views/login.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => { require(['@//views/error-page/403.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => { require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    component: Main,
    children: [
        { path: 'home', title: { i18n: 'home' }, name: 'home_index', component: resolve => { require(['@/views/home/home.vue'], resolve); } }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/admin',
        icon: 'ios-folder',
        name: 'admin',
        title: '系统管理',
        component: Main,
        children: [
            {
                path: 'admin',
                icon: 'ios-list-outline',
                name: 'adminList',
                title: '管理员管理',
                component: resolve => { require(['@/views/admin/index.vue'], resolve); }
            }, {
                path: 'group',
                icon: 'ios-list-outline',
                name: 'adminConfig',
                title: '系统配置',
                component: resolve => { require(['@/views/group/page1/page1.vue'], resolve); }
            }
        ]
    },
    {
        path: '/product',
        icon: 'bag',
        name: 'product',
        title: '商品管理',
        component: Main,
        children: [
            {
                path: 'productlist',
                icon: 'heart',
                name: 'productlist',
                title: '商品列表',
                component: resolve => { require(['@/views/product/productlist.vue'], resolve); }
            }, {
                path: 'categories',
                icon: 'levels',
                name: 'categories',
                title: '分类管理',
                component: resolve => { require(['@/views/product/categories.vue'], resolve); }
            }, {
                path: 'brands',
                icon: 'podium',
                name: 'brands',
                title: '品牌管理',
                component: resolve => { require(['@/views/product/brands.vue'], resolve); }
            }
        ]
    }
    ,
    {
        path: '/page',
        icon: 'ios-paper',
        title: '会员管理',
        name: 'page',
        component: Main,
        children: [
            { path: 'index', title: '会员列表', name: 'page_index', component: resolve => { require(['@/views/page/page.vue'], resolve); } }
        ]
    },
    {
        path: '/page',
        icon: 'ios-paper',
        title: '预约管理',
        name: 'page',
        component: Main,
        children: [
            { path: 'index', title: '会员列表', name: 'page_index', component: resolve => { require(['@/views/page/page.vue'], resolve); } }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];