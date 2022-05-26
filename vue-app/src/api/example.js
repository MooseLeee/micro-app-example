import axios from '@/jslibs/axios';

export const example = params => axios({
  method: 'GET',
  url: '/example',
  params
})
