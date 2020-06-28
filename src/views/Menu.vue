<template>
    <div class="has-background-light" style="min-height: 100vh">
        <section class="hero is-warning">
            <div class="hero-body has-text-centered">
                <div class="container">
                    <h1 class="title">
                        Menu
                    </h1>
                    <button @click.prevent="showDebug=true" class="button is-small is-dark">Show Data</button>
                </div>
            </div>
        </section>

        <div class="container mt-5">
            <div class="is-clearfix mb-2">
                <h6 class="is-size-6 is-pulled-left">Items Available ({{items.length}})</h6>

                <!--   A cart button close to the items   -->
                <button @click.prevent="showCartModal"
                        class="button is-small is-pulled-right is-dark has-text-weight-bold">
                    ({{cart.length}}) CART
                </button>
            </div>
            <hr class="mt-0 has-background-grey-lighter"/>

            <div class="columns is-multiline">

                <!--  Loop Through Items  -->
                <template v-for="(item, itemIndex) in items">
                    <div :key="itemIndex" class="column is-4">
                        <div class="box p-0">
                            <div class="item-image">
                                <img :src="`/items/${item.image}`">
                            </div>
                            <div class="item-info py-3 px-2 has-text-centered">
                                <h3 class="is-size-4">{{item.name}}</h3>
                            </div>
                            <button @click.prevent="selectItem(itemIndex)"
                                    class="button is-fullwidth is-warning is-radiusless has-text-weight-bold">
                                <i class="fad fa-plus-circle mr-2"></i> Add
                            </button>
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <!-- Sub Items Viewer -->
        <div v-if="showSubItemsMenu" class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-content">
                <!-- Any other Bulma elements you want -->
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-uppercase is-centered has-text-info">
                            Complete your order
                        </p>
                    </header>
                    <div class="card-content">

                        <template v-if="selectedItemData">
                            <!--check if meal has sub items-->
                            <template v-if="selectedItemData.sub_items.length">
                                <h5 class="is-size-5 has-text-weight-bold has-text-grey">Side Meals</h5>
                                <hr class="mt-0">

                                <!--Loop through sub items-->
                                <div class="columns is-multiline is-mobile">
                                    <div class="column"></div>
                                    <div v-for="(item, itemIndex) in selectedItemData.sub_items"
                                         class="column is-narrow" :key="itemIndex">
                                        <div class="sub-item-image has-text-centered">
                                            <img :src="`/items/${item.image}`">
                                        </div>
                                        <div class="control">
                                            <label class="radio">
                                                <input @change="onSideMealSelect(item)" type="radio"
                                                       name="sub-item-side-meal">
                                                {{item.name}}
                                            </label>
                                        </div>
                                    </div>
                                    <div class="column"></div>
                                </div>
                            </template>


                            <!--Check if meal hasMeat-->
                            <template v-if="selectedItemData.hasMeat">
                                <h5 class="is-size-5 has-text-weight-bold has-text-grey">Meat</h5>
                                <hr class="mt-0">

                                <!--Loop through meats-->
                                <div class="columns is-multiline is-mobile">
                                    <div class="column"></div>
                                    <div v-for="(item, itemIndex) in meats"
                                         class="column is-narrow" :key="itemIndex">
                                        <div class="sub-item-image has-text-centered">
                                            <img :src="`/items/${item.image}`">
                                        </div>
                                        <div class="control">
                                            <label class="radio">
                                                <input @change="onMeatSelect(item)" type="radio"
                                                       name="sub-item-side-meat">
                                                {{item.name}}
                                            </label>
                                        </div>
                                    </div>
                                    <div class="column"></div>
                                </div>
                            </template>

                            <h5 class="is-size-5 has-text-weight-bold has-text-grey">Drinks</h5>
                            <hr class="mt-0">

                            <!--Loop through drinks-->
                            <div class="columns is-multiline is-mobile">
                                <div class="column"></div>
                                <div v-for="(item, itemIndex) in drinks"
                                     class="column is-narrow" :key="itemIndex">
                                    <div class="sub-item-image has-text-centered">
                                        <img :src="`/items/${item.image}`">
                                    </div>
                                    <div class="control">
                                        <label class="radio">
                                            <input @change="onDrinkSelect(item)" type="radio"
                                                   name="sub-item-side-drink">
                                            {{item.name}}
                                        </label>
                                    </div>
                                </div>
                                <div class="column"></div>
                            </div>

                            <!--                            <pre>{{subMenuFormData}}</pre>-->

                            <div class="is-clearfix mt-5">
                                <button @click.prevent="closeSideMenu" class="button is-dark is-pulled-left">Cancel
                                </button>
                                <button @click.prevent="addToCart"
                                        class="button is-warning is-pulled-right has-text-weight-bold">
                                    <i class="fad fa-check-circle mr-2" aria-hidden="true"></i> Add to Cart
                                </button>
                            </div>
                        </template>
                        <template v-else>
                            <div class="has-text-centered has-text-weight-bold">
                                <span class="has-text-danger">You have not selected any item yet!</span>
                            </div>
                        </template>

                    </div>
                </div>
            </div>
            <button @click="closeSideMenu" class="modal-close is-large" aria-label="close"></button>
        </div>

        <Debug v-model="showDebug" :content="items"/>
    </div>
</template>

<script>
    import Debug from "../components/Debug";
    import {items, meats, drinks} from "../../database/items";
    import {mapState} from "vuex";

    export default {
        name: 'Menu',
        components: {Debug},
        data() {
            return {
                items,
                meats,
                drinks,

                // Only to see the data am working with
                showDebug: false,
                // controls visibility of sub items menu
                showSubItemsMenu: false,
                // Holds selected item to be used by the sub items menu
                selectedItemData: null,
                // Holds the choices made by the user
                subMenuFormData: {
                    sideMeal: null,
                    meat: null,
                    drink: null
                }
            }
        },

        computed: {
            // Map cart state to this component
            ...mapState(['cart'])
        },

        methods: {
            showCartModal() {
                // toggles showCartModal in store.
                this.$store.commit('toggleCartModal');
            },

            selectItem(itemIndex) {
                // Set the data of selected item to be shown
                this.selectedItemData = this.items[itemIndex];
                // Show Sub items modal
                this.showSubItemsMenu = true;
            },

            closeSideMenu() {
                // Reset all subMenu data on close.
                this.subMenuFormData = {
                    sideMeal: null,
                    meat: null,
                    drink: null
                }
                // Reset selected item data
                this.selectedItemData = null;
                // Hide Sub items menu
                this.showSubItemsMenu = false;
            },

            onSideMealSelect(item) {
                this.subMenuFormData.sideMeal = item;
                this.$forceUpdate();
            },

            onMeatSelect(item) {
                this.subMenuFormData.meat = item;
                this.$forceUpdate();
            },

            onDrinkSelect(item) {
                this.subMenuFormData.drink = item;
                this.$forceUpdate();
            },

            /**
             * Once addToCart button is clicked
             * All we need todo is add the current subMenuFormData to cart array
             * And closeSideMenu which will also rest the subMenuFormData
             */
            addToCart() {
                // Add subMenuFormData to cart
                this.$store.commit('addDataToCart', {
                    ...this.subMenuFormData,
                    // Add current selected item to subMenuFormData before adding to cart
                    data: this.selectedItemData
                });
                // close side menu.
                this.closeSideMenu();
                // Show notification
                alert('Your order has been added to cart');
            },
        }
    }
</script>

<style lang="scss">
    .item-image {
        img {
            width: 100%;
        }
    }

    .sub-item-image {
        img {
            width: 100px;
            height: 100px;
            border-radius: 10px;
        }
    }
</style>