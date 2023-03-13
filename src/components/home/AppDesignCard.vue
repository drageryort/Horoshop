<template>
  <router-link :to="`/edit_design/${cardData['designId']}`" class="card">
    <picture class="card-picture">
      <img :src="cardData['designPreviewImagesList'][0]" alt="">
    </picture>
    <div class="card-info">
      <span v-if="!!cardData['designViews']"
            class="card-views">
        {{cardData['designViews']}}
      </span>
      <h2 v-if="!!cardData['designName']"
          class="card-title">
        {{cardData['designName']}}
      </h2>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AppDesignCard',
  props: {
    cardData: Object
  }
})
</script>

<style lang="scss" scoped>
  .card{
    width: calc((100% - (20px*3)) / 4);
    .card-picture{
      margin: 0 0 16px;
      height: 400px;
      width: 100%;
      border-radius: 3px;
      overflow: hidden;
      filter: drop-shadow(0px 1px 7px rgba(0, 0, 0, 0.05));
      img{

      }
    }
    .card-info{
      display: flex;
      column-gap: 8px;
      .card-views{
        padding: 0 5px;
        background: var(--color-white);
        border-radius: 8px;
        font-size: 11px;
        line-height: 18px;
        color: var(--color-black);
      }
      .card-title{
        font-weight: 400;
        font-size: 16px;
        line-height: 18px;
      }
    }
  }
</style>
