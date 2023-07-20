import React from "react";
import { MDBCol, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Carousel } from "react-bootstrap";
const VertProdCard = ({ product, name }) => {
  const user = useSelector((state) => state?.data);
  const AddtoCart = () => {
    let cart = localStorage.getItem("cart") || {};
    if (Object.keys(cart).length === 0) {
      const obj = {
        customer: user?.user?.email,
        cart: [{ product: product, quantity: 1 }],
      };
      localStorage.setItem("cart", JSON.stringify(obj));
    } else {
      cart = JSON.parse(cart);
      let cartdata = cart.cart;
      const index = cartdata.findIndex(
        (ele) => ele.product?._id === product._id
      );
      console.log(index);
      if (index === -1) {
        cartdata.push({ product: product, quantity: 1 });
        cart.cart = cartdata;
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        cartdata = cartdata.map((x) => {
          if (x.product._id === product._id) {
            x.quantity++;
          }
          return x;
        });
        cart.cart = cartdata;
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }
    toast.success("Added to Cart");
  };
  return (
    <MDBCol md="12" lg="4" className="mb-4 mb-lg-0">
      <MDBCard>
        <div className="d-flex justify-content-between p-3">
          <p className="lead mb-0">Today's Combo Offer</p>
          <div
            className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
            style={{ width: "35px", height: "35px" }}
          >
            <p className="text-white mb-0 small">x4</p>
          </div>
        </div>
            <Carousel>
            <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={
                    process.env.REACT_APP_API +
                    `/productimage/${product?.image4}`
                  }
                  alt="1st slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={
                    process.env.REACT_APP_API +
                    `/productimage/${product?.image2}`
                  }
                  style={{overflow:"scroll"}}
                  alt="2nd slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={
                    process.env.REACT_APP_API +
                    `/productimage/${product?.image3}`
                  }
                  alt="3rd slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={
                    process.env.REACT_APP_API +
                    `/productimage/${product?.image1}`
                  }
                  alt="4th slide"
                />
              </Carousel.Item>
            </Carousel>
        <MDBCardBody>
          <div className="d-flex justify-content-between">
            <p className="small">
              <a href="#!" className="text-muted">
                {name}
              </a>
            </p>
            <p className="small text-danger">
              <s>${product.price + parseInt(Math.random() * 100)}</s>
            </p>
          </div>

          <div className="d-flex justify-content-between mb-3">
            <h5 className="mb-0">{product.name}</h5>
            <h5 className="text-dark mb-0">${product.price}</h5>
          </div>

          <div class="d-flex flex-column justify-content-between mb-2">
            <p class="text-muted mb-0">{product.description}</p>
            <p class="text-muted mb-0">
              Available: <span class="fw-bold">{product.quantity}</span>
            </p>
            <div class="ms-auto text-warning">
              {product.quantity !==0 &&<Button onClick={AddtoCart} variant="contained">
                Add to Cart
              </Button>}
              {product.quantity === 0 && <p style={{color:'red',opacity:0.8}}>out of stock</p>}
            </div>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default VertProdCard;
