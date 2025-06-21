<script setup lang="ts">

interface Props {
    variant?: 'action' | 'neutral' | 'outline' | 'alert'
    alignment?: 'left' | 'center' | 'right'
    fitContent?: boolean
}

const { fitContent = false, alignment = "left", variant = "action" } = defineProps<Props>()
</script>

<template>
    <button class="button" :class="[
        `button--${variant}`,
        `button--${alignment}`,
        fitContent && 'button--fit-content'
    ]">
        <slot />
    </button>
</template>

<style lang="scss" scoped>
.button {
    display: flex;
    gap: 6px;
    align-items: center;
    width: 100%;
    border-radius: 8px;
    padding: 10px 16px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color .2s ease, color .2s ease, outline .2s ease;

    &--fit-content {
        width: fit-content;
    }

    &--left {
        justify-content: flex-start;
    }

    &--center {
        justify-content: center;
    }

    &--right {
        justify-content: flex-end;
    }

    &--action {
        background-color: var(--yellow-500);
        color: var(--yellow-100);
        transition: background-color 0.15s ease;


        @media (hover:hover) {
            &:hover {
                background-color: var(--yellow-400);
            }
        }
    }

    &--alert {
        background-color: var(--red-500);
        color: var(--neutral-0);
        transition: background-color 0.2s ease;


        @media (hover:hover) {
            &:hover {
                background-color: var(--red-400);
            }
        }
    }

    &--neutral {
        background-color: var(--neutral-100);

        @media (hover: hover) {
            &:hover {
                background-color: var(--neutral-200);
            }
        }
    }

    &--outline {
        border: solid 1px var(--neutral-200);
        padding: 12px 16px;
        gap: 8px;

        @media (hover: hover) {
            &:hover {
                background-color: var(--neutral-200);
            }
        }
    }
}
</style>
