<template>
    <div class="col-5 overflow-auto" style="height: 90vh">
        <div v-if="error" class="alert alert-danger m-4" role="alert">
            {{error}}
        </div>
        <div v-else-if="nocomment" class="alert alert-primary m-4" role="alert">
            There is no comments yet!
        </div>
        <div v-if="loading" class="text-center text-primary" style="margin-top: 10vh">
            <div class="spinner-grow" style="width: 5rem; height: 5rem;" role="status" >
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <div v-else-if="!contains" class="card m-4 bg-secondary">
            <div class="card-header bg-secondary text-light">
                <input v-model="comment.header" v-bind:disabled="disabled" placeholder="Write some nice title..." class="bg-secondary border-0 shadow-none text-light m-0" >
            </div>
            <div class="card-body">
                <blockquote class="blockquote mb-0 text-light">
                    <textarea v-model="comment.text" v-bind:disabled="disabled" placeholder="Don't be too harsh with your review..." rows="1" maxlength="150"
                        class="bg-secondary border-0 shadow-none text-light m-0" style="width: 100%"></textarea>
                        <button v-on:click="post()" class="btn btn-light float-right">Post review</button>
                        <select v-bind:disabled="disabled" v-model="selected" type="number" class="btn btn-light bg-white mr-sm-2 w-auto float-right">
                            <option v-for="option in options" v-bind:key="option.value" v-bind:value="option.value">{{ option.text }}</option>
                        </select>
                </blockquote>
            </div>
        </div>
        <div v-for="comment in comments" v-bind:key="comment._id" class="card m-4">
            <div class="card-header">
                {{comment.header}}
            </div>
            <div class="card-body">
                <blockquote class="blockquote mb-0">
                    <p>{{comment.text}}</p>
                    <footer class="blockquote-footer">{{comment.by}}, <i v-for=" n in comment.rating" v-bind:key="n" class="fas fa-star text-warning"></i></footer>
                </blockquote>   
            </div>
        </div>
    </div>
</template>

<script>
import { Comments } from "../services"
import store from "../store"
import comments from '../services/requests/comments'

export default {
    props: ["recipe"],

    data() {
        return {
            loading: true,
            disabled: false,
            contains: false,
            nocomment: false,
            comments: new Array,
            comment: {
                header: new String,
                text: new String
            },
            error: "",
            selected: 5,
            options: [
                { text: '1', value: 1 },
                { text: '2', value: 2 },
                { text: '3', value: 3 },
                { text: '4', value: 4 },
                { text: '5', value: 5 }
            ],
        }
    },

    async mounted() {
        try {
            if (this.recipe.by == store.credentials.username) this.contains = true
            this.comments = await Comments.get(this.recipe)
            this.comments.forEach(e => {
                if(e.by == store.credentials.username){
                    this.contains = true
                    return
                }
            })
            this.loading = false
        } catch (error) {
            if (error.toString().includes('463')) this.nocomment = true
            else this.error = "Something went wrong!"
            this.loading = false
        }
    },

    methods: {
      async post() {
        try {
            this.disabled = true
            this.comment.rating = this.selected
            let response = await Comments.set(this.comment, this.recipe._id)
            this.comments.unshift(response)
            this.contains = true
            this.error = ''
            this.nocomment = false
        } catch (error) {
            if (error.toString().includes('460')) this.error = "Title is too short!"
            else if (error.toString().includes('461')) this.error = "Review is too short!"
            else this.error = "Something went wrong!"
            this.disabled = false
        }
      }
    }
}
</script>
