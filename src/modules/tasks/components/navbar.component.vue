<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useTasksStore, type FilterType } from '../stores/tasks.store';
import { computed } from 'vue';
import { motion } from 'motion-v';

const tasksStore = useTasksStore()

const title = computed(() => {
    const titles = {
        all: "All Tasks",
        completed: "Completed Tasks",
        pending: "Pending Tasks"
    }

    return titles[tasksStore.filterType]
})

const amountOfTasks = computed(() => {
    const filter = tasksStore.filterType

    if (filter === 'all') return tasksStore.taskStats.total
    if (filter === 'completed') return tasksStore.taskStats.completed
    if (filter === 'pending') return tasksStore.taskStats.pending

    return 0
})

const filters = computed(() => [
    {
        label: "All Tasks",
        icon: "flowbite:clipboard-list-outline",
        value: "all",
        stat: tasksStore.taskStats.total,
    },
    {
        label: "Completed",
        icon: "mdi:check-circle-outline",
        value: "completed",
        stat: tasksStore.taskStats.completed,
    },
    {
        label: "Pending",
        icon: "mdi:clock-outline",
        value: "pending",
        stat: tasksStore.taskStats.pending,
    },
])



</script>

<template>
    <nav class="navbar">
        <motion.header class="navbar__header" :initial="{ opacity: 0, y: -10 }" :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }" :key="title">
            <h1 class="navbar__title">{{ title }}</h1>
            <span class="navbar__amount">{{ amountOfTasks }}</span>

        </motion.header>

        <h3 class="navbar__title navbar__title--small">Menu</h3>

        <label class="navbar__search">
            <Icon icon="lucide:search" />
            <input type="text" class="navbar__search-input" placeholder="Search your tasks"
                @input="(e) => tasksStore.setSearchQuery((e.target as HTMLInputElement).value)">
        </label>

        <div class="navbar__tasks">
            <h4 class="navbar__tasks-title">Tasks</h4>

            <div class="navbar__buttons-list">
                <button class="navbar__button"
                    :class="{ 'navbar__button--active': filter.value === tasksStore.filterType }"
                    v-for="filter in filters" @click="() => tasksStore.setFilterType(filter.value as FilterType)">

                    <div class="navbar__button-content">
                        <Icon class="navbar__button-icon" :icon="filter.icon" width="18" height="18" />
                        <span>{{ filter.label }}</span>
                    </div>

                    <span class="navbar__button-amount">{{ filter.stat }}</span>
                </button>
            </div>


        </div>
    </nav>
</template>

<style lang="scss" scoped>
.navbar {
    display: block;
    padding: 1rem;
    border-radius: 1rem;
    background-color: var(--neutral-100);
    max-width: 100%;
    width: 100%;
    height: 100%;

    @media screen and (max-width: $breakpoint-tablet) {
        padding: 0;
        background-color: transparent;
    }


    &__header {
        display: none;
        gap: 16px;
        align-items: center;
        margin: 0 0 24px;

        @media screen and (max-width: $breakpoint-tablet) {
            display: flex;
        }
    }

    &__amount {
        padding: 4px 12px;
        border-radius: 4px;
        border: solid 1px var(--neutral-200);
        font-weight: var(--font-weight-medium);
        user-select: none;
    }

    &__title {
        color: var(--neutral-700);
        font-size: 1.25rem;


        @media screen and (max-width: $breakpoint-tablet) {
            font-size: 1.75rem;
            white-space: nowrap;
            color: var(--neutral-900);

            &--small {
                display: none;
            }
        }
    }

    &__search {
        margin: 16px 0 24px;
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 8px;
        cursor: text;
        border: solid 1px var(--neutral-300);
        border-radius: 8px;
        color: var(--neutral-500);
        font-size: .9rem;
        font-weight: var(--font-weight-medium);
        transition: border-color .2s ease, color .2s ease;

        &-input {
            &::placeholder {
                font-weight: var(--font-weight-regular);
                font-size: .8rem;
            }
        }

        &:focus-within {
            color: var(--neutral-700);
            border-color: var(--neutral-400);
        }
    }

    &__tasks-title {
        text-transform: capitalize;
        font-size: .8rem;
        color: var(--neutral-700);
        margin: 0 0 8px;
        
        @media screen and (max-width: $breakpoint-tablet) {
            display: none;
        }

    }

    &__buttons-list {
        display: flex;
        flex-direction: column;
        gap: 4px;

        @media screen and (max-width: $breakpoint-tablet) {
            gap: 8px;
            flex-direction: row;
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;

            &::-webkit-scrollbar {
                display: none;
            }
        }
    }

    &__button {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 12px;
        width: 100%;
        border-radius: 6px;
        cursor: pointer;
        color: var(--neutral-600);
        font-size: .85rem;
        transition: background-color .2s ease, color .2s ease;


        @media screen and (max-width: $breakpoint-tablet) {
            justify-content: center;
            gap: 8px;
            padding: 6px 12px;
            text-wrap: nowrap;
            border-radius: 120px;
            font-size: .75rem;

            border: solid 1px var(--neutral-300);

        }


        &:hover,
        &--active {
            background-color: var(--neutral-200);
            color: var(--neutral-800)
        }

        &-content {
            display: flex;
            align-items: center;
            gap: 10px;

        }

        &-amount {
            padding: 3px 8px;
            border-radius: 4px;
            background-color: var(--neutral-200);
            font-size: .65rem;
            font-weight: var(--font-weight-medium);
            transition: background-color .2s ease,
                color .2s ease;
        }

        &-icon {

            @media screen and (max-width: $breakpoint-tablet) {
                display: none;
            }
        }


        &:hover &-amount,
        &--active &-amount {
            background-color: var(--neutral-100);
        }
    }

}
</style>