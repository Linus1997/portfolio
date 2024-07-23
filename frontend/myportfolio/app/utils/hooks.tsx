import { useEffect, useLayoutEffect, useState } from "react";

const event = new Event("build");

export function useDebounce(delay: number, callBack: () => void , eventType: string) {
    


    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        const handleEvent = () => {
            
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
               callBack();
            }, delay);
        }
        
        document.addEventListener(eventType, handleEvent);
        return () => {
            document.removeEventListener(eventType, handleEvent);
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [delay])

}


/**
 * export function useDebounce(delay: number, callBack: () => void , eventType: string) {
    


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
 */