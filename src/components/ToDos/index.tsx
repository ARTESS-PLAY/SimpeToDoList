import { useToDoContext } from '../../contexts/ToDoContext/ToDoContext';
import Todo from './ToDo';
import cl from './index.module.scss';

const ToDos = () => {
    const { todos } = useToDoContext();
    return (
        <div className={cl.todos}>
            {todos.length > 0 ? (
                todos.map((el) => <Todo key={el.id} todo={el} />)
            ) : (
                <p>Задач пока нет. Создайте новую!</p>
            )}
        </div>
    );
};

export default ToDos;
