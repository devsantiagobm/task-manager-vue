<script setup lang="ts">
import ButtonAtom from '@/system-design/atoms/button.atom.vue';
import { Icon } from '@iconify/vue';
import { ErrorMessage, useForm } from 'vee-validate';
import { useTasksStore } from '../stores/tasks.store';
import { toast } from 'vue-sonner';
import { dateToText } from '@/utils/date-to-text.util';

interface Inputs {
    title: string;
    description: string;
}


const tasksStore = useTasksStore()

const { setValues, handleSubmit, errors, defineField, resetForm, } = useForm<Inputs>({
    validationSchema: {
        title: (value: string | any) => {
            if (!value) return "Title is required";
            if (value.trim() !== value) return " No leading or trailing spaces";
            if (value.length > 50) return " Maximum 50 characters";
            return true;
        },
        description: (value: string | any) => {
            if (!value || typeof value !== "string") return "Description is required";
            if (value.trim() !== value) return " No leading or trailing spaces";
            if (value.length > 1000) return " Maximum 1000 characters";
            return true;
        }
    },
});


const [title, titleAttrs] = defineField('title');
const [description, descriptionAttrs] = defineField('description');

const onSubmit = handleSubmit(async (values) => {
    const isUpdatingTask = Boolean(tasksStore.selectedTask);

    if (isUpdatingTask) {
        toast.promise(tasksStore.updateTask({ ...values, id: tasksStore?.selectedTask?.id }), {
            loading: "Updating your task...",
            success: () => {
                resetForm();
                tasksStore.clearSelectedTask();
                return "Task updated successfully!";
            },
            error: () => "Something went wrong while updating the task.",
        });
    } else {
        toast.promise(tasksStore.createTask(values), {
            loading: "Creating your task...",
            success: () => {
                resetForm();
                return "Task created successfully!";
            },
            error: () => "Something went wrong while creating the task.",
        });
    }
});

function deleteTask() {
    if (!tasksStore.selectedTask) return;

    toast.promise(tasksStore.deleteTask(tasksStore.selectedTask.id), {
        loading: "Deleting task...",
        success: () => {
            resetForm();
            return "Task deleted successfully.";
        },
        error: () => "Failed to delete the task. Please try again.",
    });
}


import { watch } from 'vue';

watch(
    () => tasksStore.selectedTask,
    (task) => {
        if (task) {
            setValues({
                title: task.title,
                description: task.description,
            });
        } else {
            resetForm({ errors: {} });
        }
    },
    { immediate: true }
);
</script>

<template>
    <form class="task-form" novalidate @submit="onSubmit">

        <div class="task-form__content">
            <!-- TODO ACA CAMBIAR EL TEXTO BASADO EN SI ES CREACON O UPDATE -->
            <div class="task-form__header">
                <h3 class="task-form__title">{{ tasksStore.selectedTask ? "Update Task" : "New Task" }}</h3>

                <button class="task-form__close" type="button">
                    <Icon icon="si:close-fill" width="24" height="24" />
                </button>

            </div>

            <label>
                <input v-model="title" v-bind="titleAttrs" name="title" type="text" class="task-form__input"
                    placeholder="What do you need to do?" :class="{ 'task-form__input--error': errors?.title }" />

                <!-- //TODO ANIMACION -->
                <span v-if="errors.title" class="task-form__input-error-message">
                    <Icon icon="ri:error-warning-line" width="14" height="14" />
                    <ErrorMessage name="title" />
                </span>
            </label>


            <dl class="task-form__metadata">
                <div class="task-form__row">
                    <dt class="task-form__row-label">
                        <Icon icon="lucide:calendar-plus" width="16" height="16" />
                        <span>Created on</span>
                    </dt>
                    <dd class="task-form__row-value">{{ dateToText(tasksStore?.selectedTask?.createdAt ?? new Date()) }}
                    </dd>
                </div>

                <div class="task-form__row">
                    <dt class="task-form__row-label">
                        <Icon icon="lucide:calendar-check-2" width="16" height="16" />
                        <span>Last updated</span>
                    </dt>
                    <dd class="task-form__row-value">{{ dateToText(tasksStore?.selectedTask?.lastUpdated ?? new Date())
                    }}</dd>
                </div>

                <div class="task-form__row">
                    <dt class="task-form__row-label">
                        <Icon icon="lucide:check-circle" width="16" height="16" />
                        <span>Status</span>
                    </dt>
                    <div class="task-form__row-value task-form__status"
                        :class="{ 'task-form__status--complete': tasksStore.selectedTask?.isComplete, 'task-form__status--pending': !tasksStore.selectedTask?.isComplete }">
                        <Icon
                            :icon="tasksStore.selectedTask?.isComplete ? 'mdi:check-circle-outline' : 'mdi:clock-outline'"
                            width="14" height="14" />
                        {{ tasksStore.selectedTask?.isComplete ? "Complete" : "Pending" }}
                    </div>
                </div>
            </dl>


            <label>
                <textarea name="description" as="textarea" class="task-form__input task-form__input--textarea"
                    placeholder="Write a brief description" v-model="description" v-bind="descriptionAttrs"
                    :class="{ 'task-form__input--error': errors?.description }" />

                <span v-if="errors.description" class="task-form__input-error-message">
                    <Icon icon="ri:error-warning-line" width="14" height="14" />
                    <ErrorMessage name="description" />
                </span>
            </label>
        </div>

        <!-- //TODO ESTOS BOTONES DARLES DISABLED BASADO EN SI SE ESTA LLAMANDO SU RESPECTIVO ENDPOINT-->

        <div class="task-form__buttons">
            <!-- //TODO MODAL DE CONFIRMACION DE ELIMINAR -->
            <ButtonAtom @click="deleteTask" variant="outline" alignment="center" type="button"
                v-if="tasksStore.selectedTask">Delete Task</ButtonAtom>
            <ButtonAtom alignment="center">{{ tasksStore.selectedTask ? 'Save Changes' : 'Create Task' }}</ButtonAtom>
        </div>
    </form>
</template>

<style scoped lang="scss">
.task-form {
    display: flex;
    flex-direction: column;
    padding: 1rem 1.25rem;
    border-radius: 1rem;
    background-color: var(--neutral-100);
    width: 100%;
    height: 100%;
    gap: 16px;
    max-height: 100%;

    &__content {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 100%;
        overflow: hidden;
        scrollbar-width: thin;
        min-height: 0;

        flex: 1 1 auto;
        overflow-y: auto;

        scrollbar-width: thin;
        scrollbar-gutter: stable;
        scrollbar-color: var(--neutral-300) transparent;
    }


    &__metadata {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin: 12px 0;
    }

    &__row {
        display: grid;
        align-items: center;
        font-size: .8rem;
        grid-template-columns: .6fr 1fr;

        &-label {
            display: flex;
            align-items: center;
            gap: 4px;
            color: var(--neutral-600);
        }

        &-value {
            color: var(--neutral-700);
        }
    }

    &__status {
        padding: 4px 8px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        gap: 2px;
        max-width: fit-content;
        user-select: none;

        &--complete {
            background-color: var(--green-500);
            color: var(--green-100);
        }

        &--pending {
            background-color: var(--orange-500);
            color: var(--orange-100);
        }
    }

    &__close {
        aspect-ratio: 1;
        padding: 4px;
        border-radius: 4px;
        cursor: pointer;
        display: grid;
        place-items: center;
        color: var(--neutral-700);
        transition: background-color .2s ease;

        @media (hover:hover) {
            &:hover {
                background-color: var(--neutral-200);

            }
        }
    }

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 0 16px;
    }

    &__title {
        color: var(--neutral-700);
        font-size: 1.25rem;
    }

    &__input {
        padding: 8px 12px;
        border: solid 1px var(--neutral-300);
        border-radius: 4px;
        width: 100%;
        font-size: .9rem;
        transition: border-color .2s ease;

        scrollbar-width: thin;
        scrollbar-gutter: stable;
        scrollbar-color: var(--neutral-300) transparent;

        &:focus:not(&--error) {
            border-color: var(--neutral-500);
        }

        &--error {
            border-color: var(--red-500);
        }

        &::placeholder {
            font-size: .85rem;
        }

        &--textarea {
            resize: none;
            min-height: 30dvh;
            field-sizing: content;
        }

        &-error-message {
            display: flex;
            gap: 4px;
            align-items: center;
            color: var(--red-500);
            font-size: .8rem;
            padding: 8px 0 0;

        }
    }

    &__buttons {
        display: flex;
        gap: 8px;
        align-items: center;
        height: fit-content;
        max-height: fit-content;
    }
}
</style>