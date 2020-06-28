<template>
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
        <div class="navbar-brand ml-5 mr-3">
            <router-link :to="{name: 'home'}">
                <h2 class="is-size-3 has-text-danger has-text-weight-bold mt-1">FoodStore</h2>
            </router-link>

            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
               data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <router-link :to="{name: 'home'}" class="navbar-item" exact>
                    Home
                </router-link>

                <router-link :to="{name: 'menu'}" class="navbar-item" exact>
                    Menu
                </router-link>
            </div>
        </div>
    </nav>
</template>