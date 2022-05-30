<template>
  <span
    :class="`mdi mdi-${done ? 'checkbox-marked-outline' : 'checkbox-blank-outline'}`"
    @click="done = !done"
  />
</template>

<script>
export default {
  data () {
    return {
      done: false
    }
  }
}
</script>

<style scoped>
.mdi {
  cursor: pointer;
}
</style>
