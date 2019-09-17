Vue.component('todo-item', {
    template: `<div :class="{completed: item.done}">
        <input class='checkbox' type="checkbox" v-model="item.done">
        <label><input class="todo-text-input" type="text" v-model="item.title"></label>  
        <a class="delete-btn" href @click.prevent="$emit('removed')">&times;</a>
    </div>`,
    props: ['item'],
    methods: {}
});

let app = new Vue({
    el: "#app",
    data: {
        todos: [
            {id: 1, title: 'Read Essentials', done: 1},
            {id: 2, title: 'Read APIs', done: 0},
            {id: 3, title: 'Read Style Guide', done: 0},
            {id: 4, title: 'Another todo', done: 0},
            {id: 5, title: 'Another todo 2', done: 0},
            {id: 6, title: 'Another todo 3', done: 0},
            {id: 7, title: 'Another todo 4', done: 0},
            {id: 8, title: 'Another todo 5', done: 0},
            {id: 9, title: 'Another todo 6', done: 0},
            {id: 10, title: 'Another todo 7', done: 0},
        ],
        showCompleted: true
    },
    computed: {
        remainingItems() {
            return this.todos.filter(item => !item.done);
        },
        completedItems() {
            return this.todos.filter(item => item.done);
        },
    },
    methods: {
        remove(item) {
            this.todos = _.reject(this.todos, i => item.id === i.id);
        },
    }
});
