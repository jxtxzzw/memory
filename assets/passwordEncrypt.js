import md5 from 'js-md5'

export function clientEncrypt (password) {
  return md5(password)
}

export function serverEncrypt (password) {
  return md5(process.env.MEMORY_MD5_SALT + password.split('').reverse().join(''))
}

export function randomPassword (length) {
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  /** 默认去掉了容易混淆的字符 o O L l, 9 g q, V v, U u, I 1 **/
  const maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < length; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}
