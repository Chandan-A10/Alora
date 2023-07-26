import axios from "axios";

export const getCategoriesService = () =>
  axios.get(process.env.REACT_APP_API + "/api/v1/category/category");

export const createCategoryService = (formData, token) =>
  axios.post(
    process.env.REACT_APP_API + `/api/v1/category/create-category`,
    formData,
    {
      headers: {
        Authorization: token,
      },
    }
  );

export const deleteCategoryService = (id, token) =>
  axios.delete(
    process.env.REACT_APP_API + `/api/v1/category/delete-category/${id}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
