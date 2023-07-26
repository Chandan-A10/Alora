import "./style.css";
import { Container, Row, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Layout } from "./layout/layout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PayNow from "./ProductComps/PayNow";
import svg from "../images/cart.svg";
import { useSelector } from "react-redux";
import { message } from "antd";

export const Cart = () => {
  let subtotal = 0;
  const [paynow, setpaynow] = useState(false);
  const [cart, setcart] = useState([]);
  const user = useSelector((state) => state.data);
  const [tax, setTax] = useState(
    cart.length === 0 ? 0 : parseInt(Math.random() * 10)
  );

  useEffect(() => {
    setcart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const calculatesubtotal = (x) => {
    subtotal += x.product.price * x.quantity;
  };

  const handledecrement = (x) => {
    let cartdata = cart.cart;
    cartdata = cartdata.filter((el) => {
      if (el.product._id === x._id) {
        console.log(x);
        el.quantity = el.quantity - 1;
        return true;
      } else {
        return true;
      }
    });
    setcart({ ...cart, cart: cartdata });
    localStorage.setItem("cart", JSON.stringify(cart));
    setTax(parseInt(Math.random() * 10));
  };

  const handleincrement = (x) => {
    console.log("hello1");
    let cartdata = cart.cart;
    cartdata = cartdata.filter((el) => {
      if (el.product._id === x._id) {
        console.log(x);
        el.quantity = el.quantity + 1;
        return true;
      } else {
        return true;
      }
    });
    setcart({ ...cart, cart: cartdata });
    localStorage.setItem("cart", JSON.stringify(cart));
    setTax(parseInt(Math.random() * 10));
  };

  const handleRemove = (x) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let cartdata = cart?.cart;
    cartdata = cartdata.filter((el) => {
      return el.product._id !== x._id;
    });
    cart.cart = cartdata;
    localStorage.setItem("cart", JSON.stringify(cart));
    setcart(cart);
  };
  const handlepaynow = () => {
    if (user?.user?.address !== "") {
      setpaynow(true);
    } else {
      message.error("You need to update your address before purchasing");
    }
  };
  return (
    <Layout>
      <div className="productSlider mb-5 mt-5">
        <Container>
          <h1 className="text-left mb-4 ps-2" style={{ fontFamily: "cursive" }}>
            Cart List
          </h1>
          <Row>
            {cart.length === 0 ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "60vh" }}
              >
                <img alt="..." style={{ opacity: 0.5 }} src={svg}></img>
              </div>
            ) : (
              <div className="col-9 cartShow">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Item image</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">Price(each)</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cart.cart.map((x) => (
                        <TableRow
                          key={x.product.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          {calculatesubtotal(x)}
                          <TableCell component="th" scope="row">
                            {x.product.name}
                          </TableCell>
                          <TableCell align="center">{x.product.name}</TableCell>
                          <TableCell align="center">
                            {x.product.description}
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              disabled={x.quantity === 1}
                              onClick={() => handledecrement(x.product)}
                            >
                              -
                            </Button>
                            {" ."}
                            {x.quantity}
                            {". "}
                            <Button
                              disabled={x.quantity === x.product.quantity}
                              onClick={() => handleincrement(x.product)}
                            >
                              +
                            </Button>
                          </TableCell>
                          <TableCell align="right">
                            {x.product.price}$
                          </TableCell>
                          <TableCell align="right">
                            {x.quantity * x.product.price}$
                          </TableCell>
                          <TableCell align="right">
                            <Button onClick={() => handleRemove(x.product)}>
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            )}
            {cart.length !== 0 && (
              <div className="col-3 cartSum boxShadaw bg-light p-4">
                <h5 className="text-left mb-4 pb-2">Cart Price</h5>
                <div className="d-flex justify-content-between mb-3">
                  <h6 className="fw-normal">Tax :</h6>
                  <span>{tax}$</span>
                </div>
                <div className="d-flex justify-content-between mb-4">
                  <h6 className="fw-normal">SubTotal Price :</h6>
                  <span>{subtotal}$</span>
                </div>
                <div className="d-flex justify-content-between fw-bold">
                  <h6>Total Price :</h6>
                  <span>{subtotal + tax}$</span>
                </div>
                <Button
                  disabled={cart?.cart?.length!==0?false:true}
                  onClick={handlepaynow}
                  variant="dark"
                  size="md"
                  className="mt-4 w-100"
                >
                  pay now
                </Button>
              </div>
            )}
          </Row>
        </Container>
      </div>
      {paynow && (
        <PayNow
          setTax={setTax}
          setcart={setcart}
          setpaynow={setpaynow}
          paynow={paynow}
          totalprice={subtotal + tax}
        />
      )}
    </Layout>
  );
};
