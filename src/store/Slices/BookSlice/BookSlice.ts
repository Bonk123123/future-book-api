import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IBook } from '../../../models/IBook';
import { ISearchModel } from '../../../models/ISearchModel';

const KEY = 'AIzaSyAp-3B31XcCicMbNwDo-e5TzDMK6ZWv8hU';

// Define a type for the slice state
interface BookState {
    isLoading: boolean;
    error: string;
    book: IBook | null;
}

// Define the initial state using that type
const initialState: BookState = {
    isLoading: false,
    error: '',
    book: null,
};

export const fetchBook = createAsyncThunk(
    'book/fetchBook',
    async (id: string, { rejectWithValue }) => {
        try {
            const response: IBook = await fetch(
                `https://www.googleapis.com/books/v1/volumes/${id}?key=${KEY}`
            ).then((response) => response.json());
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const BookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBook.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchBook.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload) {
                state.book = action.payload;
            }
        });
        builder.addCase(fetchBook.rejected, (state, action) => {
            state.isLoading = false;
            if (action.payload) state.error = action.payload as string;
        });
    },
});

export const {} = BookSlice.actions;

export default BookSlice.reducer;
