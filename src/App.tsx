import { useEffect } from 'react';
import Header from './components/Header';
import ToDos from './components/ToDos';
import Modal from './components/Modal';
import { CSSTransition } from 'react-transition-group';
import { useAppContext } from './contexts/AppContext/AppContext';
import todoApi from './api/TodoApi';
import { useToDoContext } from './contexts/ToDoContext/ToDoContext';
import { convertTodoFromBackend } from './models/Todo/utils';

function App() {
    const { modalRef, isModalOpen } = useAppContext();
    const { addToDos } = useToDoContext();

    useEffect(() => {
        const fetch = async () => {
            const todos = await todoApi.getTodos();
            if (todos) {
                const newTodos = todos.map((el) => convertTodoFromBackend(el));
                addToDos(newTodos);
            }
        };
        fetch();
    }, []);

    return (
        <div className="App">
            <Header />
            <div className="container">
                <ToDos />

                <CSSTransition
                    nodeRef={modalRef}
                    in={isModalOpen}
                    timeout={300}
                    classNames="fade"
                    unmountOnExit>
                    <Modal />
                </CSSTransition>
            </div>
        </div>
    );
}

export default App;
