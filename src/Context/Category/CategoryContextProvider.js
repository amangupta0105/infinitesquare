import { useState } from "react";
import CategoryContext from "./CategoryContext"
import { useNavigate } from "react-router-dom";

const CategoryContextProvider = ({children})=>{
    const [category,setCategory] = useState();
    const [countCart,setcountCart] = useState(0);
    const [searchQuery,setsearchQuery] =useState("");
    const navigate = useNavigate('');
    return (
        <CategoryContext.Provider value={{category,setCategory,navigate,countCart,setcountCart,searchQuery,setsearchQuery}}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryContextProvider;