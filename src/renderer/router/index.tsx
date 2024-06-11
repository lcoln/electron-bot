import { routerHelper } from '@linteng/dynamic-router';
// @ts-ignore
import { pageRouter } from './config.json?dynamicRouter';

const config = {

  /**
   * router过滤函数
   * @param {*} props   // 挂载在router上的props
   * @param {*} routerPath    // router path
   * @return {*} boolean  // 是否拦截掉路由
   */
  filter(props: any, routerPath: any) {
    if (routerPath === '/filter') {
      return false;
    }
    return true;
  },
  error: {
    404: '/error/404',
  },
};
const DynamicRouter = routerHelper(pageRouter, config);

export default () => DynamicRouter;
