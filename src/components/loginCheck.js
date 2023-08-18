import Login from './login';
import UseToken from './useToken';

export default function IsLogin()
{

    const {token,setToken}=UseToken()
    if(!token ) {
        return <Login setToken={setToken} />
    }
}