<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useTasksStore, type FilterType } from '../stores/tasks.store';
import { computed } from 'vue';

const tasksStore = useTasksStore()

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
        <h3 class="navbar__title">Menu</h3>

        <label class="navbar__search">
            <Icon icon="lucide:search" />
            <input type="text" class="navbar__search-input" placeholder="Search your tasks" @input="(e) => tasksStore.setSearchQuery((e.target as HTMLInputElement).value)">
        </label>

        <div class="navbar__tasks">
            <h4 class="navbar__tasks-title">Tasks</h4>

            <div class="navbar__buttons-list">
                <button class="navbar__button"
                    :class="{ 'navbar__button--active': filter.value === tasksStore.filterType }"
                    v-for="filter in filters" @click="() => tasksStore.setFilterType(filter.value as FilterType)">
                    <div class="navbar__button-content">
                        <Icon :icon="filter.icon" width="18" height="18" />
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
    width: 100%;
    height: 100%;

    &__title {
        color: var(--neutral-700);
        font-size: 1.25rem;
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
    }

    &__buttons-list {
        display: flex;
        flex-direction: column;
        gap: 4px;
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


        &:hover &-amount,
        &--active &-amount {
            background-color: var(--neutral-100);
        }
    }

}
</style>