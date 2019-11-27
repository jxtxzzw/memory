import md5 from 'js-md5'

export function password (password) {
  return md5((process.env.MEMORY_MD5_SALT ? process.env.MEMORY_MD5_SALT : '') + password)
}
