import { toast } from "react-hot-toast";
import { getCategoriesService } from "../services/categoryService";

export const getCategories = async (setcategories) => {
  try {
    const { data } = await getCategoriesService();
    if (data?.success) {
      setcategories(data?.categories);
    }
  } catch (err) {
    console.log(err);
    toast.error("Something wrong with fetching category");
  }
};
