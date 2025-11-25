<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",

  goBack() {
    let route = this.history.pop();
    if (route) {
      this.$router.push(route.route);
      this.$nextTick(() => {
        document.documentElement.scrollTop = route.scrollTop;
      });
    }
  }
};
</script>

<style>
#app,
body,
html {
  height: 100%;
}
</style>
