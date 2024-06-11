/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: linteng
 * @Date: 2022-03-20 18:24:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-28 17:26:27
 */
import React, { FC } from 'react';

const Index: FC = (props: any) => {
  console.log({ props }, 56789876);
  return <div className="color-comp">page1的组件page1-comp</div>;
};

export default Index;
