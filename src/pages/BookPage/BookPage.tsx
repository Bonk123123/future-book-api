import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import NoImageSVG from '../../components/NoImageSVG/NoImageSVG';
import { fetchBook } from '../../store/Slices/BookSlice/BookSlice';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';

const BookPage = () => {
    const { id } = useParams();

    const dispatch = useAppDispatch();
    const { book, isLoading, error } = useAppSelector((state) => state.book);

    React.useEffect(() => {
        if (id) dispatch(fetchBook(id));
    }, []);

    return (
        <div className="w-full flex flex-col bg-white min-h-[65vh] p-4">
            {error && <p>oh no... {error}</p>}
            {!isLoading && book ? (
                <div className="flex flex-col lg:flex-row w-full h-full items-center gap-4">
                    <div className="w-full lg:w-1/2 flex justify-center items-center self-start">
                        {book?.volumeInfo.imageLinks &&
                        book?.volumeInfo.imageLinks.medium ? (
                            <img
                                src={book.volumeInfo.imageLinks.medium}
                                alt="image"
                            />
                        ) : (
                            <NoImageSVG />
                        )}
                    </div>
                    <div className="w-full h-full lg:w-1/2 flex flex-col self-start">
                        <div>
                            <p className="text-start text-xl font-semibold">
                                {book.volumeInfo.title}
                            </p>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: book.volumeInfo.description,
                                }}
                                className="text-start"
                            ></p>
                        </div>
                        <div className="mt-4">
                            <p className="text-end">
                                {book.volumeInfo.authors.length === 1
                                    ? 'Author: '
                                    : 'Authors: '}
                                {book.volumeInfo.authors.map((item, i) =>
                                    i !== book.volumeInfo.authors.length - 1
                                        ? item + ', '
                                        : item
                                )}
                            </p>
                            <p className="text-sm text-end text-slate-600">
                                Categories:{' '}
                                {book.volumeInfo.categories?.map((item, i) =>
                                    i !== book.volumeInfo.categories.length - 1
                                        ? item + ', '
                                        : item
                                )}
                            </p>
                            <p className="text-sm text-end text-slate-600">
                                Self Link:{' '}
                                <a href={book.volumeInfo.previewLink}>
                                    {book.volumeInfo.previewLink}
                                </a>
                            </p>
                            <p className="text-sm text-end text-slate-600">
                                Page Count: {book.volumeInfo.pageCount}
                            </p>
                            <p className="text-sm text-end text-slate-600">
                                Publish Date: {book.volumeInfo.publishedDate}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <Loading />
            )}

            {!isLoading && book === null && <p>no such book</p>}
        </div>
    );
};

export default BookPage;
