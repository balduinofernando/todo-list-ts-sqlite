export interface ITodo {
    id: number,
    user_id: number,
    task_name: string,
    status: ETodoStatus,
}

enum ETodoStatus {
    inProress = 'In Progress',
    completed = 'Completed',
    ceclined = 'Declined'
}