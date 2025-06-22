import { fetcher } from "@/utils/axios.util";
import { type AxiosResponse } from "axios";
import { defineStore } from "pinia";
import { getTasksAdapter } from "../adapters/get-task.adapter";
import type { RawTask } from "../types/raw-task";


export type FilterType = 'all' | 'completed' | 'pending'
interface State {
    tasks: Task[]
    selectedTaskId: number | null,
    status: {
        getTasks: { isLoading: boolean; error: string | null }
        createTask: { isLoading: boolean; error: string | null }
        updateTask: { isLoading: boolean; error: string | null }
        deleteTask: { isLoading: boolean; error: string | null }
    },
    searchQuery: string
    filterType: FilterType
}

export const useTasksStore = defineStore("tasks", {
    state: (): State => ({
        tasks: [],
        status: {
            getTasks: { isLoading: false, error: null },
            createTask: { isLoading: false, error: null },
            updateTask: { isLoading: false, error: null },
            deleteTask: { isLoading: false, error: null },
        },
        selectedTaskId: null,
        searchQuery: "",
        filterType: "all"
    }),

    getters: {
        taskStats: (state) => {
            const total = state.tasks.length;
            const completed = state.tasks.filter(t => t.isComplete).length;
            const pending = total - completed;

            return { total, completed, pending };
        },
        filteredTasks: (state) => {
            return state.tasks
                .filter(task => {
                    const matchesSearch =
                        state.searchQuery === "" ||
                        task.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                        task.description.toLowerCase().includes(state.searchQuery.toLowerCase());

                    const matchesFilter =
                        state.filterType === "all" ||
                        (state.filterType === "completed" && task.isComplete) ||
                        (state.filterType === "pending" && !task.isComplete);

                    return matchesSearch && matchesFilter;
                })
                .sort((a, b) => {
                    const dateA = new Date(a.lastUpdated).getTime();
                    const dateB = new Date(b.lastUpdated).getTime();
                    return dateB - dateA;
                });
        },
        selectedTask: (state) => {
            return state.tasks.find(task => task.id === state.selectedTaskId)
        }
    },

    actions: {
        selectTask(id: number) {
            this.selectedTaskId = id;
        },
        clearSelectedTask() {
            this.selectedTaskId = null;
        },
        setFilterType(filter: FilterType) {
            this.filterType = filter
        },
        setSearchQuery(search: string) {
            this.searchQuery = search
        },
        async getTasks() {
            try {
                this.status.getTasks.isLoading = true
                this.status.getTasks.error = null
                const response: AxiosResponse<RawTask[]> = await fetcher({
                    url: "/tasks",
                    method: "GET"
                })
                this.tasks = response.data.map(getTasksAdapter)
            } catch (err: any) {
                //TODO TIPAR BIEN ESTO y MOSTRAR EL ERROR CORRECTAMENTE
                this.status.getTasks.error = err.message || 'Error fetching tasks'
            } finally {
                this.status.getTasks.isLoading = false
            }
        },
        async createTask(data: { title: string, description: string }) {
            try {
                this.status.createTask.isLoading = true
                this.status.createTask.error = null
                await fetcher({ url: "/tasks", method: "POST", data })
                await this.getTasks()
            } catch (err: any) {
                this.status.createTask.error = err.message || 'Error creating the task'
                throw err; // With this sonner catch the error and shows the alert
            } finally {
                this.status.createTask.isLoading = false
            }
        },
        async updateTask(data: { id: number, title?: string, description?: string, isComplete?: boolean }) {
            try {
                this.status.updateTask.isLoading = true
                this.status.updateTask.error = null

                const payload = { ...data, is_completed: data.isComplete }
                await fetcher({ url: `/tasks/${data.id}`, method: "PUT", data: payload })
                await this.getTasks()
            } catch (err: any) {
                this.status.updateTask.error = err.message || 'Error updating the task'
                throw err; // With this sonner catch the error and shows the alert
            } finally {
                this.status.updateTask.isLoading = false
            }
        },
        async deleteTask(id: number) {
            try {
                this.status.deleteTask.isLoading = true
                this.status.deleteTask.error = null
                await fetcher({ url: `/tasks/${id}`, method: "DELETE" })
                await this.getTasks()

                this.selectedTaskId = null
            } catch (err: any) {
                this.status.deleteTask.error = err.message || 'Error deleting the task'
                throw err; // With this sonner catch the error and shows the alert
            } finally {
                this.status.deleteTask.isLoading = false
            }
        },
    }
})