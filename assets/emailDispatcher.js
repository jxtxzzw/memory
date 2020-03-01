const { getUserEmail } = require('../api/UserInfo')
const nodemailer = require('nodemailer')

function generateHTML (bodyHTML) {
  const current = new Date()
  return `<html>
<head>
  <title>Memory | 我们可以共享所有记忆的最佳存储空间</title>
  <style type="text/css">
    #template_body a {
      color: #4ca6cf;
    }
  </style>
  <style type="text/css" id="custom-css">
  </style>
</head>
<body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
  <div id="body" style="
  background-color:#e3e3e3;
  width:100%;
  -webkit-text-size-adjust:none !important;
  margin:0;
  padding: 70px 0 70px 0;
  ">
  <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
    <tr>
      <td align="center" valign="top">
        <table border="0" cellpadding="0" cellspacing="0" id="template_container" style="
        -webkit-box-shadow:0 0 0 3px rgba(0,0,0,0.025) !important;
        box-shadow:0 0 0 3px rgba(0,0,0,0.025) !important;
        -webkit-border-radius:0px !important;
        border-radius:0px !important;
        background-color: #fafafa;
        border-radius:6px !important;
        width: 100%;
        max-width: 100%;">
          <tr>
            <td align="center" valign="top">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" id="template_header" style="
                background-color: #20a0ff;
                color: #f1f1f1;
                -webkit-border-top-left-radius:0px !important;
                -webkit-border-top-right-radius:0px !important;
                border-top-left-radius:0px !important;
                border-top-right-radius:0px !important;
                border-bottom: 0;
                font-family:Arial;
                font-weight:bold;
                line-height:100%;
                vertical-align:middle;
                ">
                <tr>
                  <td>
                    <h1 style="
                    color: #f1f1f1;
                    margin:0;
                    padding: 28px 24px;
                    display:block;
                    font-family:Arial;
                    font-size: 30px;
                    font-weight:bold;
                    text-align:center;
                    line-height: 150%;
                    " id="logo">
                      <a style="
                      color: #f1f1f1;
                      text-decoration: none;
                      " href="https://memory.jxtxzzw.com" title="Memory | 我们可以共享所有记忆的最佳存储空间">
                        Memory | 我们可以共享所有记忆的最佳存储空间
                      </a>
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" valign="top">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" id="template_body">
                <tr>
                  <td valign="top" style="
                  background-color: #fafafa;
                  " id="mailtpl_body_bg">
                    <table border="0" cellpadding="20" cellspacing="0" width="100%">
                      <tr>
                        <td valign="top">
                          <div style="
                          color: #888;
                          font-family:Arial;
                          font-size: 14px;
                          line-height:150%;
                          text-align:left;
                          " id="mailtpl_body">
                            ${bodyHTML}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" valign="top">
              <table border="0" cellpadding="10" cellspacing="0" width="100%" id="template_footer" style="
                border-top:1px solid #E2E2E2;
                background: #eee;
                -webkit-border-radius:0px 0px 0px 0px;
                -o-border-radius:0px 0px 0px 0px;
                -moz-border-radius:0px 0px 0px 0px;
                border-radius:0px 0px 0px 0px;
                ">
                <tr>
                  <td valign="top">
                    <table border="0" cellpadding="10" cellspacing="0" width="100%">
                      <tr>
                        <td colspan="2" valign="middle" id="credit" style="
                        border:0;
                        color: #20a0ff;
                        font-family: Arial;
                        font-size: 12px;
                        line-height:125%;
                        text-align:center;
                        ">
                          ${current.toLocaleString('zh-cn', { hour12: false })}
                         <a href="https://memory.jxtxzzw.com" title="Memory | 我们可以共享所有记忆的最佳存储空间">
                          Memory | 我们可以共享所有记忆的最佳存储空间
                         </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</div>
</body>
</html>
`
}

function generateContent (identifier, parameter) {
  let subject = '来自 Memory 的邮件'
  let attachments
  let content = {
    subject,
    html: '<p> 似乎哪里出了什么错，邮件内容找不到了…… </p>'
  }
  let embedImage = ''
  switch (identifier) {
    case 'announcement':
      subject = 'Memory：有一条新的公告'
      content = {
        subject,
        html: generateHTML(`
        <h1> ${subject} </h1>
        <p>
        有一条新的公告： <br/>
        ${parameter.content} <br/>
        </p>
        `)
      }
      break
    case 'reply':
      subject = 'Memory：有人回复了您的评论'
      content = {
        subject,
        html: generateHTML(`
        <h1> ${subject} </h1>
        <p>
        您的评论：<br/>
        ${parameter.oldReply} </br>
        收到了一条新的回复，来自 ${parameter.who}：</br>
        ${parameter.newReply} </br>
        </p>
        <p>
          您可以点击链接查看详细：<a href="${parameter.href}"> ${parameter.href} </a>
        </p>
        `)
      }
      break
    case 'share':
      subject = 'Memory：有人分享了新的内容'
      if (parameter.image.length > 0) {
        // 说明上传了封面
        attachments = [
          {
            path: parameter.image,
            cid: 'cover'
          }
        ]
        embedImage = `<img src="cid:${attachments[0].cid}" />`
      } else {
        embedImage = '<p> 该用户没有上传封面图片 </p>'
      }
      content = {
        subject,
        html: generateHTML(`
        <h1> ${subject} </h1>
        <p>
        ${parameter.who} 分享了新的内容：<br/>
        ${parameter.title} </br>
        </p>
        <p>
          您可以点击链接查看详细：<a href="${parameter.href}"> ${parameter.href} </a>
        </p>
        封面预览：<br />
        ${embedImage} <br />
        `),
        attachments
      }
      break
    case 'password':
      subject = 'Memory：密码已被重置'
      content = {
        subject,
        html: generateHTML(`
          <h1> ${subject} </h1>
          <p>
           ${parameter.username}，您的密码已被重置为 ${parameter.password}，请及时登录并修改。
          </p>
        `)
      }
      break
    default:
      break
  }
  return content
}

async function getReceivers (identifer, userId = 0) {
  return subscriptionFilter(identifer, await getUserEmail(userId))
}

async function subscriptionFilter (identifer, emails) {
  // TODO: 遍历 subscription 数据库，只保留开启了订阅的
  await setTimeout(() => {}, 1000)
  return emails
}

async function send (receivers, content) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.MEMORY_SMTP_HOST,
    port: process.env.MEMORY_SMTP_PORT,
    secure: process.env.MEMORY_SMTP_SECURE, // true for 465, false for other ports
    auth: {
      user: process.env.MEMORY_SMTP_USER, // generated ethereal user
      pass: process.env.MEMORY_SMTP_PASS // generated ethereal password
    }
  })

  for (const address of receivers) {
    // send mail with defined transport object
    const data = {
      from: `${process.env.MEMORY_SMTP_SENDER} <${process.env.MEMORY_SMTP_USER}>`, // sender address
      to: address, // list of receivers
      subject: content.subject, // Subject line
      html: content.html, // html body
      attachments: content.attachments
    }
    try {
      const info = await transporter.sendMail(data)
      console.log('Message sent: %s', info.messageId)
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // // Preview only available when sending through an Ethereal account
      // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
      // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    } catch (e) {
      console.log(e)
    }
  }
}

export async function dispatch (identifier, parameter) {
  let receiverId = 0 // 默认针对全体用户
  switch (identifier) {
    case 'reply':
      receiverId = parameter.replyTo
      break
    case 'password':
      receiverId = parameter.id
      break
    default:
      break
  }
  const receivers = await getReceivers(identifier, receiverId)
  const content = generateContent(identifier, parameter)
  console.log(`Sending: ${identifier} to ${receivers}`)
  await send(receivers, content)
}
