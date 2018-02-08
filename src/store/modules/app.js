import {otherRouter, appRouter} from '@/router/router';
import Util from '@/libs/util';
const app = {
    state: {
        cachePage: [],
        menuList: [],
        routers: [
            otherRouter,
            ...appRouter
        ],
        openedSubmenuArr: [], // 要展开的菜单数组
        pageOpenedList: [{
            title: '首页',
            path: '',
            name: 'home_index'
        }],
        currentPageName: '',
        tagsList: [...otherRouter.children],
        dontCache: ['text-editor', 'artical-publish'],
        mmkey: 'ZD4417JEFFDDSCC50H3FAE3C787D0E23',
        expressCompanys: ['顺丰快递', '圆通速递', '中通速递', '邮政小包', '申通快递', '天天快递', '宅急送', '全峰快递', 'EMS', '韵达快递', '芝麻开门', '德邦快递', '百世汇通']

    },
    mutations: {
        setTagsList (state, list) {
            state.tagsList.push(...list);
        },
        updateMenulist (state) {
            state.menuList = appRouter;
        },
        clearOpenedSubmenu (state) {
            state.openedSubmenuArr.length = 0;
        },
        removeTag (state, name) {
            state.pageOpenedList.map((item, index) => {
                if (item.name === name) {
                    state.pageOpenedList.splice(index, 1);
                }
            });
        },
        pageOpenedList (state, get) {
            let openedPage = state.pageOpenedList[get.index];
            if (get.argu) {
                openedPage.argu = get.argu;
            }
            if (get.query) {
                openedPage.query = get.query;
            }
            state.pageOpenedList.splice(get.index, 1, openedPage);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearAllTags (state) {
            state.pageOpenedList.splice(1);
            state.cachePage.length = 0;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearOtherTags (state, vm) {
            let currentName = vm.$route.name;
            let currentIndex = 0;
            state.pageOpenedList.forEach((item, index) => {
                if (item.name === currentName) {
                    currentIndex = index;
                }
            });
            if (currentIndex === 0) {
                state.pageOpenedList.splice(1);
            } else {
                state.pageOpenedList.splice(currentIndex + 1);
                state.pageOpenedList.splice(1, currentIndex - 1);
            }
            let newCachepage = state.cachePage.filter(item => {
                return item === currentName;
            });
            state.cachePage = newCachepage;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        setOpenedList (state) {
            state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]];
        },
        increateTag (state, tagObj) {
            if (!Util.oneOf(tagObj.name, state.dontCache)) {
                state.cachePage.push(tagObj.name);
                localStorage.cachePage = JSON.stringify(state.cachePage);
            }
            state.pageOpenedList.push(tagObj);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        closePage (state, name) {
            state.cachePage.forEach((item, index) => {
                if (item === name) {
                    state.cachePage.splice(index, 1);
                }
            });
        },
        initCachepage (state) {
            if (localStorage.cachePage) {
                state.cachePage = JSON.parse(localStorage.cachePage);
            }
        },
        setCurrentPageName (state, name) {
            state.currentPageName = name;
        }
    }
};

export default app;
