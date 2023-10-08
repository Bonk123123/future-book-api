import React from 'react';
import debounce from '../utils/debounce';

const useDebounce = (callback: CallableFunction, time: number) => {
    const ref = React.useRef<CallableFunction | null>(null);

    React.useEffect(() => {
        ref.current = callback;
    }, [callback]);

    const debounceCallback = React.useMemo(() => {
        const func = () => {
            ref.current?.();
        };

        return debounce(func, time);
    }, []);

    return debounceCallback;
};

export default useDebounce;
