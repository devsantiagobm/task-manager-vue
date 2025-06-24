<script setup lang="ts">

import ButtonAtom from '@/system-design/atoms/button.atom.vue';
import { dateToText } from '@/utils/date-to-text.util';
import { Icon } from '@iconify/vue';
import { computed, onMounted } from 'vue';
import { useTasksStore } from '../stores/tasks.store';
import { toast } from 'vue-sonner';
import { AnimatePresence, LayoutGroup, motion } from "motion-v"
import TasksEmptystateComponent from './tasks-emptystate-.component.vue';

const tasksStore = useTasksStore()

onMounted(() => {

    toast.promise(tasksStore.getTasks(), {
        loading: "Loading tasks…",
        // success: () => ,
        error: () => "Something went wrong while loading tasks.",
    });


})

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

function toggleCompletedTask({ id, isComplete }: { id: number, isComplete: boolean }) {
    const action = isComplete ? 'Marking as complete' : 'Marking as pending';
    const successMessage = isComplete ? 'Task marked as complete.' : 'Task marked as pending.';

    toast.promise(tasksStore.updateTask({ id, isComplete }), {
        loading: `${action}...`,
        success: () => successMessage,
        error: () => `Something went wrong while ${action.toLowerCase()}.`,
    });
}

function handleActivateCreateMode() {
    tasksStore.clearSelectedTask();
    tasksStore.setIsCreatingTask(true);
}

</script>

<template>
    <motion.header class="task-list__header" :initial="{ opacity: 0, y: -10 }" :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }" :key="title">
        <h1 class="task-list__title">{{ title }}</h1>
        <span class="task-list__amount">{{ amountOfTasks }}</span>

    </motion.header>


    <section class="task-list__content">
        <ButtonAtom variant="outline" class="task-list__create-button" @click="handleActivateCreateMode">
            <Icon icon="mi:add" width="20" height="20" />
            <span>Add New Task</span>
        </ButtonAtom>



        <AnimatePresence>
            <motion.div v-if="tasksStore.tasks.length === 0 && !tasksStore.status.getTasks.isLoading"
                :initial="{ opacity: 0, y: -10 }" :animate="{ opacity: 1, y: 0 }" :exit="{ opacity: 0, y: -10 }"
                :transition="{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }">
                <TasksEmptystateComponent />
            </motion.div>
        </AnimatePresence>


        <LayoutGroup>


            <motion.div class="task-list__list" layout>

                <AnimatePresence>

                    <motion.div v-for="task in tasksStore.filteredTasks" :key="task.id"
                        :initial="{ opacity: 0, scale: 0.95, y: 10 }" :animate="{ opacity: 1, scale: 1, y: 0 }"
                        :exit="{ opacity: 0, scale: 0.9, y: -10 }"
                        :transition="{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }" layout>

                        <button class="task-list__task" @click="tasksStore.selectTask(task.id)"
                            :class="{ 'task-list__task--active': task.id === tasksStore?.selectedTask?.id }">
                            <div class=" task-list__task-content">

                                <button class="task-list__checkbox-button"
                                    :class="{ 'task-list__checkbox-button--active': task.isComplete }" type="button"
                                    :disabled='tasksStore.status.updateTask.isLoading'
                                    @click.stop="() => toggleCompletedTask({ id: task.id, isComplete: !task.isComplete })" />

                                <div class="task-list__task-texts">
                                    <span class="task-list__task-title">
                                        <span class="task-list__task-title-text">{{ task.title }}</span>

                                        <span class="task-list__task-separator"></span>

                                        <span class="task-list__task-date">
                                            <Icon icon="material-symbols:calendar-today-outline" width="12"
                                                height="12" />
                                            {{ dateToText(task.createdAt) }}
                                        </span>
                                    </span>
                                    <p class="task-list__task-description">{{ task.description }}</p>
                                </div>
                            </div>

                            <Icon icon="mi:chevron-right" width="20" height="20" class="task-list__task-arrow" />

                        </button>

                    </motion.div>




                </AnimatePresence>
            </motion.div>

        </LayoutGroup>
    </section>
</template>


<style lang="scss" scoped>
.task-list {

    &__header {
        display: flex;
        gap: 16px;
        align-items: center;
        margin: 0 0 24px;

        @media screen and (max-width: $breakpoint-tablet) {
            display: none;
        }

    }

    &__create-button {
        color: var(--neutral-600);
        font-weight: var(--font-weight-medium);
        padding: 12px 16px;
    }

    &__amount {
        padding: 4px 12px;
        border-radius: 4px;
        border: solid 1px var(--neutral-200);
        font-weight: var(--font-weight-medium);
        user-select: none;
    }

    &__list {
        margin: 12px 0 0;
        display: flex;
        flex-direction: column;
    }

    &__task {
        padding: 12px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        border-bottom: 1px solid var(--neutral-300);
        transition: background-color 0.2s ease;

        &--active {
            background-color: var(--neutral-100);
        }


        @media (hover: hover) {
            &:hover {
                background-color: var(--neutral-100);
            }

            &:has(.checkbox-button:hover) {
                background-color: transparent;
            }
        }

        &-content {
            display: flex;
            gap: 12px;
            max-width: 100%;
            align-items: flex-start;
        }

        &-texts {
            display: flex;
            flex-direction: column;
            max-width: 100%;
            overflow: hidden;
            gap: 2px;
        }


        &-title {
            font-size: 0.9rem;
            font-weight: 500;
            color: var(--neutral-900);
            display: flex;
            align-items: center;
            gap: 8px;
            max-width: 100%;

            &-text {
                max-width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: left;
            }
        }

        &-description {
            font-size: 0.85rem;
            color: var(--neutral-500);
            max-width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: left;
        }

        &-date {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 0.75rem;
            color: var(--neutral-400);
            text-wrap: nowrap;
        }

        &-separator {
            width: 3px;
            height: 3px;
            border-radius: 50%;
            background-color: var(--neutral-400);
        }

        &-arrow {
            transition: transform .2s ease;
        }

        @media (hover:hover) {
            &:hover:not(&--active) &-arrow {
                transform: translateX(2px);
            }
        }
    }




    &__checkbox-button {
        $primary-color: var(--yellow-500);
        $primary-hover-color: var(--yellow-200);
        $secondary-color: #fff;

        $checkbox-size: 18px;
        $border-radius: 4px;
        $border-color: #d9d9d9;
        $checkmark-size: 1.4;

        width: $checkbox-size;
        height: $checkbox-size;
        border-radius: $border-radius;
        background-color: $secondary-color;
        border: 1px solid $border-color;
        cursor: pointer;
        position: relative;
        transition: all 0.3s ease;
        padding: 0;

        &::before {
            content: "";
            position: absolute;
            top: 40%;
            left: 50%;
            width: 4px;
            height: 7px;
            border-right: 2px solid $secondary-color;
            border-bottom: 2px solid $secondary-color;
            transform: translate(-50%, -50%) rotate(45deg) scale(0);
            opacity: 0;
            transition: all 0.2s ease;
        }

        &::after {
            content: "";
            position: absolute;
            inset: 0;
            box-shadow: 0 0 0 calc($checkbox-size / 2.5) $primary-color;
            border-radius: inherit;
            opacity: 0;
            transition: all 0.5s cubic-bezier(0.12, 0.4, 0.29, 1.46);
        }


        @media (hover:hover) {
            &:hover {
                border-color: $primary-hover-color;
            }
        }

        &--active {
            background-color: $primary-color;
            border-color: transparent;

            &::before {
                opacity: 1;
                transform: translate(-50%, -50%) rotate(45deg) scale($checkmark-size);
            }
        }

        &:active:not(.checkbox-button--active)::after {
            transition: none;
            box-shadow: none;
            opacity: 1;
        }
    }

}
</style>