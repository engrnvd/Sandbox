<template>
    <div class="authenticated">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "requires-auth",
        mounted() {
            if (!this.$store.getters['auth/isLoggedIn']) {
                this.$router.push('login');
            }
        }
    };
</script>
