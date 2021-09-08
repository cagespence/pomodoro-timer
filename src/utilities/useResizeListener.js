import { useState, useEffect } from "react";

const debounce = (func, timeout = 300) => {
    let timer
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            func.apply(this, args);
        }, timeout)
    };
}

export const useResizeListener = () => {
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });

    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        }, 300)
        window.addEventListener('resize', debouncedHandleResize)
        return () => {
            window.removeEventListener('resize', debouncedHandleResize)
        }
    });

    return [dimensions];
}