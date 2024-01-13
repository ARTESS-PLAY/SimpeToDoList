import { useToDoContext } from '../../contexts/ToDoContext/ToDoContext';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button, Typography } from '@mui/material';
import { useAppContext } from '../../contexts/AppContext/AppContext';
import Todo from './ToDo';
import cl from './index.module.scss';

const ToDos = () => {
    const { todos, isFirtsRender } = useToDoContext();
    const { modalOpenCreate } = useAppContext();

    return (
        <div className={cl.todos}>
            <Button variant="contained" onClick={modalOpenCreate} className={cl.todos__button}>
                <AddCircleOutlineOutlinedIcon /> Добавить
            </Button>

            {todos.length > 0 ? (
                todos.map((el) => <Todo key={el.id} todo={el} />)
            ) : (
                <Typography variant="h3" component="p" className={cl.notFound}>
                    {isFirtsRender ? 'Загружаю...' : 'Задач пока нет. Создайте новую!'}
                </Typography>
            )}
        </div>
    );
};

export default ToDos;
