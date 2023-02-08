export const selectCoursesIsLoaded = state => state.courses?.data !== null;
export const selectStatus = (state) => state.courses?.statusCourses;
export const selectStatusCreateCourse = (state) => state.courses?.statusCreateCourses;
export const selectCourses = (state, stateSearch) => {
    if (stateSearch === 'all') {
        return state.courses?.data;
    } else {
        let members = state.auth?.data?.member
        let courses = state.courses?.data
        let res = []
        for (let i of members) {
            for (let j of courses) {
                if (i.courseId === j.id) {
                    res.push(j)
                }
            }
        }
        return res
    }
};

export const selectCourseForTeacher = (state) => {
    let id = state.auth?.data?.id
    let courses = state.courses?.data

    if(id === undefined) {
        return []
    }

    let res = []
    for (let j of courses) {
        if (j.userId === id) {
            res.push(j)
        }
    }
    return res
}