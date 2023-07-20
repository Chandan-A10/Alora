import React, { useEffect, useState } from "react";
import { getCategories } from "../../utils/getCaterogies";
import { Select } from "antd";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import svg from "../../images/addimg.svg";

const { Option } = Select;

const AddProducts = ({ setselected }) => {
  const [categories, setcategories] = useState([]);
  const [category, setcategory] = useState("");
  const [image1, setimage1] = useState("");
  const [image2, setimage2] = useState("");
  const [image3, setimage3] = useState("");
  const [image4, setimage4] = useState("");
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
    if (!name || !name.trim()) {
      return toast.error("Name cannot be blank");
    }
    if (!description || !description.trim()) {
      return toast.error("Description is required");
    }
    if (!price || !price.trim()) {
      return toast.error("Please set the product price");
    }
    if(price <1){
      return toast.error("Price cannot be less than 1$")
    }
    if (!quantity || !quantity.trim()) {
      return toast.error("Quantity is neccessary");
    }
    if(quantity<1){
      return toast.error("Quantity should not be less than 1")
    }
    if (!category) {
      return toast.error("Select Category");
    }
    if (!shipping) {
      return toast.error("Select shipping status");
    }
    if (!image1 || !image2 || !image3 || !image4) {
      return toast.error("You need to select atleast 4 images for your product.");
    }
    productData.append("name", name);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("quantity", quantity);
    productData.append("image1", image1, image1.name);
    productData.append("image2", image2, image2.name);
    productData.append("image3", image3, image3.name);
    productData.append("image4", image4, image4.name);
    productData.append("category", category);
    productData.append("shipping", shipping);
    if (e.target.value === "draft") {
      productData.append("isDraft", true);
    }
    try {
      console.log(user.token);
      const { data } = await axios.post(
        process.env.REACT_APP_API + "/api/v1/products/create-product",
        productData,
        {
          headers: {
            Authorization: user?.token,
          },
        }
      );
      if (data?.success) {
        toast.success("Product created succesfully");
        if (e.target.value === "draft") {
          setTimeout(() => {
            setselected("3");
          }, 1000);
        } else {
          setTimeout(() => {
            setselected("1");
          }, 1000);
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
        <div className="mb-3 text-center">
          <form action="/submit" method="post" encType="multipart/form-data">
            <label htmlFor="image1">
              <img
                className="m-2 addp"
                src={image1 ? URL.createObjectURL(image1) : svg}
                alt="..."
                width={200}
                style={{objectFit:'contain'}}
                height={150}
              />
            </label>
            <input
              type="file"
              id="image1"
              accept="image/*"
              onChange={(e) => setimage1(e.target.files[0])}
              name="image1"
              style={{ display: "none" }}
            />
            <label htmlFor="image2">
              <img
                className="m-2 addp"
                src={image2 ? URL.createObjectURL(image2) : svg}
                alt="..."
                width={200}
                style={{objectFit:'contain'}}
                height={150}
              />
            </label>
            <input
              type="file"
              id="image2"
              name="image2"
              onChange={(e) => setimage2(e.target.files[0])}
              accept="image/*"
              style={{ display: "none" }}
            />
            <label htmlFor="image3">
              <img
                className="m-2 addp"
                src={image3 ? URL.createObjectURL(image3) : svg}
                alt="..."
                width={200}
                style={{objectFit:'contain'}}
                height={150}
              />
            </label>
            <input
              type="file"
              id="image3"
              onChange={(e) => setimage3(e.target.files[0])}
              name="image3"
              accept="image/*"
              style={{ display: "none" }}
            />
            <label htmlFor="image4">
              <img
                className="m-2 addp"
                src={image4 ? URL.createObjectURL(image4) : svg}
                alt="..."
                width={200}
                style={{objectFit:'contain'}}
                height={150}
              />
            </label>
            <input
              type="file"
              id="image4"
              accept="image/*"
              onChange={(e) => setimage4(e.target.files[0])}
              name="image4"
              style={{ display: "none" }}
            />
          </form>
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
          <button
            className="btn btn-primary m-2"
            value="draft"
            onClick={handleCreate}
          >
            Draft Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
