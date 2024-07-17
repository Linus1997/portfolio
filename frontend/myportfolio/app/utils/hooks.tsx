import { useEffect, useLayoutEffect, useState } from "react";

export function useDebounce(delay: number, callBack: () => void , eventType: string) {
    


    useLayoutEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        const handleEvent = () => {
            
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
               callBack();
            }, delay);
        }
        window.addEventListener(eventType, handleEvent);
        return () => {
            window.removeEventListener(eventType, handleEvent);
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [delay])

}