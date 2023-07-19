import React, { useEffect, useState } from "react";
import { getUserOrders } from "../../utils/getUserOrders";
import { useSelector } from "react-redux";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Button } from "@mui/material";
import CancelOrderConfo from "../ConfirmationModals/CancelOrder";

const PendingOrders = () => {
  const [cancel, setcancel] = useState(false);
  const [id, setid] = useState("");
  const [flag, setflag] = useState(true);
  const [orders, setorders] = useState([]);
  const user = useSelector((state) => state?.data);
  useEffect(() => {
    getUserOrders(user?.token, setorders);
    //eslint-disable-next-line
  }, [flag]);
  const dateformatter = (timestamps) => {
    const dateobj = new Date(timestamps);
    return dateobj.toLocaleDateString();
  };
  const timeformatter = (timestamps) => {
    const dateobj = new Date(timestamps);
    return dateobj.toLocaleTimeString();
  };
  const cancelOrder = (timestamps) => {
    const dateobj = new Date(timestamps);
    const timestam = dateobj.getDate();
    const date = new Date();
    if (date.getDate() - timestam > 1) {
      return true;
    }
    return false;
  };
  const handleCancel = (orderid) => {
    setid(orderid);
    setcancel(true)
  };
  return (
    <div>
      {orders.length === 0 ? (
        <h1>No Pending orders</h1>
        ) : (
          <>
          {console.log(orders)}
          <MDBContainer fluid={true}>
            {orders.map(
              (order, idx) =>
                order?.user?.name === user?.user?.name && 
                  <MDBRow key={idx} className="justify-content-left mb-0">
                    <MDBCol md="12" xl="11">
                      <MDBCard className="shadow-0 border rounded-3 mt-2 mb-3">
                        <MDBCardBody>
                          <MDBRow>
                            <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                              <img
                                src={process.env.REACT_APP_API+`/productimage/${order?.productBought?.image1}`}
                                fluid
                                className="w-100"
                              />
                              <a href="#!">
                                <div
                                  className="mask"
                                  style={{
                                    backgroundColor:
                                      "rgba(251, 251, 251, 0.15)",
                                  }}
                                ></div>
                              </a>
                            </MDBCol>
                            <MDBCol md="6">
                              <h5>Order ID : {order?._id}</h5>
                              <div className="d-flex flex-row">
                                <div className="text-danger mb-1 me-2">
                                  <MDBIcon fas icon="star" />
                                  <MDBIcon fas icon="star" />
                                  <MDBIcon fas icon="star" />
                                  <MDBIcon fas icon="star" />
                                </div>
                              </div>
                              <div className="mt-1 mb-0 text-muted small">
                                <h5>{order?.productBought?.name}</h5>
                                <br />
                                <span className="text-primary">
                                  {" "}
                                  • Seller :{" "}
                                </span>
                                <span>{order?.productOwner?.name}</span>
                                <br />
                                <span className="text-primary">
                                  {" "}
                                  • Price (1 unit) :{" "}
                                </span>
                                <span>
                                  {" "}
                                  <b>${order?.productBought?.price}</b>
                                </span>
                              </div>
                              <p className="text-truncate mb-4 mb-md-0">
                                {order?.productBought?.description}
                              </p>
                              <p>
                                <i style={{ color: "grey" }}>
                                  This product was purchased on
                                </i>{" "}
                                {dateformatter(order?.createdAt)} at{" "}
                                {timeformatter(order?.createdAt)}
                              </p>
                            </MDBCol>
                            <MDBCol
                              md="6"
                              lg="3"
                              className="border-sm-start-none border-start"
                            >
                              <div className="d-flex flex-column align-items-right mb-1">
                                <h4 className="mb-1 me-1">
                                  ${order?.productBought?.price * order?.quantity}
                                </h4>
                                <span>
                                  <b>Quantity Purchased : {order?.quantity}</b>
                                </span>
                              </div>
                              <h6
                                className={
                                  order.status !== "delivered"
                                    ? "text-danger"
                                    : "text-success"
                                }
                              >
                                Status : {order?.status}
                              </h6>
                              <div className="d-flex flex-column mt-4">
                                <Button
                                  variant="contained"
                                  color="error"
                                  size="sm"
                                  className="mt-2"
                                  onClick={() => handleCancel(order?._id)}
                                  disabled={
                                    order?.status === "cancelled" ||
                                    cancelOrder(order?.createdAt)
                                  }
                                >
                                  Cancel Order
                                </Button>
                                {order.status === "cancelled" && (
                                  <>
                                    <i style={{ color: "grey" }}>
                                      This order was cancelled on
                                    </i>
                                    {dateformatter(order?.updatedAt)} at{" "}
                                    {timeformatter(order?.updatedAt)}
                                  </>
                                )}
                              </div>
                              {cancel && (
                                <CancelOrderConfo
                                  id={id}
                                  setflag={setflag}
                                  ModalOpen={cancel}
                                  setModalOpen={setcancel}
                                />
                              )}
                            </MDBCol>
                          </MDBRow>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                )
            }
          </MDBContainer>
          {console.log(orders)}
        </>
      )}
    </div>
  );
};

export default PendingOrders;
