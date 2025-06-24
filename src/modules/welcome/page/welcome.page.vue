<script setup lang="ts">
import ButtonAtom from '@/system-design/atoms/button.atom.vue';
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router';
const router = useRouter()

function handleStart() {
    router.push("/")
    localStorage.setItem("firstTime", "1")
}

</script>

<template>
    <section class="welcome">
        <div class="welcome__image">
            <div class="welcome__picture"> </div>
        </div>

        <div class="welcome__content">
            <div class="welcome__text">
                <h1 class="welcome__title">Task Manager</h1>
                <p class="welcome__subtitle">
                    <strong>Task Manager</strong> is a simple yet refined task management app built as a technical demo.
                    It offers a clean user interface, smooth animations, and just the essentials:
                    create, update, and delete your tasks; filter them by type; and search instantly
                </p>

                <ul class="welcome__features">
                    <li>
                        <Icon icon="material-symbols:check-circle-outline" class="welcome__icon" />
                        Add, edit, and delete tasks with a smooth workflow
                    </li>
                    <li>
                        <Icon icon="material-symbols:check-circle-outline" class="welcome__icon" />
                        Quickly filter and search tasks by type or keywords
                    </li>
                    <li>
                        <Icon icon="material-symbols:check-circle-outline" class="welcome__icon" />
                        Enjoy a polished UI with subtle transitions and responsive design
                    </li>
                </ul>


                <ButtonAtom alignment="center" @click="handleStart">Get Started</ButtonAtom>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.welcome {
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-height: 100dvh;
    overflow: hidden;
    height: 100dvh;
    padding: 1rem;
    column-gap: 80px;
    animation: show-up .5s ease;
    overflow-y: hidden;
    scrollbar-gutter: stable;

    @media screen and (max-width: $breakpoint-laptop) {
        grid-template-columns: 1fr 1fr;
        column-gap: 3rem;
    }

    @media screen and (max-width: $breakpoint-tablet) {
        display: flex;
        flex-direction: column-reverse;
        justify-content: center;
    }

    @keyframes show-up {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    &__image {
        display: grid;
        place-items: center;
        background-color: var(--neutral-950);
        border-radius: 16px;
        max-height: fit-content;
        overflow: hidden;

        @media screen and (max-width: $breakpoint-tablet) {
            display: none;
        }

    }


    &__picture {
        background-image: url("/welcome-illustration.png");
        background-size: contain;
        background-position: center;
        width: 100%;
        height: 100%;
        filter: invert(100%);
        background-repeat: no-repeat;
    }

    &__content {
        flex: 1;
        display: flex;
        align-items: center;

        @media screen and (max-width: $breakpoint-tablet) {
            padding: 16px;
            justify-content: center;
        }
    }

    &__text {
        max-width: 400px;
    }

    &__title {
        font-size: 2rem;
        font-weight: bold;
        color: var(--neutral-900);
        margin-bottom: 0.5rem;
    }

    &__subtitle {
        font-size: 0.95rem;
        color: var(--neutral-600);
        margin-bottom: 1.5rem;
    }

    &__features {
        list-style: none;
        padding: 0;
        margin: 0 0 2rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;

        li {
            display: flex;
            align-items: center;
            font-size: 0.9rem;
            color: var(--neutral-700);
        }

        .welcome__icon {
            color: var(--primary-500);
            margin-right: 0.5rem;
            width: 18px;
            height: 18px;
        }
    }

    &__button {
        background-color: var(--primary-500);
        color: white;
        padding: 0.75rem 1.25rem;
        border-radius: 6px;
        font-weight: 600;
        text-align: center;
        display: inline-block;
        transition: background-color 0.2s ease;
        margin-bottom: 1rem;

        &:hover {
            background-color: var(--primary-600);
        }
    }

    &__signin {
        font-size: 0.85rem;
        color: var(--neutral-600);

        a {
            font-weight: 500;
            color: var(--primary-500);
            margin-left: 0.25rem;
        }
    }
}
</style>
