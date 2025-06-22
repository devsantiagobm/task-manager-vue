import type { RawNote } from "../types/raw-note";



export function getNotesAdapter(raw: RawNote): Note {
    return {
        id: raw.id,
        title: raw.title,
        createdAt: new Date(raw.created_at),
        description: raw.description,
        isComplete: raw.is_completed,
        lastUpdated: raw.updated_at
    }
}