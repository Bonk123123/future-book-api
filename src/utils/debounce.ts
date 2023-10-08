const debounce = (callback: CallableFunction, time: number) => {
    let timer: NodeJS.Timeout;

    const debouncedTimer = () => {
        clearTimeout(timer);

        timer = setTimeout(() => callback(), time);
    };

    return debouncedTimer;
};

export default debounce;
