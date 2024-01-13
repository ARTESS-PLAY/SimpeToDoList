import Typography from '@mui/material/Typography';
import cl from './index.module.scss';
import { Button, Paper, TextField } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import userApi from '../../../api/UserApi';
import { useAppContext } from '../../../contexts/AppContext/AppContext';

interface RegisterFormValidate {
    loginErr: string;
    password: string;
    password2: string;
    server: string;
}

const registerFormValidateInitial: RegisterFormValidate = {
    loginErr: '',
    password: '',
    password2: '',
    server: '',
};

const RegisterForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState<RegisterFormValidate>(registerFormValidateInitial);
    const [isLoading, setIsLoading] = useState(false);
    const { authUser } = useAppContext();

    const handleClick = async () => {
        let success = true;

        const newValid = {
            loginErr: '',
            password: '',
            password2: '',
            server: '',
        };

        if (login.length < 1) {
            newValid.loginErr = 'Логин не может быть пустым';
            success = false;
        }
        if (password.length < 1) {
            newValid.password = 'Пароль не может быть пустым';
            success = false;
        }
        if (password2.length < 1) {
            newValid.password2 = 'Пароль не может быть пустым';
            success = false;
        }
        if (password2 !== password) {
            newValid.password2 = 'Пароль не совпадают';
            success = false;
        }

        if (!success) {
            setError(newValid);
            return;
        }

        setIsLoading(true);

        const res = await userApi.registerUser(login, password);

        if (!res.success) {
            newValid.server = res.msg;
            setIsLoading(false);
            setError(newValid);
            return;
        }

        const token: string = res.token;
        authUser(token);

        setIsLoading(false);
        setError(newValid);
    };

    return (
        <Paper className={cl.modal}>
            <Typography variant="h4" component="p" className={cl.title}>
                Регистрация
            </Typography>
            <TextField
                error={error.loginErr.length > 0}
                helperText={error.loginErr}
                label="Логин"
                variant="outlined"
                className={cl.input}
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />
            <TextField
                error={error.password.length > 0}
                helperText={error.password}
                label="Пароль"
                variant="outlined"
                className={cl.input}
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
                error={error.password2.length > 0}
                helperText={error.password2}
                label="Повторите пароль"
                variant="outlined"
                type="password"
                autoComplete="new-password"
                className={cl.input}
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
            />
            {error.server.length > 0 && (
                <Typography variant="subtitle2" component="p" className={cl.error}>
                    {error.server}
                </Typography>
            )}
            <Button variant="contained" fullWidth className={cl.button} onClick={handleClick}>
                {isLoading ? 'Регестрирую...' : 'Присоединиться'}
            </Button>
            <Link to="/login" className={cl.link}>
                Уже с нами? Войти
            </Link>
        </Paper>
    );
};

export default RegisterForm;
