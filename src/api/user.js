import requset from '@/utils/requset'
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
