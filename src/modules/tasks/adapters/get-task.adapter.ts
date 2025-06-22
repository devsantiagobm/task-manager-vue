import type { RawTask } from "../types/raw-task";



export function getTasksAdapter(raw: RawTask): Task {
    return {
        id: raw.id,
        title: raw.title,
        createdAt: new Date(raw.created_at),
        description: raw.description,
        isComplete: raw.is_completed,
        lastUpdated: raw.updated_at
    }
}