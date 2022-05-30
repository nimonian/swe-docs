<template>
  <div v-html="svg"></div>
</template>

<script>

export default {
  props: {
    latex: {
      default: '',
      type: String
    }
  },
  data () {
    return {
      svg: ''
    }
  },
  mounted () {
    this.fetchSVG()
  },
  methods: {
    async fetchSVG () {
      try {
        const response = await fetch('https://sleepy-island-88241.herokuapp.com/api/v1/svg', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ latex: this.latex })
        })
        const data = await response.json()
        this.svg = data.svg
      } catch (err) {
        console.error(err)
      }

      // this.svg = `
      // <svg height="100" width="100">
      //   <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
      // </svg>
      // `
    }
  }
}

</script>