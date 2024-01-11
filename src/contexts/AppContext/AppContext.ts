import React, { useCallback, useRef, useState } from 'react';
import { Todo } from '../../models/Todo/types';

export type ModalRole = 'CREATE' | 'EDIT';

interface AppContextInitial {
    isModalOpen: boolean;
    modalClose: () => void;
    modalOpenCreate: () => void;
    modalOpenEdit: (editable: Todo) => void;
    modalRef: React.RefObject<HTMLDivElement>;
    modalRole: ModalRole;
    modalEditable: Todo;
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
    const [modalRole, setModalRole] = useState<ModalRole>('CREATE');
    const [modalEditable, setModalEditable] = useState<Todo>({} as Todo);
    const modalRef = useRef(null);

    const modalClose = useCallback(() => setIsModalOpen(false), []);
    const modalOpenCreate = useCallback(() => {
        setIsModalOpen(true);
        setModalRole('CREATE');
    }, []);
    const modalOpenEdit = useCallback((editable: Todo) => {
        setIsModalOpen(true);
        setModalRole('EDIT');
        setModalEditable(editable);
    }, []);

    return {
        modalEditable,
        isModalOpen,
        modalClose,
        modalOpenCreate,
        modalOpenEdit,
        modalRef,
        modalRole,
    };
};
