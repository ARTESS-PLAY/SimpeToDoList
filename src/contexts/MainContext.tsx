import AppContextProvider from './AppContext/AppContextProvider';
import ToDoContextProvider from './ToDoContext/ToDoContextProvider';

const MainContext = ({ children }: { children: JSX.Element }): JSX.Element => {
    return (
        <AppContextProvider>
            <ToDoContextProvider>{children}</ToDoContextProvider>
        </AppContextProvider>
    );
};

export default MainContext;
