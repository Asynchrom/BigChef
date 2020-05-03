<template>
    <div class="col-5 overflow-auto" style="height: 90vh">
        <div v-if="loading" class="text-center text-primary" style="margin-top: 10vh">
            <div class="spinner-grow" style="width: 5rem; height: 5rem;" role="status" >
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <div v-else-if="!contains" class="card m-4 bg-secondary">
            <div class="card-header bg-secondary text-white">
                <input v-model="comment.header" v-bind:disabled="disabled" placeholder="Write some nice title..." class="bg-secondary border-0 shadow-none text-light m-0" >
            </div>
            <div class="card-body">
                <blockquote class="blockquote mb-0 text-light">
                    <textarea v-model="comment.text" v-bind:disabled="disabled" placeholder="Don't be too harsh with your review..." rows="1" maxlength="150"
                        class="bg-secondary border-0 shadow-none text-light m-0" style="width: 100%"></textarea>
                    <button v-on:click="post()" class="btn btn-light float-right">Post review</button>
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
                    <footer class="blockquote-footer">{{comment.by}}</footer>
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
            comments: new Array,
            comment: {
                header: new String,
                text: new String
            },
            error: ""
        }
    },

    async mounted() {
        try {
            this.comments = await Comments.get(this.recipe)
            this.comments.forEach(e => {
                if(e.by == store.credentials.username){
                    this.contains = true
                    return
                }
            })
            this.loading = false
        } catch (error) {
            console.log(error)
            this.loading = false
            this.error = error
        }
    },

    methods: {
      async post() {
        try {
            this.disabled = true
            let response = await Comments.set(this.comment, this.recipe._id)
            this.comments.unshift(response)
            this.contains = true
        } catch (error) {
            console.log(error)
            this.disabled = false
            this.error = error
        }
      }
    }
}
</script>
