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
