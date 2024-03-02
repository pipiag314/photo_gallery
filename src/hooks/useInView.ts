import React, { useState, useEffect} from "react";

export const useInView = <T extends HTMLElement>(ref: React.RefObject<T>, options?: IntersectionObserverInit) => {
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entry) => {
            setInView(entry[0].isIntersecting);
        }, options)

        const currentRef = ref.current

        if(currentRef) {
            observer.observe(currentRef);
        }


        return () => {
            if(currentRef) {
                observer.unobserve(currentRef);
            }
        }
        
    }, [options, ref]);

    return inView;
}