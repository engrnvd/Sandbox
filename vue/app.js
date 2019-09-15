let app = new Vue({
    el: "#app",
    data: {
        list: [1, 2]
    },
    methods: {
        addItem() {
            // this.list.push(3); // reactive
            // this.list[2] = 3; // not reactive
            Vue.set(this.list, 2, 3); // reactive
        }
    }
});