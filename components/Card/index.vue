<template>
  <v-card class="mx-auto mb-3" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1"> Paket 5 </v-list-item-title>
        <v-list-item-subtitle>Berlangganan selama 1 bulan</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="grey"><img src="https://bisnisasia.co.id/wp-content/uploads/2021/06/Spotify-Premium.jpg" /></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn outlined rounded text> Subscribe </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'CardComponent'
}
</script>
