import React, { FC } from 'react';
import NoImageSVG from '../NoImageSVG/NoImageSVG';
import { Link } from 'react-router-dom';
import { IBookPreview } from '../../models/IBookPreview';

interface props {
    book: IBookPreview;
}

const BookCard: FC<props> = React.memo(({ book }) => {
    return (
        <Link to={`book/${book.id}`} className="w-full h-[300px]">
            <div className="flex justify-center w-full items-center">
                {book.volumeInfo.imageLinks &&
                book.volumeInfo.imageLinks.smallThumbnail ? (
                    <img
                        className="h-[150px]"
                        src={book.volumeInfo.imageLinks.smallThumbnail}
                        alt="image"
                    />
                ) : (
                    <NoImageSVG />
                )}
            </div>
            <div>
                <p className="text-sm">
                    {book.volumeInfo.title ? book.volumeInfo.title : 'unknown'}
                </p>
                <p className="text-sm text-slate-600">
                    category:
                    {book.volumeInfo.categories
                        ? book.volumeInfo.categories.map((category, i) =>
                              i !== book.volumeInfo.categories.length - 1
                                  ? category + ','
                                  : category
                          )
                        : 'unknown'}
                </p>
                <p className="text-sm text-slate-600">
                    publish date:
                    {book.volumeInfo.publishedDate
                        ? book.volumeInfo.publishedDate
                        : 'unknown'}
                </p>
            </div>
        </Link>
    );
});

export default BookCard;
