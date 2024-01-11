import React, { useCallback, useRef, useState } from 'react';

interface AppContextInitial {
    isModalOpen: boolean;
    modalClose: () => void;
    modalOpen: () => void;
    modalRef: React.RefObject<HTMLDivElement>;
}

//главный контекст
export const AppContext = React.createContext<AppContextInitial>({} as AppContextInitial);

//функция будет возвращать главный контекст
export function useAppContext() {
    const context = React.useContext(AppContext);
    if (!context) throw new Error('Use app context within provider!');
    return context;
}

//функция с глобальным хранилищем
export const useCreateAppContext = (): AppContextInitial => {
    //отображение модального окна
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef(null);

    const modalClose = useCallback(() => setIsModalOpen(false), []);
    const modalOpen = useCallback(() => setIsModalOpen(true), []);

    return {
        isModalOpen,
        modalClose,
        modalOpen,
        modalRef,
    };
};
