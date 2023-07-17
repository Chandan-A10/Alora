import axios from "axios";
import { toast } from "react-hot-toast";

export const getCategories = async(setcategories) => {
    try{
        const {data} = await axios.get(process.env.REACT_APP_API+"/api/v1/category/category")
        if(data?.success){
            setcategories(data?.categories)
        }
    }
    catch(err){
        console.log(err)
        toast.error('Something wrong with fetching category')
    }
};
