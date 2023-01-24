export interface ICourses {
    courses: ICourse[],
    message?: string
}

export interface ICourse {
    id: string,
    title: string,
    description: string,
    shortDesc: string,
    userId: string,
    createdAt: string,
    message?: string
}