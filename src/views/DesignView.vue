<template>
  <div class="design_page">
    <div class="navigation">
      <router-link to="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
          <path fill="#222" fill-rule="evenodd" d="M4.364 11.364a.9.9 0 0 0 0 1.272l6 6 1.272-1.272L7.273 13H20v-2H7.273l4.363-4.364-1.272-1.272-6 6Z" clip-rule="evenodd"/>
        </svg>
      </router-link>
    </div>
    <form class="main">
      <div class="main_top_bar">
        <div class="published_state">
          <label class="circled_checkbox">
            <input v-model="designPublished" class="input-circle-checkbox hidden" type="checkbox">
            <div class="circled_checkbox__wrapper" >
              <div class="circled_checkbox__circle"></div>
            </div>
          </label>
          <span class="published_state_text" :class="{published:designPublished}">{{publishedText}}</span>
        </div>
        <div class="buttons_block">
          <button class="btn_white" v-if="this.$route['name'] !== 'add'" @click.prevent="removeDesign">
            Видалити
          </button>
          <button
            class="btn btn_blue"
            @click.prevent="updateDesign"
            :disabled="!(!!this.designName && !!this.designViews && !!this.designPreviewsList.length)"
          >
            Зберегти і вийти
          </button>
        </div>
      </div>
      <AppPreviews
        :designPreviewsList="designPreviewsList"
        @updateImageEmit = "updateImage"
        @removeImageEmit = "removeImage"
      />
      <div class="form_list">
        <div class="top_row">
          <input class="input-filed"
                 :class="{empty:!designViews}"
                 v-model="designViews"
                 type="text"
                 name="design_views"
                 placeholder="Кількість переглядів">
          <input class="input-filed"
                 :class="{empty:!designName}"
                 v-model="designName"
                 type="text"
                 name="design_name"
                 placeholder="Назва дизайну">
        </div>
        <span class="input-filed url_field">https://{{designName}}{{designViews}}.horoshop.ua/</span>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppPreviews from '@/components/design/AppPreviews.vue'

export default defineComponent({
  name: 'DesignView',
  components: { AppPreviews },
  data () {
    return {
      designId: '',
      designName: '',
      designViews: '',
      routeId: this.$route.params.id,
      designPublished: false,
      designPreviewsList: [] as string[]
    }
  },
  computed: {
    designIndex () {
      return this.$store.state.designCardsList.findIndex((elem: { designId: number }) => elem.designId === Number(this.routeId))
    },
    publishedText () {
      if (this.designPublished) {
        return 'Опублікований'
      }
      return 'Неопублікований'
    }
  },
  beforeMount () {
    if (this.$route.name !== 'add') {
      this.designId = this.$store.state.designCardsList[this.designIndex].designId
      this.designName = this.$store.state.designCardsList[this.designIndex].designName
      this.designViews = this.$store.state.designCardsList[this.designIndex].designViews
      this.designPublished = this.$store.state.designCardsList[this.designIndex].designPublished
      this.designPreviewsList = this.$store.state.designCardsList[this.designIndex].designPreviewImagesList
    }
  },
  methods: {
    updateImage (src:string) {
      this.designPreviewsList.push(src)
    },
    removeImage (index:number) {
      this.designPreviewsList.splice(index, 1)
    },
    updateDesign () {
      let data = {}
      if (this.designIndex === -1) {
        data = {
          designId: this.$store.state.designCardsList.length + 1,
          designName: this.designName,
          designViews: this.designViews,
          designPublished: this.designPublished,
          designPreviewImagesList: []
        }
      } else {
        data = {
          designIndex: this.designIndex,
          designName: this.designName,
          designViews: this.designViews,
          designPublished: this.designPublished
        }
      }
      this.$store.commit('updateDesign', data)
      this.$router.push('/')
    },
    removeDesign () {
      if (this.designIndex !== -1) {
        this.$store.commit('removeDesign', this.designIndex)
        this.$router.push('/')
      } else {
        alert('Error, design is absent in store')
      }
    }
  }
})
</script>

<style lang="scss" scoped>
  .design_page{
    display: flex;
    padding: 24px 32px;
    .navigation{
      padding: 0 32px;
      svg{}
    }
    .main{
      display: flex;
      flex-direction: column;
      row-gap: 40px;
      width: 100%;
      padding: 0 32px;
      .main_top_bar{
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        .published_state{
          display: flex;
          column-gap: 8px;
          align-items: center;
          .circled_checkbox{
            cursor: pointer;
            .circled_checkbox__wrapper{
              width: 64px;
              height: 24px;
              transition: .4s;
              background: rgba(0, 0, 0, 0.1);
              position: relative;
              border-radius: 14px;
              box-shadow: inset 0px 0px 4px 0px rgba(0, 0, 0, 0.2), 0 -3px 4px rgba(0, 0, 0, 0.15);
              border: 0.5px solid rgba(117, 117, 117, 0.31);
              cursor: pointer;
              .circled_checkbox__circle {
                transition: .4s;
                display: block;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                background: #fff;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 2px;
              }
            }
            .input-circle-checkbox:checked{
              +.circled_checkbox__wrapper{
                background: var(--color-toxic-green);
                .circled_checkbox__circle{
                  left: calc(100% - 22px);
                }
              }
            }
          }
          .published_state_text{
            font-size: 14px;
            line-height: 18px;
            color: var(--color-black);
            &.published{
              color: var(--color-toxic-green);
            }
          }
        }
        .buttons_block{
          display: flex;
          column-gap: 8px;
        }
      }
      .form_list{
        display: flex;
        flex-direction: column;
        row-gap: 24px;
        .top_row{
          display: flex;
          column-gap: 8px;
          input{
            &[name=design_views]{
              width: 80px;
            }
            &[name=design_name]{
              min-width: 512px;
            }
          }
        }
        .url_field{
          padding: 6px 10px;
          width: 600px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }
      }
    }
  }
</style>
