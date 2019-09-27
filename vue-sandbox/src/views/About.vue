<template>
    <RequiresAuth>
        <div class="about">
            <h1>This is an about page</h1>
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
