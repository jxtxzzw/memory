<template>
  <div>
    <Alert show-icon>
      你正在使用的浏览器是 {{ name }}
      <Icon slot="icon" type="ios-bulb-outline"></Icon>
      <template slot="desc">
        你正在使用的 {{ name }} 的版本是 {{ version }}
      </template>
    </Alert>
    <List>
      <ListItem
        v-for="browser in browserList"
        :key="browser.title"
      >
        <ListItemMeta
          :avatar="browser.avatar"
          :title="browser.title"
          :description="getDescription(browser.version, browser.title)"
        />
        <template slot="action">
          <li v-if="browser.download">
            <a :href="browser.download">下载</a>
          </li>
        </template>
      </ListItem>
    </List>
  </div>
</template>
<script>
import config from '~/assets/BrowserCompatibility/config'
export default {
  name: 'SupportBrowserList',
  props: {
    name: {
      type: String,
      default: null
    },
    version: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      config,
      browserList: []
    }
  },
  mounted () {
    this.loadBrowserList()
  },
  methods: {
    getDescription (version, title) {
      let desc = ''
      if (version == null) {
        desc += title + ' 不再被支持。'
      } else {
        desc += '您可以使用版本不小于 ' + version + ' 的 ' + title + ' 浏览器。'
      }
      if (title === 'Edge') {
        desc += '我们推荐您尝试基于 Chromium 的微软 Edge 浏览器。'
      } else if (title === 'Chrome') {
        desc += '您也可以使用其他基于 Chrome/Chromium 的浏览器，例如 UC 浏览器、QQ 浏览器……'
      }
      return desc
    },
    loadBrowserList () {
      const firefox = {
        avatar: '/BrowserCompatibility/firefox.png',
        title: 'Firefox',
        version: this.config.Firefox,
        download: this.config.FirefoxDownload
      }
      const opera = {
        avatar: '/BrowserCompatibility/opera.jpg',
        title: 'Opera',
        version: this.config.Opera,
        download: this.config.OperaDownload
      }
      const edg = {
        avatar: '/BrowserCompatibility/edg.png',
        title: 'Edge Chromium',
        version: this.config.EdgeChromium,
        download: this.config.EdgeChromiumDownload
      }
      const chrome = {
        avatar: '/BrowserCompatibility/chrome.jpg',
        title: 'Chrome',
        version: this.config.Chrome,
        download: this.config.ChromeDownload
      }
      const safari = {
        avatar: '/BrowserCompatibility/safari.jpg',
        title: 'Safari',
        version: this.config.Safari,
        download: this.config.SafariDownload
      }
      const edge = {
        avatar: '/BrowserCompatibility/edge.jpg',
        title: 'Edge',
        version: this.config.Edge,
        download: null
      }
      const ie = {
        avatar: '/BrowserCompatibility/ie.png',
        title: 'Internet Explorer',
        version: null,
        download: null
      }
      this.browserList.push(chrome)
      this.browserList.push(firefox)
      this.browserList.push(ie)
      this.browserList.push(edge)
      this.browserList.push(edg)
      this.browserList.push(safari)
      this.browserList.push(opera)
    }
  }
}
</script>

<style scoped>

</style>
