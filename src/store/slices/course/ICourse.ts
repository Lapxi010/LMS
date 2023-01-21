export interface ICourses {
    courses: ICourse[],
    message?: string
}

export interface ICourse {
    id: String,
    title: String,
    description: String,
    shorDesc: String,
    userId: String,
    createdAt: String,
    message?: string
}