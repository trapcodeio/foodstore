<template>
    <div id="app">
        <NavBar/>

        <!--Add Cart so it can be shown from anywhere in this project-->
        <Cart/>

        <router-view/>
    </div>
</template>

<script>
    import NavBar from "./components/Navbar"
    import Cart from "./components/Cart"

    export default {
        components: {NavBar, Cart}
    }
</script>
