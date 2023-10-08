import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISearchModel } from '../../../models/ISearchModel';
import { subjects } from '../../../utils/subjects';
import { orderBy } from '../../../utils/orderBy';

const initialState: ISearchModel = {
    q: '',
    subject: 'all',
    orderBy: 'relevance',
    indexPagination: 0,
    stepPagination: 30,
};

export const SearchBooksSlice = createSlice({
    name: 'searchBooks',
    initialState,
    reducers: {
        setQ: (state, action: PayloadAction<string>) => {
            state.q = action.payload;
        },
        setSubject: (state, action: PayloadAction<string>) => {
            if (
                action.payload === subjects.all ||
                action.payload === subjects.art ||
                action.payload === subjects.biography ||
                action.payload === subjects.computers ||
                action.payload === subjects.history ||
                action.payload === subjects.medical ||
                action.payload === subjects.poetry
            )
                state.subject = action.payload;
        },
        setOrderBy: (state, action: PayloadAction<string>) => {
            if (
                action.payload === orderBy.relevance ||
                action.payload === orderBy.newest
            )
                state.orderBy = action.payload;
        },
        setIndex: (state, action: PayloadAction<number>) => {
            state.indexPagination = action.payload;
        },
        addBooksPag: (state) => {
            state.indexPagination += state.stepPagination;
        },
    },
});

export const { setQ, setSubject, setOrderBy, setIndex, addBooksPag } =
    SearchBooksSlice.actions;

export default SearchBooksSlice.reducer;
