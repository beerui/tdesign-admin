import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import router from '@/router';
// import router, { fixedRouterList, homepageRouterList } from '@/router';
import { store } from '@/store';
// import { RouteItem } from '@/api/model/permissionModel';
// import { getMenuList } from '@/api/permission';
import { transformObjectToRoutes } from '@/utils/route';

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    whiteListRouters: ['/login'],
    routers: [],
    removeRoutes: [],
    asyncRoutes: [],
  }),
  actions: {
    async initRoutes() {
      const accessedRouters = this.asyncRoutes;

      // 在菜单展示全部路由
      // this.routers = [...homepageRouterList, ...accessedRouters, ...fixedRouterList];
      // 在菜单只展示动态路由和首页
      // this.routers = [...homepageRouterList, ...accessedRouters];
      // 在菜单只展示动态路由
      this.routers = [...accessedRouters];
    },
    async buildAsyncRoutes() {
      try {
        // 发起菜单权限请求 获取菜单列表
        // const asyncRoutes: Array<RouteItem> = (await getMenuList()).list;
        const routes: any[] = [
          { component: '/a/index.vue', path: '/a', name: 'a', title: '测试1' },
          { component: '/b/index.vue', path: '/b', name: 'b', title: '测试2' },
          {
            component: '/c/index.vue',
            path: '/c',
            name: 'c',
            title: '测试3',
            children: [
              { component: '/c/a/index.vue', path: '/c/a', name: 'ca', title: 'ca' },
              { component: '/c/b/index.vue', path: '/c/b', name: 'cb', title: 'cb' },
            ],
          },
        ];
        const rs = transformObjectToRoutes(routes);

        console.log('routes', rs);
        this.asyncRoutes = rs;
        // this.asyncRoutes = transformObjectToRoute(asyncRoutes);
        await this.initRoutes();
        return this.asyncRoutes;
      } catch (error) {
        throw new Error("Can't build routes");
      }
    },
    async restoreRoutes() {
      this.removeRoutes.forEach((item: RouteRecordRaw) => {
        router.addRoute(item);
      });
    },
  },
});

export function getPermissionStore() {
  return usePermissionStore(store);
}
