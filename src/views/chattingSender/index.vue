<template>
  <div class="chatting-sender__wrapper">
    <input type="text" placeholder="메세지를 입력해주세요." />
    <img :src="senderImage" alt="전송이미지" />
  </div>
</template>

<script>
import { senderImage } from '../../assets/images';

export default {
  name: 'chattingSender',
  data() {
    return {
      senderImage,
    };
  },
};
</script>

<style lang="scss" scoped>
@import './style';
</style>
