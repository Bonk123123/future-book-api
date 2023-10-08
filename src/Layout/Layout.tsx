import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { subjects, subjects as subjectsConst } from '../utils/subjects';
import { orderBy as orderByConst } from '../utils/orderBy';
import SearchSVG from '../components/SearchSVG/SearchSVG';
import useDebounce from '../hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { clearBooks, fetchBooks } from '../store/Slices/BooksSlice/BooksSlice';
import {
    setOrderBy,
    setQ,
    setSubject,
    setIndex,
} from '../store/Slices/SearchBooksSlice/SearchBooksSlice';

const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const { indexPagination, stepPagination, q, subject, orderBy } =
        useAppSelector((state) => state.searchBooks);

    const fetchBooksFunction = React.useCallback(() => {
        dispatch(
            fetchBooks({
                indexPagination,
                stepPagination,
                q,
                subject,
                orderBy,
            })
        );
    }, [indexPagination, stepPagination, q, subject, orderBy]);

    React.useEffect(() => {
        dispatch(setIndex(0));
        dispatch(clearBooks());
    }, [subject, orderBy]);

    React.useEffect(() => {
        if (location.pathname.includes('/book')) navigate('/');
        fetchBooksFunction();
    }, [indexPagination, subject, orderBy]);

    const handleSearchDebounce = () => {
        dispatch(setIndex(0));
        dispatch(clearBooks());
        if (location.pathname.includes('/book')) navigate('/');
        fetchBooksFunction();
    };

    const debounce = useDebounce(handleSearchDebounce, 300);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setQ(e.target.value));
        debounce();
    };

    const handleChangeSubject = (item: string) => {
        dispatch(setSubject(item));
    };

    const handleChangeOrderBy = (item: string) => {
        dispatch(setOrderBy(item));
    };

    return (
        <div className="min-h-screen w-full container mx-auto px-2 md:px-16 xl:px-32 py-4 gap-10 flex flex-col">
            <div className="h-1/2 w-full flex flex-col justify-center items-center gap-5">
                <span className="w-full justify-center">
                    <p className="text-center text-2xl">Find Book</p>
                </span>
                <div className="w-full flex justify-center">
                    <button className="w-10 h-10 border-r flex justify-center items-center bg-white">
                        <SearchSVG />
                    </button>
                    <input
                        value={q}
                        onChange={(e) => handleSearch(e)}
                        className="h-10 w-[80%] md:w-1/2 p-2 focus:outline-none"
                        type="text"
                        placeholder="just start tape"
                    />
                </div>
                <div className="w-full flex justify-center">
                    <div className="w-full flex justify-center gap-10">
                        <select
                            onChange={(e) =>
                                handleChangeSubject(e.target.value)
                            }
                            placeholder="filter"
                            className="w-[40%] md:w-1/4 h-10 p-2 focus:outline-none"
                        >
                            {Object.keys(subjectsConst).map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>

                        <select
                            onChange={(e) =>
                                handleChangeOrderBy(e.target.value)
                            }
                            placeholder="filter"
                            className="w-[40%] md:w-1/4 h-10 p-2 focus:outline-none"
                        >
                            {Object.keys(orderByConst).map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="h-auto w-full">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
