<template>
  <div>
    <v-container fluid>
      <v-row dense>
        <card />
        <card />
        <card />
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  middleware: 'isAuthenticated'
}
</script>

<style></style>
