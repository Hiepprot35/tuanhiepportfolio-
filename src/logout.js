import UseToken from './useToken';

export default function LogOut() {
    const   {deleteToken}=UseToken()
    return (
        <div className="LogoutElement">
            <button onClick={deleteToken} >
                LogOut
            </button>
        </div>
        
    )
}