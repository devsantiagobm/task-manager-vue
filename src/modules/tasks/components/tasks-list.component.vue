<script setup lang="ts">
import ButtonAtom from '@/system-design/atoms/button.atom.vue';
import CheckboxAtom from '@/system-design/atoms/checkbox.atom.vue';
import { dateToText } from '@/utils/date-to-text.util';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';


const notes = ref<Note[]>([
    {
        id: 1,
        title: 'Comprar víveres',
        description: 'Leche, pan, huevos y frutas',
        isPending: false,
        createdAt: '2025-06-18T09:15:00Z',
        lastUpdated: '2025-06-18T09:15:00Z'
    },
    {
        id: 2,
        title: 'Revisar emails del trabajo',
        description: 'Responder correos importantes y organizar la bandeja asdmjkdajsakdljadlksjdlkajdskldjakdjadlkjdljsdal',
        isPending: false,
        createdAt: '2025-06-17T14:30:00Z',
        lastUpdated: '2025-06-18T08:45:00Z'
    },
    {
        id: 3,
        title: 'Estudiar Vue 3',
        description: 'Leer sobre script setup, composición y Pinia',
        isPending: false,
        createdAt: '2025-06-16T19:00:00Z',
        lastUpdated: '2025-06-16T19:00:00Z'
    },
    {
        id: 4,
        title: 'Llamar al médico',
        description: 'Agendar cita para revisión anual',
        isPending: false,
        createdAt: '2025-06-15T11:10:00Z',
        lastUpdated: '2025-06-17T07:30:00Z'
    },
    {
        id: 5,
        title: 'Actualizar portafolio',
        description: 'Agregar últimos proyectos y mejoras en UI',
        isPending: false,
        createdAt: '2025-06-14T13:45:00Z',
        lastUpdated: '2025-06-14T13:45:00Z'
    }
])

</script>

<template>
    <header class="task-list__header">
        <h1 class="task-list__title">All Tasks</h1>
        <span class="task-list__amount">5</span>
    </header>

    <section class="task-list__content">
        <ButtonAtom variant="outline" class="task-list__create-button">
            <Icon icon="mi:add" width="20" height="20" />
            <span>Add New Task</span>
        </ButtonAtom>


        <!-- //TODO CUANDO NO HAYAN NOTAS PONER UN ICONO DICIENDO CREATA TU NOTA -->

        <div class="task-list__list">
            <button class="task-list__task" v-for="note in notes" :key="note.id">
                <div class="task-list__task-content">
                    <CheckboxAtom v-model="note.isPending" />
                    <div class="task-list__task-texts">
                        <span class="task-list__task-title">
                            <span>{{ note.title }}</span>

                            <span class="task-list__task-separator"></span>

                            <span class="task-list__task-date">
                                <Icon icon="material-symbols:calendar-today-outline" width="12" height="12" />
                                {{ dateToText(note.createdAt) }}
                            </span>
                        </span>
                        <span class="task-list__task-description">{{ note.description }}</span>
                    </div>
                </div>

                <Icon icon="mi:chevron-right" width="20" height="20" class="task-list__task-arrow" />
            </button>

        </div>


    </section>
</template>


<style lang="scss" scoped>
.task-list {

    &__header {
        display: flex;
        gap: 16px;
        align-items: center;
        margin: 0 0 24px;

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
            align-items: flex-start;
        }

        &-texts {
            display: flex;
            flex-direction: column;
            max-width: 100%;
            gap: 2px;
        }

        &-title {
            font-size: 0.9rem;
            font-weight: 500;
            color: var(--neutral-900);
            display: flex;
            align-items: center;
            gap: 8px;
        }

        //TODO ARREGLAR PARA QUE EL MAX-WIDTH SEA VARIABLE
        &-description {
            font-size: 0.85rem;
            color: var(--neutral-500);
            max-width: 50ch;
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
            &:hover &-arrow {
                transform: translateX(2px);
            }
        }
    }
}
</style>