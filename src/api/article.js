import requset from '@/utils/requset'
export const getArticle = (article_id) => {
  return requset({
    url: `/articles/${article_id}`

  })
}
export const addUser = (target) => {
  return requset({
    method: 'POST',
    url: '/user/followings',
    data: {
      target
    }
  })
}
export const endUser = (target) => {
  return requset({
    method: 'delete',
    url: `user/followings/${target}`
  })
}
export const addCollect = (target) => {
  return requset({
    method: 'POST',
    url: '/article/collections',
    data: {
      target
    }
  })
}
export const endCollect = (target) => {
  return requset({
    method: 'delete',
    url: `/article/collections/${target}`
  })
}
export const getComment = ({ type, source, offset, limit }) => {
  return requset({
    url: '/comments',
    params: { type, source, offset, limit }
  })
}
export const addLike = (target) => {
  return requset({
    method: 'POST',
    url: '/comment/likings',
    data: { target }
  })
}
export const delLike = (target) => {
  return requset({
    method: 'DELETE',
    url: `/comment/likings/${target}`
  })
}
export const addComment = (data) => {
  return requset({
    method: 'POST',
    url: '/comments',
    data
  })
}
