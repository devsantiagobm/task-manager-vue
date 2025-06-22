interface Note {
    id: string | int;
    title: string;
    description: string;
    isComplete: boolean;
    createdAt: string | Date;
    lastUpdated: string | Date;
}