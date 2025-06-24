<script setup lang="ts">
import NavbarComponent from '@/modules/tasks/components/navbar.component.vue';
import TasksListComponent from '@/modules/tasks/components/tasks-list.component.vue';
import TasksFormComponent from '../components/tasks-form.component.vue';
import { AnimatePresence } from 'motion-v';
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
            <AnimatePresence>
                <TasksFormComponent />
            </AnimatePresence>
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

    @media screen and (max-width: $breakpoint-laptop) {
        grid-template-columns: .65fr 1.2fr;
    }

    @media screen and (max-width: $breakpoint-tablet) {
        grid-template-areas: "navbar" "content";
        grid-template-columns: 1fr;
        max-height: fit-content;
        height: fit-content;
    }

    &__navbar,
    &__content,
    &__form {
        max-height: 100%;
        overflow-y: auto;

        padding-right: 4px;

        scrollbar-width: thin;
        scrollbar-gutter: stable;
        scrollbar-color: var(--neutral-300) transparent;

        @media screen and (max-width: $breakpoint-tablet) {
            scrollbar-gutter: unset;
            overflow-y: hidden;
        }
    }

    &__navbar {
        grid-area: navbar;
    }

    &__content {
        grid-area: content;
    }

    &__form {
        grid-area: form;

        @media screen and (max-width: $breakpoint-laptop) {
            padding: 0;
            position: fixed;
        }
    }

}
</style>