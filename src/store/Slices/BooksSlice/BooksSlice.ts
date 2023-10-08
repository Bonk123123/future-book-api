import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ISearchModel } from '../../../models/ISearchModel';
import { IBookPreview } from '../../../models/IBookPreview';

const KEY = 'AIzaSyAp-3B31XcCicMbNwDo-e5TzDMK6ZWv8hU';

// Define a type for the slice state
interface BooksState {
    isLoading: boolean;
    error: string;
    books: IBookPreview[];
    booksCount: number;
}

// Define the initial state using that type
const initialState: BooksState = {
    isLoading: false,
    error: '',
    books: [],
    booksCount: 0,
};

interface IFetchBooksReturn {
    totalItems: number;
    items: IBookPreview[];
}

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async (search_param: ISearchModel, { rejectWithValue }) => {
        try {
            const maxResult =
                search_param.indexPagination + search_param.stepPagination;
            const response: IFetchBooksReturn = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${
                    search_param.q ? search_param.q : 'a'
                }${
                    search_param.subject !== 'all'
                        ? '+subject:' + search_param.subject
                        : ''
                }${
                    search_param.orderBy
                        ? '&orderBy=' + search_param.orderBy
                        : ''
                }${
                    search_param.indexPagination
                        ? '&startIndex=' + search_param.indexPagination
                        : ''
                }${
                    search_param.stepPagination
                        ? '&maxResults=' + search_param.stepPagination
                        : ''
                }&key=${KEY}`
            ).then((response) => response.json());
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const BooksSlice = createSlice({
    name: 'books',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        clearBooks: (state) => {
            state.books = [];
            state.booksCount = 0;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBooks.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchBooks.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload.items && action.payload.totalItems !== 0) {
                state.books = state.books.concat(action.payload.items);
                state.booksCount = action.payload.totalItems;
            }
        });
        builder.addCase(fetchBooks.rejected, (state, action) => {
            state.isLoading = false;
            if (action.payload) state.error = action.payload as string;
        });
    },
});

export const { clearBooks } = BooksSlice.actions;

export default BooksSlice.reducer;
