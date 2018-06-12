<template>
  <div id="app">
    <Header></Header>
    <router-view/>
  </div>
</template>

<script>

  import Header from './components/Header'
export default {
  name: 'App',
    components: {
      Header
    }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
    font-family: Verdana;
  }
</style>
