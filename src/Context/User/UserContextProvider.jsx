import { useEffect, useState } from "react"
import UserContext from "./UserContext"

const UserContextProvider = ({children})=>{
    const [userList,setUserList] =useState([]);
    const initialCurrentUser = JSON.parse(localStorage.getItem('currentUser')) || '';
    const [currentUser,setCurrentUser] = useState(initialCurrentUser);

    useEffect(() => {
        // Update local storage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }, [currentUser]);
    return (
        <UserContext.Provider value={{currentUser,setCurrentUser,userList,setUserList}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider