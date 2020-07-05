<template>
    <div v-if="showCartModal" class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <div class="has-text-centered my-5">
                    <i class="fad fa-shopping-cart fa-3x" aria-hidden="true"></i>
                </div>

                <!--Cart Table-->
                <template v-if="cart.length">
                    <table class="table is-fullwidth is-bordered is-striped">
                        <thead>
                        <tr>
                            <th>Main</th>
                            <th>Side Meal</th>
                            <th>Meat</th>
                            <th>Drink</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <template v-for="(item, itemIndex) in cart">
                            <tr :key="itemIndex">
                                <td>{{item.data.name}}</td>
                                <td>{{item.sideMeal ? item.sideMeal.name : 'none'}}</td>
                                <td>{{item.meat ? item.meat.name : 'none'}}</td>
                                <td>{{item.drink ? item.drink.name : 'none'}}</td>
                                <th>
                                    <a @click.prevent="removeItem(itemIndex)">
                                        <i class="fa fa-times has-text-danger" aria-hidden="true"></i>
                                    </a>
                                </th>
                            </tr>
                        </template>
                        </tbody>
                    </table>

                    <div class="my-5">
                        <div class="columns">
                            <div class="column is-narrow">
                                <div class="field has-addons">
                                    <div class="control">
                                        <input v-model="couponCode" class="input" type="text" placeholder="Coupon Code">
                                    </div>
                                    <div class="control">
                                        <button @click.prevent="redeemCoupon" class="button">Apply</button>
                                    </div>
                                </div>
                                <p v-if="useCouponPrice" class="has-text-info is-size-7">
                                    95% off coupon ({{couponCode}}) applied.
                                    <a @click.prevent="removeCoupon" class="has-text-danger">remove</a>
                                </p>
                            </div>
                            <div class="column"></div>
                            <div class="column is-narrow">
                                <div class="h3 is-size-5">
                                    <strong class="has-text-grey">Total:</strong> N{{totalAmount.toLocaleString()}}
                                </div>
                                <div class="h3 is-size-6">
                                    <strong class="has-text-grey">Delivery fee:</strong> N150
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-5 is-clearfix">
                        <button @click="toggleCartModal" class="is-pulled-left button is-uppercase is-dark">Close
                        </button>
                        <button @click="checkOut"
                                class="is-pulled-right button is-uppercase is-warning has-text-weight-bold">Checkout
                        </button>
                    </div>
                </template>
                <template v-else>
                    <div class="has-text-centered has-text-danger">
                        <h5 class="is-size-5">You have no items in your cart!</h5>
                    </div>
                </template>
            </div>
        </div>
        <button @click.prevent="toggleCartModal" class="modal-close is-large" aria-label="close"></button>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {

        data() {
            return {
                couponCode: '950meals',
                useCouponPrice: true
            }
        },
        computed: {
            // Map cart && showCartModal state to this component
            ...mapState(['cart', 'showCartModal']),

            totalAmount() {
                const eachMeal = 950;
                let totalAmount = eachMeal * this.cart.length;

                // calculate price if useCouponPrice
                if (this.useCouponPrice) {
                    const percentageOff = (totalAmount / 100) * 95;
                    totalAmount -= percentageOff;
                }

                return totalAmount;
            }
        },

        methods: {
            toggleCartModal() {
                // trigger ToggleCartModal to show/close this cart modal
                this.$store.commit('toggleCartModal');
            },

            removeItem(itemIndex) {
                // trigger removeFromCart to remove this itemIndex
                this.$store.commit('removeFromCart', itemIndex);
            },

            checkOut() {
                // on checkout save couponCode and total price.
                this.$store.commit('updateCartData', {
                    coupon: this.useCouponPrice ? this.couponCode : false,
                    totalAmount: this.totalAmount
                });

                alert('Now all you need to do is send this cart data to server and process the order.');
            },

            redeemCoupon() {
                // validate coupon
                if (this.couponCode !== '950meals') {
                    alert("Incorrect coupon.")
                }

                this.useCouponPrice = true;
            },

            removeCoupon() {
                this.couponCode = null;
                this.useCouponPrice = false;
            }
        }
    }
</script>

<style scoped>

</style>