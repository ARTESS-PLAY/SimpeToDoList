import { ToDoContext, useCreateToDoContext } from './ToDoContext';

const ToDoContextProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
    const context = useCreateToDoContext();
    return <ToDoContext.Provider value={context}>{children}</ToDoContext.Provider>;
};

export default ToDoContextProvider;
