import React, { useState, useEffect } from 'react'

import {
    appHomeArrive,
    cfg
} from '@/http/api/homepage'

import './index.scoped.scss'

interface MenuList {
    fme: Array<any>
    me: Array<any>
}

function Homepage () {
    const [targetData, setTargetData] = useState<Array<any>>([])
    const [menuList, setMenuList] = useState<MenuList>({fme: [], me: []})

    useEffect(() => {
        network().appHomeArrive()
        network().cfg()
    }, [])

    const network = () => {
        return {
            appHomeArrive: async () => {
                const { data } = await appHomeArrive()
                setTargetData(data.data)
            },
            cfg: async () => {
                const { data } = await cfg()
                setMenuList(data.data)
            }
        }
    }

    return (
        <div className={'homepage'}>
            <div className={'hot-target'}>
                <div className={'header-title'}>当季热门目的地</div>
                <div className={'target-wrapper'}>
                    <div className={'top-wrapper'}>
                        { targetData.filter((i, idx) => (idx <= 5)).map((item, index) => (
                            <div
                                key={index}
                                className={'target-item'}>
                                <img
                                    className={'target-img'}
                                    src={item.img}
                                    alt=""/>
                                <div className={'target-name'}>
                                    <div className={'name'}>{ item.name }</div>
                                    <span className={'focus-num'}>{ item.uLike }人喜欢</span>
                                </div>
                            </div>
                        )) }
                    </div>
                    <div className={'bottom-wrapper'}>
                        { targetData.filter((i, idx) => (idx > 5)).map((item, index) => (
                            <div
                                key={index}
                                className={'target-item'}>{ item.name }</div>
                        )) }
                    </div>
                </div>
            </div>
            <div className={'menu-list'}>
                <div className={'business-line'}>
                    {menuList.fme.map((item, index) => (
                        <div
                            key={index}
                            className={'line-item'}>
                            <img
                                src={item.img}
                                alt=""/>
                        </div>
                    ))}
                </div>
                <div className={'tag-line'}>
                    {menuList.me.map((item, index) => (
                        <div
                            key={index}
                            className={'line-item'}>
                            <div className={'icon'}/>
                            <span className={'label'}>{item.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Homepage