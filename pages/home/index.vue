<template>
  <div>
    <welcome />
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
        content: 'Search Music page'
      }
    ]
  }
}
</script>

<style></style>
