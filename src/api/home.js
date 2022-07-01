import request from '@/utils/requset'
export const getMyChannel = () => {
  return request({
    url: '/user/channels'
  })
}
// eslint-disable-next-line camelcase
export const ArticleList = ({ channel_id, timestamp }) => {
  return request({
    url: '/articles',
    params: {
      channel_id, timestamp
    }
  })
}
export const AllArticleList = () => {
  return request({
    url: '/channels'
  })
}
export const saveChannel = (channels) => {
  return request({
    url: 'user/channels',
    method: 'PUT',
    data: {
      channels
    }
  })
}
