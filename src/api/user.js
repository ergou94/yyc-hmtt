import requset from '@/utils/requset'
// 只有在vue组件中才能用this.$store
// 在JS中必须引入
export const getSmsCode = (mobile) => {
  return requset({
    url: `/sms/codes/${mobile}`
  })
}
export const login = ({ mobile, code }) => {
  return requset({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile, code
    }
  })
}
export const getUserInfo = () => {
  return requset({
    url: 'user'
  })
}
export const getUserProfile = () => {
  return requset({
    url: '/user/profile'
  })
}
export const updateUserProfile = (profile) => {
  return requset({
    method: 'patch',
    url: '/user/profile',
    data:
      profile

  })
}
export const updateUserAvatar = (data) => {
  return requset({
    method: 'patch',
    url: '/user/photo',
    data
  })
}
