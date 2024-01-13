import React, { useCallback, useRef, useState } from 'react';
import { Todo } from '../../models/Todo/types';
import { User } from '../../models/User/types';
import todoApi from '../../api/TodoApi';
import { deleteCookie, setCookie } from '../../share/cookie';

export type ModalRole = 'CREATE' | 'EDIT';

interface AppContextInitial {
    isModalOpen: boolean;
    modalClose: () => void;
    modalOpenCreate: () => void;
    modalOpenEdit: (editable: Todo) => void;
    modalRef: React.RefObject<HTMLDivElement>;
    modalRole: ModalRole;
    modalEditable: Todo;
    currentUser: User | null;
    authUser: (token: string) => void;
    logout: () => void;
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
    //текущий пользователь
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const modalRef = useRef(null);

    //авторизирует пользователя
    const authUser = (token: string) => {
        const payload = token.split('.')[1];
        const data = JSON.parse(atob(payload));

        const currentUser: User = {
            token,
            login: data.login,
        };
        todoApi.setAuth(token);
        setCurrentUser(currentUser);
        setCookie('userToken', token, { secure: true, 'max-age': 86400 });
    };

    //деавторизирует пользователя
    const logout = () => {
        setCurrentUser(null);
        todoApi.setAuth('');
        deleteCookie('userToken');
    };

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
        currentUser,
        authUser,
        logout,
    };
};
