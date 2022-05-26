import http from '../axios'

export const categories = () => http({
    url: '/goods_api/sc/categories?dep=%E5%8C%97%E4%BA%AC',
    method: 'GET'
})

export const list = (params: any) => http({
    url: '/goods_api/mm/art/list',
    method: 'GET',
    params
})