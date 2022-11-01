<template>
  <div
    :absolute="!fixed"
    class="d-flex align-center justify-center footer"
  >
    <span>Group ONE &copy; {{ new Date().getFullYear() }}</span>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent',
  data () {
    return {
      fixed: false
    }
  }
}
</script>
<style>
.footer {
  height: auto;
  flex: 0 1 auto !important;
  flex-wrap: wrap;
  padding: 6px 16px;
  position: relative;
  background-color: #1E1E1E;
  transition-duration: 0.2s;
  transition-property: background-color, left, right;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
