<template>
  <v-card class="my-2">
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-img
          class="white--text align-end"
          height="160px"
          name="backgroundImageUrl"
          :src="
            article.backgroundImageUrl != null
              ? article.backgroundImageUrl
              : 'https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg'
          "
          gradient="to bottom, rgba(0,0,0,0), rgba(46, 49, 49, 0.4)"
          v-ripple
          v-bind="attrs"
          v-on="on"
        >
          <v-card-title class="headline">
            {{ article.title }}
          </v-card-title>
        </v-img>
      </template>
      <span> {{ article.backgroundImageCopyright }} </span>
    </v-tooltip>

    <v-card-subtitle>
      {{ article.authorName }} {{ '&nbsp;|&nbsp;' }}
      {{ article.clickAmount }} {{ $t('article.readed') }} {{ '&nbsp;|&nbsp;' }}
      {{ moment.utc(article.createTime).fromNow() }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        text
        @click.stop="$router.push({ path: '/article/' + article.aid })"
      >
        Read
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ArticleCard',
  props: ['article']
}
</script>

<style scoped>
.theme--light.v-card {
  background-color: #F0F8FF
}
</style>
