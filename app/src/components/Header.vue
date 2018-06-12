<template>
    <header>
        <router-link class="link" to="/">Accueil</router-link>
        <router-link tag="div" to="/add" class="add">+</router-link>
    </header>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
            }
        }
    }
</script>

<style scoped>
    header{
        height: 10vh;
        width: 100%;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, .2);
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .link {
        margin-right: 20px;
        text-decoration: none;
        color: black;
    }
    .add {
        font-size: 80px;
        margin-right: 40px;
        cursor: pointer;
    }
</style>