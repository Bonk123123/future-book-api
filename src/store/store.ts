import { configureStore } from '@reduxjs/toolkit';
import BooksSlice from './Slices/BooksSlice/BooksSlice';
import SearchBooksSlice from './Slices/SearchBooksSlice/SearchBooksSlice';
import BookSlice from './Slices/BookSlice/BookSlice';

export const store = configureStore({
    reducer: {
        book: BookSlice,
        books: BooksSlice,
        searchBooks: SearchBooksSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
