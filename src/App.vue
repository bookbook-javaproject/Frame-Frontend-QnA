<template>
  <div id="app">
    <messenger />
  </div>
</template>

<script>
import Messenger from './views/messenger';

export default {
  name: 'App',
  components: {
    Messenger,
  },
};
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
}
</style>
