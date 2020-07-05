import Vue from 'vue';
import Vuex from 'vuex';
import BrowserStorage from "@trapcode/browser-storage";

// Add Vuex
Vue.use(Vuex)
// Use Session Storage
const appSessionStorage = BrowserStorage.getSessionStore('app');


export default new Vuex.Store({
    state: {
        /**
         * Get cart data from sessionStorage
         * If none is found returns default=[]
         */
        cart: appSessionStorage.getArray('cart', []),

        // Cart data to be used in checkout page
        cartData: appSessionStorage.getObject('cartData', {
            coupon: false,
            totalAmount: 0
        }),

        // controls cart modal visibility
        showCartModal: true
    },
    mutations: {
        toggleCartModal(state) {
            // Toggle showCartModal value
            state.showCartModal = !state.showCartModal;
        },

        addDataToCart(state, data) {
            // Push to cart
            state.cart.push(data);
            // Update browser session storage
            appSessionStorage.setArray('cart', state.cart);
        },

        removeFromCart(state, itemIndex) {
            // Remove index from cart
            state.cart.splice(itemIndex, 1)
            // Update browser session storage
            appSessionStorage.setArray('cart', state.cart);
        },

        updateCartData(state, data) {
            state.cartData = data;
            // Update browser session storage
            appSessionStorage.setObject('cartData', data);
        }
    },
    actions: {},
    modules: {}
})
