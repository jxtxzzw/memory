<template>
  <div v-html="parsedValue">
  </div>
</template>

<script>
export default {
  name: 'TextParser',
  props: {
    value: {
      type: String,
      default () {
        return ''
      }
    }
  },
  computed: {
    parsedValue () {
      const lines = this.value.split('\n')
      const length = lines.length
      const html = []
      for (let i = 0; i < length; i++) {
        let line = lines[i]
        while (line.includes('[spoiler]')) {
          line = line.replace('[spoiler]', '<span> </span></span><span class="spoiler"><span>')
        }
        while (line.includes('[/spoiler]')) {
          line = line.replace('[/spoiler]', '</span></span><span> </span>')
        }
        html.push(line)
      }
      return html.join('<br />')
    }
  }
}
</script>

<style scoped>

</style>
