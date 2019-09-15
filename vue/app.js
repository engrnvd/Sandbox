var app = new Vue({
    el: "#app",
    data: {
        form: {name: 'Naveed'},
    },
    computed: {
        reverse () {
            return this.form.name.split('').reverse().join('')
        }
    },
    watch: {
        'form.name': function (value) {
            console.log(`name changed to: ${value}`);
        }
    },
    mounted: function () {
        console.log(`mounted: `);
        setTimeout(() => {
            this.form.name = "Masood";
            console.log(this.form);
        }, 1500);
    }
});