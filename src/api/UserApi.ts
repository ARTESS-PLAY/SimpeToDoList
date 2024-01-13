import axios from 'axios';

class UserApi {
    private slug = 'http://localhost:3005/api/user';

    public registerUser = async (login: string, password: string) => {
        const res = await axios
            .post(`${this.slug}/create`, {
                login,
                password,
            })
            .then((res) => res.data)
            .catch((e) => console.log(e));
        return res;
    };

    public authUser = async (login: string, password: string) => {
        const res = await axios
            .post(`${this.slug}/auth`, {
                login,
                password,
            })
            .then((res) => res.data)
            .catch((e) => console.log(e));
        console.log(res);

        return res;
    };
}

const userApi = new UserApi();

export default userApi;
