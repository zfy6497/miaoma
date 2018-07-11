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
        { path: 'home', title: { i18n: 'home' }, name: 'home_index', component: resolve => { require(['@/views/home/home.vue'], resolve); } },
        { path: 'productdetail/:id', title: '商品详情', name: 'product_detail', component: resolve => { require(['@/views/product/productdetail.vue'], resolve); } },
        { path: 'specialorderdetail/:id', title: '预约订单详情', name: 'specialorder_detail', component: resolve => { require(['@/views/yuyue/specialorderdetail.vue'], resolve); } },
        { path: 'orderdetail/:id', title: '订单详情', name: 'order_detail', component: resolve => { require(['@/views/orders/orderdetail.vue'], resolve); } },
        { path: 'refunddetail/:id', title: '订单详情', name: 'refund_detail', component: resolve => { require(['@/views/orders/refunddetail.vue'], resolve); } },
        { path: 'specialorderlist/:id', title: '预约记录', name: 'specialorder_list', component: resolve => { require(['@/views/yuyue/specialorderlist.vue'], resolve); } },
        { path: 'specialschedueslist/:id', title: '排课管理', name: 'specialschedues_list', component: resolve => { require(['@/views/yuyue/specialschedueslist.vue'], resolve); } },
        { path: 'couponreceivers/:id', title: '领取详情', name: 'couponreceivers_list', component: resolve => { require(['@/views/marking/couponreceivers.vue'], resolve); } },
        { path: 'coupondetail/:id', title: '优惠劵详情', name: 'coupon_detail', component: resolve => { require(['@/views/marking/coupondetail.vue'], resolve); } },
        { path: 'uservipcardrecord/:id', title: '会员卡使用详情', name: 'uservipcardrecord_list', component: resolve => { require(['@/views/marking/uservipcardrecord.vue'], resolve); } },
        { path: 'FreightTemplate/:id', title: '运费模板详情', name: 'freight_detail', component: resolve => { require(['@/views/FreightTemplate/add.vue'], resolve); } },
        { path: 'appraisaldetail/:id', title: '考评记录详情', name: 'appraisal_detail', component: resolve => { require(['@/views/yuyue/appraisaldetail.vue'], resolve); } },
        { path: 'babylist/:id', title: '婴泳项目', name: 'baby_list', component: resolve => { require(['@/views/yuyue/babylist.vue'], resolve); } },
        { path: 'babyorder/:id', title: '婴泳预约', name: 'baby_order', component: resolve => { require(['@/views/yuyue/babyorder.vue'], resolve); } },
        { path: 'babyschedueslist/:id', title: '婴泳排班', name: 'babyschedues_list', component: resolve => { require(['@/views/yuyue/babyschedueslist.vue'], resolve); } },
        { path: 'babyorderdetail/:id', title: '婴泳订单详情', name: 'babyorder_detail', component: resolve => { require(['@/views/yuyue/babyorderdetail.vue'], resolve); } },
        { path: 'coursedetail/:id', title: '课程详情', name: 'course_detail', component: resolve => { require(['@/views/course/coursedetail.vue'], resolve); } },
        { path: 'typedetail/:id', title: '类型详情', name: 'type_detail', component: resolve => { require(['@/views/type/detail.vue'], resolve); } },
        { path: 'articlesdetail/:id', title: '文字详情', name: 'articles_detail', component: resolve => { require(['@/views/articles/detail.vue'], resolve); } },
        { path: 'storemap/:id', title: '门店定位', name: 'store_map', component: resolve => { require(['@/views/yuyue/storemap.vue'], resolve); } },
        { path: 'seller/appraisaldetail/:id', title: '考评记录详情', name: 'seller_appraisal_detail', component: resolve => { require(['@/views/seller/yuyue/appraisaldetail.vue'], resolve); } }
        
    ]
};

// 平台中心  作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [

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
            }, {
                path: 'types',
                icon: 'levels',
                name: 'types',
                title: '类型管理',
                component: resolve => { require(['@/views/type/index.vue'], resolve); }
            }
        ]
    },
    {
        path: '/orders',
        icon: 'bag',
        name: 'orders',
        title: '订单管理',
        component: Main,
        children: [
            {
                path: 'orderlist',
                icon: 'heart',
                name: 'orderlist',
                title: '订单列表',
                component: resolve => { require(['@/views/orders/orderlist.vue'], resolve); }

            }, {
                path: 'orderrefundlist/:type',
                icon: 'levels',
                name: 'orderrefundlist',
                title: '退款处理',
                component: resolve => { require(['@/views/orders/orderrefundlist.vue'], resolve); }
            }, {
                path: 'orderrefundlist1/:type',
                icon: 'podium',
                name: 'orderrefundlist1',
                title: '退货处理',
                component: resolve => { require(['@/views/orders/orderrefundlist.vue'], resolve); }
            }, {
                path: 'FreightTemplate/',
                icon: 'podium',
                name: 'FreightTemplate',
                title: '运费模板',
                component: resolve => { require(['@/views/FreightTemplate/index.vue'], resolve); }
            }
        ]
    },
    {
        path: '/marking',
        icon: 'bag',
        name: 'marking',
        title: '营销管理',
        component: Main,
        children: [
            {
                path: 'couponlist',
                icon: 'heart',
                name: 'couponlist',
                title: '优惠劵管理',
                component: resolve => { require(['@/views/marking/couponlist.vue'], resolve); }

            }, {
                path: 'vipcardlist',
                icon: 'levels',
                name: 'vipcardlist',
                title: '会员卡管理',
                component: resolve => { require(['@/views/marking/vipcardlist.vue'], resolve); }
            }, {
                path: 'uservipcardlist',
                icon: 'levels',
                name: 'uservipcardlist',
                title: '会员卡记录',
                component: resolve => { require(['@/views/marking/uservipcardlist.vue'], resolve); }
            }
        ]
    },
    {
        path: '/configs',
        icon: 'bag',
        name: 'configs',
        title: '配置管理',
        component: Main,
        children: [
            {
                path: 'homepage',
                icon: 'heart',
                name: 'homepage',
                title: '平台主页',
                component: resolve => { require(['@/views/configs/homepage.vue'], resolve); }

            }, {
                path: 'shopping',
                icon: 'levels',
                name: 'shopping',
                title: '商城首页',
                component: resolve => { require(['@/views/configs/shopping.vue'], resolve); }
            }
        ]
    },
    {
        path: '/member',
        icon: 'person',
        title: '会员管理',
        name: 'member',
        component: Main,
        children: [
            { path: 'index', icon: 'ios-list', title: '会员列表', name: 'index', component: resolve => { require(['@/views/member/index.vue'], resolve); } }
        ]
    },
    {
        path: '/yuyue',
        icon: 'soup-can',
        title: '预约管理',
        name: 'yuyue',
        component: Main,
        children: [
            {
                path: 'speciallist',
                icon: 'ios-list',
                name: 'speciallist',
                title: '专家列表',
                component: resolve => { require(['@/views/yuyue/speciallist.vue'], resolve); }
            },
            {
                path: 'specialorder',
                icon: 'ios-list',
                name: 'specialorder',
                title: '预约订单',
                component: resolve => { require(['@/views/yuyue/specialorder.vue'], resolve); }
            },
            {
                path: 'storelist',
                icon: 'ios-list',
                name: 'storelist',
                title: '门店管理',
                component: resolve => { require(['@/views/yuyue/storelist.vue'], resolve); }
            },
            {
                path: 'storemanagerlist',
                icon: 'ios-list',
                name: 'storemanagerlist',
                title: '店长管理',
                component: resolve => { require(['@/views/yuyue/storemanagerlist.vue'], resolve); }
            },
            {
                path: 'homeads',
                icon: 'ios-list',
                name: 'homeads',
                title: '首页广告',
                component: resolve => { require(['@/views/yuyue/homeads.vue'], resolve); }
            },
            {
                path: 'commentlist',
                icon: 'ios-list',
                name: 'commentlist',
                title: '评价管理',
                component: resolve => { require(['@/views/yuyue/commentlist.vue'], resolve); }
            },
            {
                path: 'arealist',
                icon: 'ios-list',
                name: 'arealist',
                title: '区域管理',
                component: resolve => { require(['@/views/yuyue/arealist.vue'], resolve); }
            },
            {
                path: 'basesetting',
                icon: 'ios-list',
                name: 'basesetting',
                title: '基础设置',
                component: resolve => { require(['@/views/yuyue/basesetting.vue'], resolve); }
            },
            {
                path: 'specialappraisal',
                icon: 'ios-list',
                name: 'specialappraisal',
                title: '专家考评',
                component: resolve => { require(['@/views/yuyue/specialappraisal.vue'], resolve); }
            },
            {
                path: 'appraisalmanage',
                icon: 'ios-list',
                name: 'appraisalmanage',
                title: '考评管理',
                component: resolve => { require(['@/views/yuyue/appraisalmanage.vue'], resolve); }
            }
        ]
    },
    {
        path: '/course',
        icon: 'ios-paper',
        title: '在线课程',
        name: 'course',
        component: Main,
        children: [
            {
                path: 'homesetting',
                icon: 'ios-list',
                name: 'homesetting',
                title: '首页配置',
                component: resolve => { require(['@/views/configs/coursehomepage.vue'], resolve); }
            },
            {
                path: 'categorylist',
                icon: 'ios-list',
                name: 'categorylist',
                title: '课程分类',
                component: resolve => { require(['@/views/course/categorylist.vue'], resolve); }
            },
            {
                path: 'courselist',
                icon: 'ios-list',
                name: 'courselist',
                title: '课程管理',
                component: resolve => { require(['@/views/course/courselist.vue'], resolve); }
            },
            {
                path: 'courseorder',
                icon: 'ios-list',
                name: 'courseorder',
                title: '课程订购',
                component: resolve => { require(['@/views/course/courseorder.vue'], resolve); }
            },
            {
                path: 'coursedynamic',
                icon: 'ios-list',
                name: 'coursedynamic',
                title: '课程动态',
                component: resolve => { require(['@/views/course/coursedynamic.vue'], resolve); }
            }
        ]
    },
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
                path: 'configs',
                icon: 'ios-list-outline',
                name: 'systemset',
                title: '系统配置',
                component: resolve => { require(['@/views/configs/systemset.vue'], resolve); }
            }, {
                path: 'articles',
                icon: 'ios-list-outline',
                name: 'articles',
                title: '文章管理',
                component: resolve => { require(['@/views/articles/index.vue'], resolve); }
            }
        ]
    },
    {
        path: '/statistics',
        icon: 'ios-folder',
        name: 'statistics',
        title: '统计管理',
        component: Main,
        children: [
            {
                path: 'statistics-shop',
                icon: 'ios-list-outline',
                name: 'statistics-shop',
                title: '商城订单统计',
                component: resolve => { require(['@/views/statistics/shop.vue'], resolve); }
            },
            {
                path: 'statistics-service',
                icon: 'ios-list-outline',
                name: 'statistics-service',
                title: '服务订单统计',
                component: resolve => { require(['@/views/statistics/service.vue'], resolve); }
            },
            {
                path: 'statistics-card',
                icon: 'ios-list-outline',
                name: 'statistics-card',
                title: '会员卡统计',
                component: resolve => { require(['@/views/statistics/card.vue'], resolve); }
            }
        ]
    }
];

// 店长登录
export const appStoreRouter = [
    {
        path: '/seller/member',
        icon: 'person',
        title: '会员管理',
        name: 'sellermember',
        component: Main,
        children: [
            { path: '_index', icon: 'ios-list', title: '会员列表', name: '_index', component: resolve => { require(['@/views/seller/member/index.vue'], resolve); } }
        ]
    },
    {
        path: '/seller/yuyue',
        icon: 'soup-can',
        title: '预约管理',
        name: 'selleryuyue',
        component: Main,
        children: [
            {
                path: '_speciallist',
                icon: 'ios-list',
                name: '_speciallist',
                title: '专家列表',
                component: resolve => { require(['@/views/seller/yuyue/speciallist.vue'], resolve); }
            },
            {
                path: '_specialorder',
                icon: 'ios-list',
                name: '_specialorder',
                title: '预约订单',
                component: resolve => { require(['@/views/seller/yuyue/specialorder.vue'], resolve); }
            },
            {
                path: '_storeorders',
                icon: 'ios-list',
                name: '_storeorders',
                title: '婴泳订单',
                component: resolve => { require(['@/views/seller/yuyue/storeorders.vue'], resolve); }
            },
            {
                path: '_commentlist',
                icon: 'ios-list',
                name: '_commentlist',
                title: '评价管理',
                component: resolve => { require(['@/views/seller/yuyue/commentlist.vue'], resolve); }
            },
            {
                path: '_appraisalmanage',
                icon: 'ios-list',
                name: '_appraisalmanage',
                title: '考评管理',
                component: resolve => { require(['@/views/seller/yuyue/appraisalmanage.vue'], resolve); }
            },
            {
                path: 'sellerappraisal',
                icon: 'ios-list',
                name: 'sellerappraisal',
                title: '月度考评',
                component: resolve => { require(['@/views/seller/yuyue/sellerappraisal.vue'], resolve); }
            }
        ]
    },
    {
        path: '/yuyue/',
        icon: 'person',
        title: '婴泳管理',
        name: 'sellerbaby',
        component: Main,
        children: [
            {
                path: '_babylist',
                icon: 'ios-list',
                name: '_babylist',
                title: '婴泳项目',
                component: resolve => { require(['@/views/yuyue/babylist.vue'], resolve); }
            },
            {
                path: '_babyschedueslist',
                icon: 'ios-list',
                name: '_babyschedueslist',
                title: '婴泳排班',
                component: resolve => { require(['@/views/yuyue/babyschedueslist.vue'], resolve); }
            },
            {
                path: '_babyorder',
                icon: 'ios-list',
                name: '_babyorder',
                title: '婴泳订单',
                component: resolve => { require(['@/views/yuyue/babyorder.vue'], resolve); }
            }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
    ...appStoreRouter,
    page500,
    page403,
    page404
];
