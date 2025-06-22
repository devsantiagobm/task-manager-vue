import { fetcher } from "@/utils/axios.util";
import { type AxiosResponse } from "axios";
import { defineStore } from "pinia";
import { getNotesAdapter } from "../adapters/get-notes.adapter";
import type { RawNote } from "../types/raw-note";

interface State {
    tasks: Note[]
    selectedTask: Note | null,
    status: {
        getTasks: { isLoading: boolean; error: string | null }
        createTask: { isLoading: boolean; error: string | null }
        updateTask: { isLoading: boolean; error: string | null }
        deleteTask: { isLoading: boolean; error: string | null }
    }
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
        selectedTask: null
    }),
    actions: {
        selectTask(note: Note) {
            this.selectedTask = note;
        },
        clearSelectedTask() {
            this.selectedTask = null;
        },
        async getTasks() {
            try {
                this.status.getTasks.isLoading = true
                this.status.getTasks.error = null
                const response: AxiosResponse<RawNote[]> = await fetcher({
                    url: "/tasks",
                    method: "GET"
                })
                this.tasks = response.data.map(getNotesAdapter)
            } catch (err: any) {
                //TODO TIPAR BIEN ESTO
                this.status.getTasks.error = err.message || 'Error fetching notes'
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
                this.status.createTask.error = err.message || 'Error creating the note'
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
                this.status.updateTask.error = err.message || 'Error updating the note'
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

                this.selectedTask = null
            } catch (err: any) {
                this.status.deleteTask.error = err.message || 'Error delete the note'
                throw err; // With this sonner catch the error and shows the alert
            } finally {
                this.status.deleteTask.isLoading = false
            }
        },
    }
})