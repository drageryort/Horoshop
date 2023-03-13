<template>
  <div class="home">
    <div class="home_top_bar">
      <h1 class="home_top_bar_title">Всі дизайни</h1>
      <router-link class="btn btn_blue" to="/add_design">Додати дизайн</router-link>
    </div>
    <div class="home_design_card_list">
      <AppDesignCard v-for="cardData in designCardList"
                     :key="cardData['designId']"
                     :cardData="cardData"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppDesignCard from '@/components/home/AppDesignCard.vue'

export default defineComponent({
  name: 'HomeView',
  components: { AppDesignCard },
  data () {
    return {}
  },
  computed: {
    designCardList () {
      return this.$store.state.designCardsList.filter((el: { designPublished: boolean }) => el.designPublished)
    }
  }
})
</script>
<style lang="scss" scoped>
  .home{
    padding: 24px 32px;
    background: var(--color-home-gray);
    color: var(--color-white);
    .home_top_bar{
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      margin: 0 0 20px;
      .home_top_bar_title{
        font-size: 24px;
        line-height: 40px;
        color: var(--color-white);
      }
    }
    .home_design_card_list{
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
  }
</style>
