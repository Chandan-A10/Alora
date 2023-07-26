import { toast } from "react-hot-toast";
import { deleteCategoryService } from "../services/categoryService";

export const delCat = async(id,token) => {
    try {
        const { data } = await deleteCategoryService(id,token)
        if (data?.success) {
          toast.success(data?.message);
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong while deleting");
      }
};
