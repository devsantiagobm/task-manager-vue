<template>
    <div class="tasks-empty-state">
        <h2>No tasks yet</h2>
        <p class="tasks-empty-state__description">Start by adding your first task—it’s quick and easy!</p>
        <picture class="task-empty-state__picture">
            <img src="/persons-ilustration.png" alt="No tasks illustration" />
        </picture>
    </div>
</template>

<style lang="scss">
.tasks-empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 24px 0 0;
    text-align: center;

    &__description{
        color: var(--neutral-600);
    }

    &__picture{
        max-width: 100%;
        margin: 16px 0 0;
    }
}
</style>
