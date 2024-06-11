/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: linteng
 * @Date: 2022-03-13 19:07:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-06-08 19:29:51
 */
import React from 'react';
// import { withRouter } from 'react-router-dom';

function Index(props: any) {
  const { children } = props;
  return (
    <section className="page-layout-container">
      <aside className="mod-aside">
        {/* <tree-wc data={JSON.stringify(menu)} color="#b7b7b7" /> */}
      </aside>
      <div className="mod-container">
        <h4>最外层覆盖所有子级页面的公用布局layout /pages/layout.tsx</h4>
        {children}
      </div>
    </section>
  );
}
export default Index;
