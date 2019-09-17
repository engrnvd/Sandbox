Vue.component('todo-item', {
    template: `<div :class="{completed: item.done}">
        <span>{{item.title}}</span> 
        <input type="checkbox" v-model="item.done"> 
        <a href @click.prevent="remove()">x</a>
    </div>`,
    props: ['item'],
    methods: {
        remove: function () {
            this.$emit('removed');
        }
    }
});

let app = new Vue({
    el: "#app",
    data: {
        todos: [
            {id: 1, title: 'Read Essentials', done: 1},
            {id: 2, title: 'Read APIs', done: 0},
            {id: 3, title: 'Read Style Guide', done: 0},
        ]
    },
    computed: {
        remainingItems: function () {
            return this.todos.filter(item => !item.done);
        },
        completedItems: function () {
            return this.todos.filter(item => item.done);
        },
    }
});
