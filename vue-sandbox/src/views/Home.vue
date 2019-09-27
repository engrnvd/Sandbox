<template>
    <RequiresAuth>
        <div class="home">
            Welcome to Your Vue.js App
        </div>
    </RequiresAuth>
</template>

<script>
    import RequiresAuth from "./RequiresAuth";

    export default {
        name: "home",
        components: {
            RequiresAuth
        }
    };
</script>
