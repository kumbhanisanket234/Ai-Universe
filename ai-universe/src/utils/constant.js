export const ROOT_URL = 'http://192.168.0.63:8001'
// export const ROOT_URL = 'http://192.168.145.128:8001'
// export const ROOT_URL = 'http://192.168.11.179:8001'

export const EMAIL_REGEX = /\S+@\S+\.\S+/
export const FULLNAME_REGEX = /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$|^$/
export const PHONE_REGEX = /^[0-9]|^$/
export const SPACE_REGEX = /^\S*$/

export function convert (str) {
  var date = new Date(str),
    mnth = ('0' + (date.getMonth() + 1)).slice(-2),
    day = ('0' + date.getDate()).slice(-2)
  return [date.getFullYear(), mnth, day].join('-')
}

export const COOKIE_OPTIONS = {
  path: "/",
  expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 * 365),
  // sameSite: 'strict',
  // secure: true,
  // domain: '.faithprotocol.com'
}
