<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    modelValue: boolean
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()

const isActive = computed(() => props.modelValue)

function toggle() {
    emit('update:modelValue', !props.modelValue)
}
</script>

<template>
    <button class="checkbox-button" :class="{ 'checkbox-button--active': isActive }" type="button" @click="toggle" />
</template>

<style lang="scss" scoped>
$primary-color: var(--yellow-500);
$primary-hover-color: var(--yellow-200);
$secondary-color: #fff;

$checkbox-size: 18px;
$border-radius: 4px;
$border-color: #d9d9d9;
$checkmark-size: 1.4;

.checkbox-button {
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
</style>
