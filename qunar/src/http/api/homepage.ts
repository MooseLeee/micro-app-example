import http from '../axios'

export const appHomeArrive = () => http({
    url: '/homepage/golfz/destination/appHomeArrive?version=1&width=216&height=190&count=14&uid=00008900075841c386a8434e&userName=&dep=北京&depType=100',
    method: 'GET'
})

export const cfg = () => http({
    url: '/homepage/page/cfg?modules=me,fme&dep=北京&dest=北京',
    method: 'GET'
})