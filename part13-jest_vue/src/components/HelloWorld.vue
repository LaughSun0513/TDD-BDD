<template>
  <div class="hello">
    <h1 class="myTitle">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>
<style scoped lang="stylus">

</style>
