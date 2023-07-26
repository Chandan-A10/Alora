import { toast } from "react-hot-toast"
import { placeOrderService } from "../services/orderServices"

export const placeOrder =async(cart,payableAmount,token)=>{
    try{
        const {data} =await placeOrderService(cart,payableAmount,token)
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