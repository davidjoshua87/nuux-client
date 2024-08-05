<template>
  <div>
    <discover />
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  head: {
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Dicovery music page'
      }
    ]
  }
}
</script>

<style></style>
