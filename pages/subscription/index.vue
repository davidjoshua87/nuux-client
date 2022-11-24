<template>
  <div>
    <subscription />
  </div>
</template>

<script>
export default {
  middleware: 'isAuthenticated',
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
