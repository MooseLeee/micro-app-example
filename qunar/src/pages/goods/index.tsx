import React, { useEffect, useState } from 'react'

import ListItem from '@/components/list-item'

import {
    categories,
    list,
} from '@/http/api/goods'

import './index.scoped.scss'

function Goods () {
    const [dataList, setDataList] = useState<Array<any>>([])

    useEffect(() => {
        network().categories()
        network().list()
    }, [])

    const network = () => {
        return {
            categories: async () => {
                const { data } = await categories()
                console.log(data, '===')
            },
            list: async () => {
                const { data } = await list({
                    dep: '%E5%8C%97%E4%BA%AC',
                    page: 1,
                    limit: 10,
                    onlyPush: true,
                    isLocalMan: 0,
                    abroad: 1,
                    pushRS: new Date().getTime(),
                })
                setDataList(data.data.content)
            }
        }
    }

    return (
        <div className={'goods'}>
            { dataList.map((item) => (
                <ListItem
                    key={item.itemIndex}
                    user={item.userVO.user}
                    nums={item.nums}>
                    <div className={'desc'}>{item.article.title}</div>
                    <div className={'product'}>
                        { item.article.content.products.map((product: any) => (
                            <div
                                key={product.id}
                                className={'product-item'}>
                                <div className={'arrow'}>
                                    <span/>
                                </div>
                                <img
                                    className={'product-img'}
                                    src={product.thumb}
                                    alt=""/>
                                <div className={'product-name'}>
                                    <div className={'name'}>{product.title}</div>
                                    <div className={'price'}>￥{product.price}起</div>
                                </div>
                            </div>
                        )) }
                    </div>
                    <div className={'image-list'}>
                        { item.article.content.imgs.filter((image: any, idx: number) => (idx < 9)).map((image: any, idx: number) => (
                            <img
                                key={idx}
                                src={image.smallUrl}
                                alt=""/>
                        )) }
                    </div>
                </ListItem>
            )) }
        </div>
    )
}

export default Goods