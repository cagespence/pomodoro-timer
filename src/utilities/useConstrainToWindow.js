import { useEffect, useState } from "react";
import { useResizeListener } from "./useResizeListener";

export const useConstrainToWindow = (maxWidth) => {
   const [windowDimensions] = useResizeListener();
    const [elementWidth, setElementWidth] = useState(maxWidth);

    useEffect(() => {
        if (windowDimensions.width < maxWidth) {
            setElementWidth(windowDimensions.width);
        } else {
            setElementWidth(maxWidth);
        }
    }, [windowDimensions, maxWidth]); 

    return [elementWidth];
}
