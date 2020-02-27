import md5 from 'js-md5'

export function clientEncrypt (password) {
  return md5(password)
}

export function serverEncrypt (password) {
  return md5(process.env.MEMORY_MD5_SALT + password.split('').reverse().join(''))
}

export function randomPassword (length = 10) {
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  /** 默认去掉了容易混淆的字符 o O 0, L l I 1, 9 g q, V v U u **/
  const maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < length; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

// 为了在组件中用密码加密，这里使用了 import/export 语法，否则需要修改的地方有点多
// 但是该语法无法在 commonJS 中使用，即由于数据库初始化时需要加密 admin 的密码，该初始化 js 无法直接被 node 运行
// 于是需要使用 babel-node 来执行初始化 js 以便其可以将 import/export 语法转化为 require/module.exports 语法后执行
// 然而类的定义时采用的是 class ItemTag extends Model {} 语法，没有使用 new，所以需要禁用 babel 自动转换 ES 的类
