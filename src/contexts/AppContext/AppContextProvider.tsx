import { AppContext, useCreateAppContext } from './AppContext';

const AppContextProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
    const context = useCreateAppContext();
    return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
