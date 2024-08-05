<template>
  <div>
    <account />
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  head: {
    title: 'Profile page',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Profile page'
      }
    ]
  }
}
</script>

<style></style>
