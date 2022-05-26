import '../public-path'

import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/jslibs/rem'
import reportWebVitals from '../reportWebVitals';

import Homepage from './homepage';
import Goods from './goods';
import Router from './router';
import './index.css';

if(!(window as any).__POWERED_BY_QIANKUN__) {
    render()
}

export async function bootstrap() {
    console.log('react app bootstraped');
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props: any) {
    console.log('react app mounted');
    render()
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props: any) {
    console.log('react app unmounted');
    // ReactDOM.unmountComponentAtNode(
    //     props.container ? props.container.querySelector('#root') : document.getElementById('root'),
    // );
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props: any) {
    console.log('update props', props);
}

function render () {
    const navList = [
        { path: '/qunar-app/vacation', label: '度假', component: <Homepage/> },
        { path: '/qunar-app/goods', label: '好货', component: <Goods/> },
        { path: '/qunar-app/sales', label: '特卖', component: <Homepage/> },
        { path: '/qunar-app/mine', label: '我的', component: <Homepage/> },
    ]

    const root = ReactDOM.createRoot(
        document.getElementById('qunar') as HTMLElement
    );
    root.render(
        <React.StrictMode>
            <Router routers={navList}/>
        </React.StrictMode>
    );
}

reportWebVitals();
