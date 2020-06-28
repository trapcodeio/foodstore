<template>
    <section class="hero is-warning is-fullheight">
        <div class="hero-body has-text-centered" style="margin-top: -20vh">
            <div class="container">
                <h1 class="title">
                    Get your fast food really fast.....
                </h1>
                <div class="mt-2">
                    <router-link :to="{name: 'menu'}" class="button is-large has-text-weight-bold has-text-danger">ORDER
                        NOW
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'Home',
    }
</script>
