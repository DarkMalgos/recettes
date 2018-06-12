<template>
    <section>
        <form action="" enctype="multipart/form-data" @submit.prevent="addRecipe">
            <label for="title">Titre</label>
            <input type="text" id="title" name="title" v-model="recipe.title">
            <label for="nb">nombre de personne</label>
            <input type="number" id="nb" name="nb" min="1" value="1" v-model="recipe.nb">
            <label for="file">images</label>
            <input type="file" id="file" name="file" multiple>
            <div v-for="ingredient in ingredients">
                <p>{{ ingredient.name }} : {{ ingredient.quantity }}</p>
            </div>
            <div class="ingr">
                <div>
                    <label for="">ingredient</label>
                    <input type="text" name="ing" v-model="ing">
                </div>
                <div>
                    <label for="">quantité</label>
                    <input type="text" name="quant" v-model="quant">
                </div>
            </div>
            <button @click.prevent="addIngredient">ajouter</button>
            <div v-for="step in steps">
                <p>étape {{ step.nb }} : {{ step.text }}</p>
            </div>
            <label for="">numero d'étape</label>
            <input type="number" name="nb" v-model="nb_step">
            <label for="">texte</label>
            <textarea name="text" cols="30" rows="10" v-model="text_step"></textarea>
            <button @click.prevent="addStep">ajouter</button>
            <div class="center">
                <input type="submit">
            </div>
        </form>
    </section>
</template>

<script>
    export default {
        name: "add",
        data() {
            return {
                recipe: {
                    title: '',
                    nb: 1,
                    picture: '',
                },
                ing: '',
                quant: '',
                ingredients: [],
                nb_step: 1,
                text_step: '',
                steps: []
            }
        },
        methods: {
            addRecipe() {
                this.$http.post('http://localhost:3000/api/recipes', {
                    recipe: this.recipe,
                    ingredients: this.ingredients,
                    steps: this.steps
                }).then(response => {
                    this.$router.push(`/recipe/${response.data}`);
                }).catch(e => {
                    console.error(e)
                })
            },
            addIngredient() {
                console.log(this.ing)
                if (this.ing == '' || this.quant == '') {
                    return
                }
                this.ingredients.push({
                    name: this.ing,
                    quantity: this.quant
                })
                this.ing = ''
                this.quant = ''
            },
            addStep() {
                console.log(this.text_step)
                if (this.text_step == '') {
                    return
                }
                this.steps.push({
                    nb: this.nb_step,
                    text: this.text_step
                })
                this.text_step = ''
                this.nb_step++
            }
        }
    }
</script>

<style scoped>

    .center{
        display: flex;
        justify-content: center;
    }
    .ingr {
        display: flex;
        flex-direction: row;
        width: 100%;
    }

    .ingr div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 200%;
    }

    section {
        display: flex;
        justify-content: center;
    }

    form {
        margin-top: 50px;
        width: 45vw;
        background-color: #f0f0f2;
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        padding: 30px;
    }

    input {
        height: 20px;
        border-radius: 5px;
        border: none;
        padding: 5px;
        background-color: white;
        margin: 5px;
    }

    textarea {
        border-radius: 5px;
        border: none;
        padding: 5px;
        background-color: white;
        resize: none;
    }

    button {
        background-color: #200f7f;
        border: none;
        width: 80px;
        padding: 5px;
        border-radius: 5px;
        color: white;
    }

    input[type='submit'] {
        width: 250px;
        background-color: #100f28;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
    }
</style>