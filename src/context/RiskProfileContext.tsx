import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { RiskProfile } from '@/lib/types';
import { loadDataset, saveDataset, resetTable as resetTableInStorage, resetAll as resetAllInStorage } from '@/lib/storage';

interface RiskProfileContextValue {
    profile: RiskProfile;
    updateTable: <K extends keyof RiskProfile>(table: K, rows: RiskProfile[K]) => void;
    resetTable: (table: keyof RiskProfile) => void;
    resetAll: () => void;
    replaceProfile: (profile: RiskProfile) => void;
}

const RiskProfileContext = createContext<RiskProfileContextValue | null>(null);

export function RiskProfileProvider({ children }: { children: ReactNode }) {
    const [profile, setProfile] = useState<RiskProfile>(() => loadDataset());

    const updateTable = useCallback(<K extends keyof RiskProfile>(table: K, rows: RiskProfile[K]) => {
        setProfile(prev => {
            const next = { ...prev, [table]: rows };
            saveDataset(next);
            return next;
        });
    }, []);

    const resetTable = useCallback((table: keyof RiskProfile) => {
        const next = resetTableInStorage(table);
        setProfile(next);
    }, []);

    const resetAll = useCallback(() => {
        const next = resetAllInStorage();
        setProfile(next);
    }, []);

    const replaceProfile = useCallback((newProfile: RiskProfile) => {
        saveDataset(newProfile);
        setProfile(newProfile);
    }, []);

    return (
        <RiskProfileContext.Provider value={{ profile, updateTable, resetTable, resetAll, replaceProfile }}>
            {children}
        </RiskProfileContext.Provider>
    );
}

export function useRiskProfile() {
    const ctx = useContext(RiskProfileContext);
    if (!ctx) throw new Error('useRiskProfile must be used within a RiskProfileProvider');
    return ctx;
}
