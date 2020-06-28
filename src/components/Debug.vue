<template>
    <div v-if="show" class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
            <pre class="box has-background-light has-text-dark">{{content}}</pre>
        </div>
        <button @click.prevent="closeModal" class="modal-close is-large" aria-label="close"></button>
    </div>
</template>

<script>
    export default {
        name: 'Debug',
        model: {prop: 'show', event: 'toggleShow'},
        props: {
            show: {
                type: Boolean,
                default: false
            },
            content: {
                default: null
            }
        },

        methods: {
            closeModal(){
                return this.$emit('toggleShow', false)
            }
        }
    }
</script>