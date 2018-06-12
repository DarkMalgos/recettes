<template>
    <section>
        <router-link tag="div" v-for="(recipe, key) in recipes" :to="'/recipe/'+recipe.id" class="recipe">
            <h2>{{recipe.title}}</h2>
            <button @click.stop="addFavorite(recipe.id)">add favoris</button>
        </router-link>
    </section>
</template>

<script>
export default {
  name: 'List',
  data () {
    return {
        recipes: []
    }
  },
    mounted() {
      this.$http.get(`http://localhost:3000/api/recipes`)
          .then(response => {
              this.recipes = response.data
          }).catch(e => {
              console.error(e)
      })
    },
    methods: {
      addFavorite(id) {
          this.$http.post(`http://localhost:3000/api/favorites/${id}`)
              .then(response => {
                  console.log(response.data)
              }).catch(e => {
                  console.error(e)
          })
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    section {
        width: 80vw;
        margin: 0 auto;
        margin-top: 10vh;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }
    .recipe {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-bottom: 10px;
        background-color: rgba(117, 132, 239, .5);
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        color: white ;
    }
    button {
        background-color: #200f7f;
        border: none;
        width: 80px;
        padding: 5px;
        border-radius: 5px;
        color: white;
    }
</style>
