import axios from "axios"
import { toast } from "react-hot-toast"

export const placeOrder =async(cart,payableAmount,token)=>{
    try{
        const {data} =await axios.post(process.env.REACT_APP_API + `/api/v1/cart/placeOrder`,{
            cart:cart,
            payedAmount:payableAmount,
        },{
            headers:{
                Authorization:token
            }
        })
        if(data.success){
            toast.success(data.message)
        }
        else{
            toast.error(data.message)
        }
    }
    catch(err){
        toast.error(err.message)
    }

}