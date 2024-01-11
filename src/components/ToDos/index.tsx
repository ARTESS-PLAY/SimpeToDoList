import { useToDoContext } from '../../contexts/ToDoContext/ToDoContext';
import Todo from './ToDo';

const ToDos = () => {
    const { todos } = useToDoContext();
    return (
        <div>
            {todos.length > 0 ? (
                todos.map((el) => <Todo key={el.id} todo={el} />)
            ) : (
                <p>Задач пока нет. Создайте новую!</p>
            )}
        </div>
    );
};

export default ToDos;
