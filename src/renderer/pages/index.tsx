/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: linteng
 * @Date: 2022-03-13 19:07:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-06-08 19:29:57
 */
// eslint-disable-next-line react/destructuring-assignment
import React from 'react';

function Index(props: any) {
  const { children } = props;
  return (
    <div className="page-layout">
      <p>我是最外层的主体page /pages/index.tsx</p>
      {children}
    </div>
  );
}

export default Index;
