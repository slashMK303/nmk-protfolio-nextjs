"use client";
import { createContext, useContext, useState } from "react";

const LoadingContext = createContext({ done: false, setDone: () => { } });

export function LoadingProvider({ children }) {
    const [done, setDone] = useState(false);
    return (
        <LoadingContext.Provider value={{ done, setDone }}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    return useContext(LoadingContext);
}
