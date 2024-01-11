import Todo from './ToDo';

const ToDos = () => {
    const todos = [1, 1, 1, 1];
    return (
        <div>
            {todos.map((el) => (
                <Todo />
            ))}
        </div>
    );
};

export default ToDos;
