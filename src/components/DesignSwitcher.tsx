'use client';

import React from 'react';
import { useDesign } from '@/context/DesignContext';

export function DesignSwitcher() {
    const { designVersion, setDesignVersion, isMounted } = useDesign();

    if (!isMounted) return null; // Avoid hydration mismatch

    const toggleDesign = () => {
        setDesignVersion(designVersion === 'myhra' ? 'huly' : 'myhra');
    };

    return (
        <button
            onClick={toggleDesign}
            className="relative flex h-8 items-center cursor-pointer rounded-full bg-white/5 border border-white/10 p-1 w-16 transition-colors hover:bg-white/10 ml-2"
            aria-label="Toggle Design Version"
            title={`Current: ${designVersion === 'myhra' ? 'Myhra' : 'Huly'}`}
        >
            <div
                className={`flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br transition-transform duration-300 shadow-sm ${designVersion === 'huly'
                        ? 'translate-x-8 from-orange-500 to-orange-600'
                        : 'translate-x-0 from-cyan-500 to-cyan-600'
                    }`}
            >
                <span className="text-[10px] font-bold text-white tracking-tighter">
                    {designVersion === 'myhra' ? 'MV' : 'HY'}
                </span>
            </div>
        </button>
    );
}
