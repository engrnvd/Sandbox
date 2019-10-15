<template>
    <v-content>
        <slot></slot>
    </v-content>
</template>

<script>
    export default {
        name: "requires-auth",
        watch: {
            '$store.state.auth.isLoggedIn': function (value) {
                if (!value) {
                    this.$router.replace('/');
                }
            }
        }
    };
</script>
