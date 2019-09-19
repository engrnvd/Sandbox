Vue.component('am-search', {
    props: ['value'],
    template: `
    <input
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
  `
});

Vue.component('am-checkbox', {
    template: `<span class="am-checkbox" @click="toggle()">
            <i class="fas fa-check-square" v-if="value"></i>
            <i class="far fa-square" v-else></i>
        </span>`,
    props: ['value'],
    methods: {
        toggle() {
            this.$emit('input', !this.value);
        }
    }
});

Vue.component('todo-item', {
    template: `<div :class="{completed: item.done}">
        <am-checkbox v-model="item.done" />
        <label><input class="todo-text-input" type="text" v-model="item.title"></label>  
        <a class="delete-btn" href @click.prevent="$emit('removed')">&times;</a>
    </div>`,
    props: ['item'],
    methods: {}
});

Vue.component('todo-list', {
    template: `
    <div class="todo-list">
        <p class="todo-search"><am-search v-model="searchText" /></p>
        <ul class="todo-items">
            <li class="todo" v-for="(item, index) in remainingItems" :key="item.id">
                <todo-item :item="item" @removed="remove(item)"></todo-item>
            </li>
            <li class="separator" v-if="remainingItems.length && completedItems.length"></li>
            <li v-if="completedItems.length">
                <a href class="completed-label" @click.prevent="showCompleted = !showCompleted">
                    <span v-if="showCompleted">&#9660;</span>
                    <span v-else>&#x25BA;</span>
                    {{ completedItems.length }} Completed items
                </a>
            </li>
            <template v-if="showCompleted">
                <li class="todo" v-for="(item, index) in completedItems" :key="item.id">
                    <todo-item :item="item" @removed="remove(item)"></todo-item>
                </li>
            </template>
        </ul>
    </div>`,
    props: ['items'],
    data() {
        return {
            showCompleted: true,
            searchText: ""
        }
    },
    computed: {
        remainingItems() {
            return this.filtered.filter(item => !item.done);
        },
        completedItems() {
            return this.filtered.filter(item => item.done);
        },
        filtered() {
            return this.items.filter(item => item.title.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1);
        }
    },
    methods: {
        remove(item) {
            this.items = _.reject(this.items, i => item.id === i.id);
        },
    }
});

let app = new Vue({
    el: "#app",
    data: {
        items: [
            {id: 1, title: 'Read Essentials', done: true},
            {id: 2, title: 'Read APIs', done: false},
            {id: 3, title: 'Read Style Guide', done: false},
            {id: 4, title: 'Another todo', done: false},
            {id: 5, title: 'Another todo 2', done: false},
            {id: 6, title: 'Another todo 3', done: false},
            {id: 7, title: 'Another todo 4', done: false},
            {id: 8, title: 'Another todo 5', done: false},
            {id: 9, title: 'Another todo 6', done: false},
            {id: 10, title: 'Another todo 7', done: false},
        ],
    },
});
