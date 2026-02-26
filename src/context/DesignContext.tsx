'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type DesignVersion = 'myhra' | 'huly';

interface DesignContextType {
    designVersion: DesignVersion;
    setDesignVersion: (version: DesignVersion) => void;
    isMounted: boolean;
}

const DesignContext = createContext<DesignContextType | undefined>(undefined);

export function DesignProvider({ children }: { children: React.ReactNode }) {
    const [designVersion, setDesignVersionState] = useState<DesignVersion>('myhra');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        try {
            const savedVersion = localStorage.getItem('portfolio-design-version');
            if (savedVersion === 'myhra' || savedVersion === 'huly') {
                setDesignVersionState(savedVersion);
            }
        } catch (error) {
            console.error('Error reading design version from localStorage:', error);
        }
    }, []);

    const setDesignVersion = (version: DesignVersion) => {
        setDesignVersionState(version);
        try {
            localStorage.setItem('portfolio-design-version', version);
        } catch (error) {
            console.error('Error saving design version to localStorage:', error);
        }
    };

    return (
        <DesignContext.Provider value={{ designVersion, setDesignVersion, isMounted }}>
            {children}
        </DesignContext.Provider>
    );
}

export function useDesign() {
    const context = useContext(DesignContext);
    if (context === undefined) {
        throw new Error('useDesign must be used within a DesignProvider');
    }
    return context;
}
