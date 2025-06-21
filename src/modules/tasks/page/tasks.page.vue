<script setup lang="ts">
import NavbarComponent from '@/modules/tasks/components/navbar.component.vue';
import TasksListComponent from '@/modules/tasks/components/tasks-list.component.vue';
import TasksFormComponent from '../components/tasks-form.component.vue';
</script>

<template>
    <div class="tasks">

        <div class="tasks__navbar">
            <NavbarComponent />
        </div>

        <main class="tasks__content">
            <TasksListComponent />
        </main>

        <section class="tasks__form">
            <TasksFormComponent />
        </section>
    </div>
</template>

<style lang="scss" scoped>
.tasks {
    display: grid;
    grid-template-columns: .65fr 1.2fr .9fr;
    grid-template-areas: "navbar content form";
    padding: 1.25rem;
    height: 100dvh;
    max-height: 100dvh;
    gap: 20px;
    max-width: 100%;

    &__navbar, &__content, &__form{
        // max-height: 100%;
        overflow: hidden;
    }

    &__navbar {
        grid-area: navbar;
    }

    &__content {
        grid-area: content;
    }

    &__form {
        grid-area: form;
    }

}
</style>