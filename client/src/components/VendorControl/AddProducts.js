import React, { useEffect, useState } from "react";
import { getCategories } from "../../utils/getCaterogies";
import { Select } from "antd";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";

const { Option } = Select;

const AddProducts = ({setselected}) => {
  const [categories, setcategories] = useState([]);
  const [category, setcategory] = useState("");
  const [photo, setphoto] = useState("");
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [quantity, setquantity] = useState("");
  const [shipping, setshipping] = useState("");
  const user = useSelector((state) => state.data);
  useEffect(() => {
    getCategories(setcategories);
  }, []);
  const handleCreate = async (e) => {
    e.preventDefault();
    const productData = new FormData();
    productData.append("name", name);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("quantity", quantity);
    productData.append("photo", photo);
    productData.append("category", category);
    productData.append("shipping", shipping);
    if(e.target.value === "draft"){
      productData.append("isDraft",true)
    }
    try {
        console.log(user.token)
      const { data } = await axios.post(
        process.env.REACT_APP_API + "/api/v1/products/create-product",productData,{
            headers:{
                Authorization:user?.token
            }
        }
      );
      if (data?.success) {
        toast.success("Product created succesfully");
        if(e.target.value==="draft"){
          setTimeout(()=>{
            setselected("3")
          },1000)
        }
        else{
          setTimeout(()=>{
            setselected("2")
          },1000)
        }
      } else {
        toast.error("Error while adding product");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
  return (
    <div>
      {console.log(categories)}
      <div className="m-1">
        <Select
          bordered={false}
          placeholder="Select categories"
          size="large"
          showSearch
          className="form-select mb-3"
          onChange={(value) => {
            setcategory(value);
          }}
        >
          {categories?.map((cat) => {
            console.log(cat);
            return (
              <Option key={cat._id} value={cat._id}>
                {cat.name}
              </Option>
            );
          })}
        </Select>
        <div className="mb-3">
          <label className="btn btn-outline-secondary col-md-12">
            {photo ? photo.name : "Upload images for your Product"}
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={(e) => setphoto(e.target.files[0])}
              hidden
            />
          </label>
        </div>
        <div className="mb-3 text-center">
          {photo && (
            <div>
              <img
                src={URL.createObjectURL(photo)}
                alt="product"
                height={200}
                className="img img-responsive"
              ></img>
            </div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={name}
            placeholder="Enter product name"
            className="form-control"
            onChange={(e) => {
              setname(e.target.value);
            }}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            value={description}
            placeholder="Enter product description"
            className="form-control"
            onChange={(e) => {
              setdescription(e.target.value);
            }}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            value={price}
            placeholder="Enter product price"
            className="form-control"
            onChange={(e) => {
              setprice(e.target.value);
            }}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            value={quantity}
            placeholder="Enter product quantity"
            className="form-control"
            onChange={(e) => {
              setquantity(e.target.value);
            }}
            required
          />
        </div>
        <div className="mb-3">
          <Select
            bordered={false}
            placeholder="Select shipping status"
            size="large"
            showSearch
            className="form-select mb-3"
            onChange={(value) => {
              setshipping(value);
            }}
          >
            <Option value="0">No</Option>
            <Option value="1">Yes</Option>
          </Select>
        </div>
        <div className="mb-3">
          <button className="btn btn-danger" onClick={handleCreate}>
            Publish Product
          </button>
          <button className="btn btn-primary m-2" value="draft" onClick={handleCreate}>
            Draft Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
