import { toast } from "react-hot-toast";
import { createCategoryService } from "../services/categoryService";

export const createCategory = async (name, token, file) => {
  const formData=new FormData()
  formData.append("name",name)
  formData.append("image",file,file?.name)
  try {
    const { data } = await createCategoryService(formData,token)
    if (data?.success) {
      toast.success(data?.message);
    }
  } catch (err) {
    console.log(err);
    toast.error(err.message);
  }
};
