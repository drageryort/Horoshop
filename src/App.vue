<template>
  <div class="layout">
    <AppNavbar/>
    <div class="layout-main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import AppNavbar from '@/components/AppNavbar'

export default defineComponent({
  name: 'commonLayout',
  components: { AppNavbar }
})
</script>

<style lang="scss" scoped>
@import './assets/styles/common/fonts/fonts.min.css';
@import './assets/styles/common/global/global.min.css';
.layout{
  display: flex;
  height: 100vh;
  .layout-main{
    width: calc(100% - 40px);
    overflow-y: scroll;
    >*{
      min-height: 100%;
    }
  }
}
</style>
