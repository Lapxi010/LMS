import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
    fetchCourse,
    fetchCreateComment,
    fetchCreateLesson,
    fetchDeleteComment, fetchDeleteImage, fetchDeleteVideo, fetchDocDownload,
    fetchGetComments
} from '@store/slices/course/AsyncThunks';

interface ICourseState {
    data: any;
    status: 'idle' | 'loading' | 'failed' | 'success';
    error: string | null;
    comments: any;
    statusComment: 'idle' | 'loading' | 'failed' | 'success';
}

const initialState: ICourseState = {
    data: null,
    comments: null,
    status: 'idle',
    statusComment: 'idle',
    error: null
};

const isError = (action) => {
    return action.type.endsWith('rejected');
};

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        addVideo: (state, action: PayloadAction<any>) => {
            const {lessonId, srcVideo} = action.payload;
            const course = state.data;
            const lesson = course.lessons.filter(v => v.id === lessonId)[0];
            state.data.lessons = [...state.data.lessons.filter(v => v.id !== lessonId), {
                ...lesson,
                srcVideo: srcVideo
            }]
        },
        addImage: (state, action: PayloadAction<any>) => {
            const {srcImage} = action.payload;
            state.data = {...state.data, titleImg: srcImage};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourse.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchCourse.fulfilled, (state, action) => {
                state.status = 'success';
                state.data = action.payload.course;
            })
            .addCase(fetchCreateLesson.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCreateLesson.fulfilled, (state) => {
                state.status = 'success';
            })
            .addCase(fetchCreateComment.pending, (state) => {
                state.statusComment = 'loading';
            })
            .addCase(fetchCreateComment.fulfilled, (state, action) => {
                state.statusComment = 'success'
                state.comments = [...state.comments, action.payload.comment];
            })
            .addCase(fetchGetComments.pending, (state) => {
                state.statusComment = 'loading';
            })
            .addCase(fetchGetComments.fulfilled, (state, action) => {
                state.statusComment = 'success';
                state.comments = action.payload.comments;
            })
            .addCase(fetchDeleteComment.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDeleteComment.fulfilled, (state, action) => {
                state.status = 'success';
                state.comments = state.comments.filter(v => v.id !== action.payload);
            })
            .addCase(fetchDocDownload.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDocDownload.fulfilled, (state) => {
                state.status = 'success';
            })
            .addCase(fetchDeleteVideo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDeleteVideo.fulfilled, (state, action: PayloadAction<any>) => {
                const {lessondId} = action.payload;
                state.status = 'success';
                const course = state.data;
                const lesson = course.lessons.filter(v => v.id === lessondId)[0];
                state.data.lessons = [...state.data.lessons.filter(v => v.id !== lessondId), {
                    ...lesson,
                    srcVideo: null
                }]
            })
            .addCase(fetchDeleteImage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDeleteImage.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'success';
                state.data = {...state.data, titleImg: null};
            });
    }
});

export const selectStatus = (state) => state.course.status;

export const selectThisCourse = (state) => state.course.data;
export const selectLesson = (state, id) => {
    const lessons = state.course.data.lessons;
    return lessons.filter(v => v.id === id)[0];
};

export const selectComments = (state) => state.course.comments;

export const selectMemberForCourse = (state, id) => {
    const members = state.auth.data.member;
    const tmp = members.filter(v => v.courseId === id)
    if (tmp && tmp.length > 0) {
        return tmp[0];
    }
    return null;
}

export const selectViewForLesson = (state, id, id2) => {
    const members = state.auth.data.member;
    const tmp = members.filter(v => v.courseId === id)
    if (tmp && tmp.length > 0) {
        return tmp[0].viewed.filter(v => v.lessonId === id2)[0];
    }
    return null;
}

export const selectStatusComment = (state) => state.course.statusComment;

export const {addVideo, addImage} = courseSlice.actions;

export default courseSlice.reducer;