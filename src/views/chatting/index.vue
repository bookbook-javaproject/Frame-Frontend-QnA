<template>
  <div
    v-bind:class="isOpen ? 'chatting__wrapper isOpen' : 'chatting__wrapper'"
    v-if="animationRender"
    @animationend="onAnimationEnd"
  >
    <header>QnA</header>
    <main v-bind:class="isOpen ? 'isOpen' : ''">
      <div v-if="isLogin"></div>
      <not-login v-else />
    </main>
  </div>
</template>

<script>
import NotLogin from '../notLogin';
export default {
  name: 'Chatting',
  components: {
    'not-login': NotLogin,
  },
  props: {
    isOpen: Boolean,
    isLogin: Boolean,
  },
  watch: {
    isOpen() {
      if (this.isOpen) {
        this.animationRender = true;
      }
    },
  },
  data() {
    return {
      animationRender: this.isOpen,
    };
  },
  methods: {
    onAnimationEnd() {
      if (!this.isOpen) {
        this.animationRender = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import './style';
</style>
