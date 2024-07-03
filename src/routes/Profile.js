import { authService } from "fbase";
import { signOut } from "firebase/auth";

const Profile = () => {
    const onLogoutClick = () => signOut(authService);

    return (
        <>
            <button onClick={onLogoutClick}>Log out</button>
        </>
    )
}

export default Profile;