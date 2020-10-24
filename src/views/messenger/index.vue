<template>
  <div class="messenger__wrapper">
    <chatting v-bind:isOpen="isOpen" v-bind:isLogin="isLogin" />
    <button @click="toggleModal">
      <img :src="isOpen ? closeImage : chattingImage" />
    </button>
  </div>
</template>

<script>
import Chatting from '../chatting';
import { chattingImage, closeImage } from '../../assets/images';

export default {
  name: 'Messenger',
  components: {
    Chatting,
  },
  data() {
    return {
      isOpen: false,
      isLogin: true,
      chattingImage,
      closeImage,
    };
  },
  methods: {
    toggleModal() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
@import './style/index.scss';
</style>
