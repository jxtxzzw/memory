import config from './config'

function getBrowserAndVersion () {
  let sBrowser = ''
  let sBrowserVersion = ''
  const sUsrAg = navigator.userAgent
  // The order matters here, and this may report false positives for unlisted browsers.
  if (sUsrAg.includes('Firefox')) {
    sBrowser = 'Mozilla Firefox'
    const matches = sUsrAg.match(/Firefox\/([0-9.]+)/i)
    sBrowserVersion = matches[1]
    // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
  } else if (sUsrAg.includes('Opera') || sUsrAg.includes('OPR')) {
    sBrowser = 'Opera'
    const matches = sUsrAg.match(/(Opera|OPR)\/([0-9.]+)/i)
    sBrowserVersion = matches[2]
    // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
  } else if (sUsrAg.includes('Trident')) {
    sBrowser = 'Microsoft Internet Explorer'
    const matches = sUsrAg.match(/rv:([0-9.]+)/i)
    sBrowserVersion = matches[1]
    // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
  } else if (sUsrAg.includes('Edge')) {
    sBrowser = 'Microsoft Edge'
    const matches = sUsrAg.match(/Edge\/([0-9.]+)/i)
    sBrowserVersion = matches[1]
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
  } else if (sUsrAg.includes('Edg')) {
    sBrowser = 'Microsoft Edge Chromium Based'
    const matches = sUsrAg.match(/Edg\/([0-9.]+)/i)
    sBrowserVersion = matches[1]
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.36 Safari/537.36 Edg/79.0.309.25"
  } else if (sUsrAg.includes('Chrome')) {
    sBrowser = 'Google Chrome or Chromium'
    const matches = sUsrAg.match(/Chrome\/([0-9.]+)/i)
    sBrowserVersion = matches[1]
    // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
  } else if (sUsrAg.includes('Safari')) {
    sBrowser = 'Apple Safari'
    const matches = sUsrAg.match(/Safari\/([0-9.]+)/i)
    sBrowserVersion = matches[1]
    // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
  } else {
    sBrowser = 'Unknown'
    sBrowserVersion = 'Unknown'
  }
  return [sBrowser, sBrowserVersion]
}

function compareVersion (browser, bottomLine) {
  const browserMajor = parseInt(browser.split('.')[0])
  return browserMajor >= bottomLine
}

export function checkCompatibility () {
  const browser = getBrowserAndVersion()
  const sBrowser = browser[0]
  const sBrowserVersion = browser[1]
  let judgement = 0

  if (sBrowser === 'Mozilla Firefox') {
    judgement = compareVersion(sBrowserVersion, config.Firefox) ? config.Accepted : config.NotTested
  } else if (sBrowser === 'Opera') {
    judgement = compareVersion(sBrowserVersion, config.Opera) ? config.Accepted : config.NotTested
  } else if (sBrowser === 'Microsoft Internet Explorer') {
    judgement = config.NotSupported
  } else if (sBrowser === 'Microsoft Edge') {
    judgement = compareVersion(sBrowserVersion, config.Edge) ? config.Accepted : config.NotTested
  } else if (sBrowser === 'Microsoft Edge Chromium Based') {
    judgement = compareVersion(sBrowserVersion, config.EdgeChromium) ? config.Accepted : config.NotTested
  } else if (sBrowser === 'Google Chrome or Chromium') {
    judgement = compareVersion(sBrowserVersion, config.Chrome) ? config.Accepted : config.NotTested
  } else if (sBrowser === 'Safari') {
    judgement = compareVersion(sBrowserVersion, config.Safari) ? config.Accepted : config.NotTested
  } else {
    judgement = config.NotTested
  }
  return [judgement, sBrowser, sBrowserVersion]
}
