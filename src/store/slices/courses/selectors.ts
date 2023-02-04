export const selectCoursesIsLoaded = state => state.courses.data !== null;
export const selectStatus = (state) => state.courses.statusCourses;
export const selectStatusCreateCourse = (state) => state.courses.statusCreateCourses;
export const selectCourses = (state) => state.courses.data;