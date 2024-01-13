import Typography from '@mui/material/Typography';
import cl from './index.module.scss';
import { Button, Paper, TextField } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import userApi from '../../../api/UserApi';
import { User } from '../../../models/User/types';
import { useAppContext } from '../../../contexts/AppContext/AppContext';

interface LoginFormValidate {
    loginErr: string;
    password: string;
    server: string;
}

const loginFormValidateInitial: LoginFormValidate = {
    loginErr: '',
    password: '',
    server: '',
};

const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<LoginFormValidate>(loginFormValidateInitial);
    const [isLoading, setIsLoading] = useState(false);
    const { authUser } = useAppContext();

    const handleClick = async () => {
        let success = true;

        const newValid = {
            loginErr: '',
            password: '',
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

        if (!success) {
            setError(newValid);
            return;
        }

        setIsLoading(true);

        const res = await userApi.authUser(login, password);

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
                Авторизация
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
                type="password"
                autoComplete="current-password"
                className={cl.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error.server.length > 0 && (
                <Typography variant="subtitle2" component="p" className={cl.error}>
                    {error.server}
                </Typography>
            )}
            <Button variant="contained" fullWidth className={cl.button} onClick={handleClick}>
                {isLoading ? 'Авторизирую...' : 'Войти'}
            </Button>
            <Link to="/register" className={cl.link}>
                Ещё не с нами? Загерестрируйся
            </Link>
        </Paper>
    );
};

export default LoginForm;
