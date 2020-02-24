import md5 from 'js-md5'

export function password (password) {
  return md5(password)
}
