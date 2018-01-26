import axios from 'axios';
import env from '../../build/env';
import md5 from 'js-md5';

let util = {

};
util.title = function (title) {
    title = title || 'iView admin';
    window.document.title = title;
};
//http://localhost:49659
const ajaxUrl = env === 'development'
    ? 'http://localhost:8018'
    : env === 'production'
        ? 'http://localhost:8018'
        : 'http://43.247.89.26:1088';

util.ajaxUrl = function () {
    return ajaxUrl;
};
util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json; charset=urf-8'
    }
});

util.inOf = function (arr, targetArr) {
    let res = true;
    arr.map(item => {
        if (targetArr.indexOf(item) < 0) {
            res = false;
        }
    });
    return res;
};

util.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};

util.showThisRoute = function (itAccess, currentAccess) {
    if (typeof itAccess === 'object' && itAccess.isArray()) {
        return util.oneOf(currentAccess, itAccess);
    } else {
        return itAccess === currentAccess;
    }
};

util.getRouterObjByName = function (routers, name) {
    let routerObj = {};
    routers.forEach(item => {
        if (item.name === 'otherRouter') {
            item.children.forEach((child, i) => {
                if (child.name === name) {
                    routerObj = item.children[i];
                }
            });
        } else {
            if (item.children.length === 1) {
                if (item.children[0].name === name) {
                    routerObj = item.children[0];
                }
            } else {
                item.children.forEach((child, i) => {
                    if (child.name === name) {
                        routerObj = item.children[i];
                    }
                });
            }
        }
    });
    return routerObj;
};

util.handleTitle = function (vm, item) {
    return item.title;
};

util.setCurrentPath = function (vm, name) {
    let title = '';
    let isOtherRouter = false;
    vm.$store.state.app.routers.forEach(item => {
        if (item.children.length === 1) {
            if (item.children[0].name === name) {
                title = util.handleTitle(vm, item);
                if (item.name === 'otherRouter') {
                    isOtherRouter = true;
                }
            }
        } else {
            item.children.forEach(child => {
                if (child.name === name) {
                    title = util.handleTitle(vm, child);
                    if (item.name === 'otherRouter') {
                        isOtherRouter = true;
                    }
                }
            });
        }
    });
    let currentPathArr = [];
    if (name === 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '',
                name: 'home_index'
            }
        ];
    } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '/home',
                name: 'home_index'
            },
            {
                title: title,
                path: '',
                name: name
            }
        ];
    } else {
        let currentPathObj = vm.$store.state.app.routers.filter(item => {
            if (item.children.length <= 1) {
                return item.children[0].name === name;
            } else {
                let i = 0;
                let childArr = item.children;
                let len = childArr.length;
                while (i < len) {
                    if (childArr[i].name === name) {
                        return true;
                    }
                    i++;
                }
                return false;
            }
        })[0];
        if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '',
                    name: 'home_index'
                }
            ];
        } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: name
                }
            ];
        } else {
            let childObj = currentPathObj.children.filter((child) => {
                return child.name === name;
            })[0];
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: currentPathObj.name
                },
                {
                    title: childObj.title,
                    path: currentPathObj.path + '/' + childObj.path,
                    name: name
                }
            ];
        }
    }
    vm.$store.commit('setCurrentPath', currentPathArr);

    return currentPathArr;
};

util.openNewPage = function (vm, name, argu, query) {
    let pageOpenedList = vm.$store.state.app.pageOpenedList;
    let openedPageLen = pageOpenedList.length;
    let i = 0;
    let tagHasOpened = false;
    while (i < openedPageLen) {
        if (name === pageOpenedList[i].name) {  // 页面已经打开
            vm.$store.commit('pageOpenedList', {
                index: i,
                argu: argu,
                query: query
            });
            tagHasOpened = true;
            break;
        }
        i++;
    }
    if (!tagHasOpened) {
        let tag = vm.$store.state.app.tagsList.filter((item) => {
            if (item.children) {
                return name === item.children[0].name;
            } else {
                return name === item.name;
            }
        });
        tag = tag[0];
        if (tag) {
            tag = tag.children ? tag.children[0] : tag;
            if (argu) {
                tag.argu = argu;
            }
            if (query) {
                tag.query = query;
            }
            vm.$store.commit('increateTag', tag);
        }
    }
    vm.$store.commit('setCurrentPageName', name);
};

util.toDefaultPage = function (routers, name, route, next) {
    let len = routers.length;
    let i = 0;
    let notHandle = true;
    while (i < len) {
        if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
            route.replace({
                name: routers[i].children[0].name
            });
            notHandle = false;
            next();
            break;
        }
        i++;
    }
    if (notHandle) {
        next();
    }
};

util.fullscreenEvent = function (vm) {
    // 权限菜单过滤相关
    vm.$store.commit('updateMenulist');
};

util.post = function (purl, pdata, vm, callback) {
    pdata['ApiUid'] = vm.$store.state.user.id;
    pdata['Token'] = vm.$store.state.user.token;
    var nlist = ['StartDate', 'EndDate'];
    var md5list = ['PassWord'];
    for (var key in pdata) {
        let val = pdata[key];
        if (nlist.indexOf(key) >= 0 && val != '') {
            pdata[key] = util.formatDate(pdata[key]);
        }
        if (md5list.indexOf(key) >= 0 && val != '') {
            pdata[key] = md5(pdata[key]);
        }
    }
    pdata['Sign'] = util.createsign(pdata, vm.$store.state.app.mmkey);
    util.ajax.post(purl, pdata).then(res => {
        var data = res.data;
        if (data.resultCode === 0) {
            callback('1', data);
        }
        else {
            console.log(data);
            callback('0', data.message);
        }
    }).catch(error => {
        console.log(error + "   dddderror");
        callback('0');
    });
};

util.createsign = function (pdata, skey) {
    let keys = new Array();
    let i = 0;
    var nlist = ['key', 'Sign', 'StartDate', 'EndDate'];
    for (var key in pdata) {
        let val = pdata[key];
        if (val !== '' && nlist.indexOf(key) < 0) {
            keys[i] = key + '=' + val;
            i++;
        }

    }
    var t2 = keys.sort().join('&') + '&key=' + skey;
    return md5(t2).toLowerCase();
};


util.formatDate = function (date) {
    let objDate = new Date(date);
    const y = objDate.getFullYear();
    let m = objDate.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = objDate.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
};

util.formatDateFull = function (date) {
    let objDate = new Date(date);
    const y = objDate.getFullYear();
    let m = objDate.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = objDate.getDate();
    d = d < 10 ? ('0' + d) : d;

    let h = objDate.getHours();
    h = h < 10 ? ('0' + h) : h;

    let min = objDate.getMinutes();
    min = min < 10 ? ('0' + min) : min;

    let s = objDate.getSeconds();
    s = s < 10 ? ('0' + s) : s;

    return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s;
};

export default util;


