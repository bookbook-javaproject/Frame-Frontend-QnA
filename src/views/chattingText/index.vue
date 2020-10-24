<template>
  <div class="chatting-text__wrapper" ref="infinityScrollRef">
    <p v-if="!chatData || !chatData.length">Frame에 궁금한점이 있으신가요?</p>
    <div
      v-for="(data, index) in chatData"
      :key="data.id"
      :class="
        data.to === 'admin'
          ? `chat-bubble isAdmin ${
              chatData[index + 1]
                ? chatData[index + 1].to !== data.to
                  ? 'lastChat'
                  : ''
                : ''
            }`
          : `chat-bubble ${
              chatData[index + 1]
                ? chatData[index + 1].to !== data.to
                  ? 'lastChat'
                  : ''
                : ''
            }`
      "
    >
      <p>{{ data.content }}<span v-text="data.created_at" /></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChattingText',
  data() {
    return {
      chatData: new Array(20).fill(1).map((_, index) => ({
        id: index + 1,
        content: '안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕?',
        to: index % 3 ? 'admin' : '',
        created_at: '2020년 10월 24일 15시 51분',
      })),
    };
  },
  mounted() {
    this.$refs.infinityScrollRef.scrollTo(
      0,
      this.$refs.infinityScrollRef.scrollHeight
    );
  },
};
</script>

<style lang="scss" scoped>
@import './style';
</style>
