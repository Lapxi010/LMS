import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
    fetchRegister,
    fetchLogin,
    fetchRefresh,
    fetchLogout,
    updateUser,
    enterCourse,
    fetchDeleteTitleImage
} from './AsyncThunks';
import {fetchVisitedLesson} from "./AsyncThunks";
import {fetchDeleteImage} from "@store/slices/course/AsyncThunks";

interface IauthState {
    data: any;
    status: 'idle' | 'loading' | 'failed' | 'success';
    isAuth: boolean;
    error: string | null;
}

const initialState: IauthState = {
    data: null,
    status: 'idle',
    isAuth: false,
    error: null
};

const isError = (action) => {
    return action.type.endsWith('rejected');
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addImage: (state, action: PayloadAction<any>) => {
            const {srcImage} = action.payload;
            state.data = {...state.data, TitleImg: srcImage};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.status = 'success';
                state.data = action.payload.user;
                state.isAuth = true;
                localStorage.setItem('token', action.payload.accessToken);
            })
            .addCase(enterCourse.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(enterCourse.fulfilled, (state, action) => {
                state.status = 'success';
                state.data = {...state.data, member: [...state.data.member, action.payload.member]}
            })
            .addCase(fetchRegister.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.status = 'success';
                state.data = action.payload.user;
                state.isAuth = true;
                localStorage.setItem('token', action.payload.accessToken);
            })
            .addCase(fetchRefresh.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchRefresh.fulfilled, (state, action) => {
                state.status = 'success';
                state.data = action.payload.user;
                state.isAuth = true;
                localStorage.setItem('token', action.payload.accessToken);
            })
            .addCase(fetchLogout.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchLogout.fulfilled, (state, action) => {
                state.status = 'failed';
                state.data = null;
                state.isAuth = false;
                localStorage.removeItem('token');

            })
            .addCase(updateUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = 'success';
                state.data = {...state.data, fio: action.payload.fio};
            })
            .addCase(fetchVisitedLesson.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchVisitedLesson.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'success';
                state.data.member.filter((v) => v.id === action.payload.memberId)[0].viewed.push(action.payload.viewed);
            })
            .addCase(fetchDeleteTitleImage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDeleteTitleImage.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'success';
                state.data = {...state.data, TitleImg: null};
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.status = 'failed';
            });
    }
});
export const selectStatus = (state) => state.auth.status;
export const selectIsAuth = (state) => state.auth.isAuth;

export const selectUser = (state) => state.auth.data;

export const selectActivatedUrl = (state) => state.auth?.data?.isActivated;

export const selectRole = (state) => {
    if (state.auth.data != null) {
        return state.auth.data.role;
    }
    return 'ch';
};

export const selectEnterCourse = (state, id) => {
    if (state.auth?.data) {
        if (state.auth?.data?.hasOwnProperty('member')) {
            let a = state.auth.data.member.map((v) => {
                if (v.courseId === id) {
                    return v;
                }
            })
            for (let i of a) {
                if (i !== undefined) return true;
            }
        }
    }
    return false
}

export const {addImage} = authSlice.actions

export const AuthReducer = authSlice.reducer;
