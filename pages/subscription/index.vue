<template>
  <div>
    <subscription />
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
        content: 'Subscription Music page'
      }
    ]
  }
}
</script>

<style></style>
