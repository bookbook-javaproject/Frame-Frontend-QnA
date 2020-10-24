<template>
  <div
    v-bind:class="isOpen ? 'chatting__wrapper isOpen' : 'chatting__wrapper'"
    v-if="animationRender"
    @animationend="onAnimationEnd"
  >
    <header>QnA</header>
    <main></main>
  </div>
</template>

<script>
export default {
  name: 'Chatting',
  props: {
    isOpen: Boolean,
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
