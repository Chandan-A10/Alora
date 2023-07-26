import { toast } from "react-hot-toast";
import { deleteProductService } from "../services/productService";
export const deleteProduct = async (id,token) => {
  try {
    const { data } = await deleteProductService(id,token)
    if (data?.success) {
      toast.success(data?.message);
    }
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong with fetching your products");
  }
};
