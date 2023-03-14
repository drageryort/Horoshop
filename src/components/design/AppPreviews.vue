<template>
  <div class="preview_list" v-if="designPreviewsList.length" @dragover.prevent @drop.prevent>
    <div class="preview_list_picture_wrapper"
         v-for="preview in designPreviewsList"
         :key="preview"
    >
      <picture class="preview_list_picture">
        <img class="preview_list_picture" :src="preview" alt="preview image">
      </picture>
      <button class="btn preview_list_picture_remove_btn" @click.prevent="removeImage">
        <img :data-image="preview" src="@/assets/images/svg/delete_icon.svg" alt="remove_icon">
      </button>
    </div>
    <label class="add_to_preview_list_block btn" @drop="dragImage">
      <picture class="add_to_preview_list_picture">
        <img src="@/assets/images/svg/add_image_icon.svg" alt="add to preview list image">
      </picture>
      <input type="file" hidden @change="addImage">
    </label>
  </div>
  <div v-else class="preview_list_empty" @dragover.prevent @drop.prevent>
    <label class="preview_list_empty_label" @drop="dragImage">
      <picture class="preview_list_empty_label_image">
        <img src="@/assets/images/svg/empty_image_icon.svg" alt="empty image">
      </picture>
      <input type="file" hidden @change="addImage">
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AppPreviews',
  props: ['designPreviewsList'],
  emits: {
    updateImageEmit: (src: string) => src,
    removeImageEmit: (index: number) => index
  },
  methods: {
    dragImage (event: DragEvent) {
      const dataTransfer = event.dataTransfer as DataTransfer
      const file = (dataTransfer.files as FileList)[0]
      this.updateImage(file)
    },
    addImage (event: Event) {
      const target = event.target as HTMLInputElement
      const file = (target.files as FileList)[0]
      this.updateImage(file)
    },
    updateImage (file:File) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        const src = reader.result as string
        this.$emit('updateImageEmit', src)
      }
    },
    removeImage (event: Event) {
      const target = event.target as HTMLInputElement
      const index = this.designPreviewsList.findIndex((elem:string) => elem === target.dataset.image)
      this.$emit('removeImageEmit', index)
    }
  }
})
</script>

<style lang="scss" scoped>
  .preview_list{
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    .preview_list_picture_wrapper{
      height: max-content;
      .preview_list_picture{
        width: 120px;
        max-height: 220px;
        height: max-content;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
        border-radius: 3px;
        overflow: hidden;
      }
      .preview_list_picture_remove_btn{
        padding: 4px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 3px;
        position: absolute;
        bottom: 4px;
        right: 4px;
        z-index: -1;
        img{
          width: 16px;
          height: 16px;
        }
      }
      &:hover{
        .preview_list_picture_remove_btn{
          z-index: 1;
        }
      }
    }
    .add_to_preview_list_block{
      display: flex;
      justify-content: center;
      padding: 45px;
      width: 120px;
      height: max-content;
      border: 2px dashed rgba(0, 0, 0, 0.1);
      border-radius: 3px;
      .add_to_preview_list_picture{
        width: 30px;
        height: 30px;
      }
    }
  }
  .preview_list_empty{
    .preview_list_empty_label{
      display: flex;
      justify-content: center;
      height: 100%;
      padding: 36px;
      width: 600px;
      border: 2px dashed rgba(0, 0, 0, 0.1);
      border-radius: 3px;
      .preview_list_empty_label_image{
        width: 60px;
        height: 48px;
      }
    }
  }
</style>
