import React from 'react';
import Loading from '../../components/Loading/Loading';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchBooks } from '../../store/Slices/BooksSlice/BooksSlice';
import BookCard from '../../components/BookCard/BookCard';
import { addBooksPag } from '../../store/Slices/SearchBooksSlice/SearchBooksSlice';

const BooksPage = () => {
    const dispatch = useAppDispatch();
    const { isLoading, error, books, booksCount } = useAppSelector(
        (state) => state.books
    );
    const { indexPagination, stepPagination } = useAppSelector(
        (state) => state.searchBooks
    );

    const [isIntersecting, setIsIntersecting] = React.useState(false);

    const buttonRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        if (isLoading) return;
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        });
        if (buttonRef.current) observer.observe(buttonRef.current);
        return () => {
            if (buttonRef.current) observer.disconnect();
        };
    }, [isIntersecting, isLoading]);

    React.useEffect(() => {
        if (isIntersecting) dispatch(addBooksPag());
    }, [isIntersecting]);

    return (
        <div className="w-full flex flex-col bg-white min-h-[65vh] p-4">
            {error && <p>oh no... {error}</p>}
            <div className="h-full w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {books?.map((item, i) => (
                    <BookCard key={i} book={item} />
                ))}

                {isLoading ? (
                    <Loading />
                ) : booksCount > indexPagination + stepPagination + 10 ? (
                    <button
                        ref={buttonRef}
                        className="col-span-1 sm:col-span-2 lg:col-span-3"
                        onClick={() => dispatch(addBooksPag())}
                    >
                        more books
                    </button>
                ) : (
                    <></>
                )}

                {!isLoading && booksCount === 0 && (
                    <p className="col-span-1 sm:col-span-2 lg:col-span-3">
                        no such books
                    </p>
                )}
            </div>
        </div>
    );
};

export default BooksPage;
