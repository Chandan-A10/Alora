import React, { useEffect, useState } from "react";
import { getAllOrders } from "../../utils/getAllOrders";
import { useSelector } from "react-redux";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
} from "mdb-react-ui-kit";

const VproductPending = () => {
  const [orders, setorders] = useState([]);
  const user = useSelector((state) => state?.data);
  const dateformatter = (timestamps) => {
    const dateobj = new Date(timestamps);
    return dateobj.toLocaleDateString();
  };
  const timeformatter = (timestamps) => {
    const dateobj = new Date(timestamps);
    return dateobj.toLocaleTimeString();
  };
  useEffect(() => {
    getAllOrders(user?.token, setorders);
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      {orders.length === 0 ? (
        <div
          style={{
            minHeight: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ opacity: "0.5" }}>
            All Order from your product will show up here
          </h1>
        </div>
      ) : (
        <>
          <MDBContainer fluid>
            {orders.map(
              (order, idx) =>
                order?.productOwner?.email === user?.user?.email && order?.status!=="pending" && (
                  <MDBRow className="justify-content-left mb-0">
                    <MDBCol md="12" xl="11">
                      <MDBCard className="shadow-0 border rounded-3 mt-2 mb-3">
                        <MDBCardBody>
                          <MDBRow>
                            <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                              <img
                              alt="..."
                                src={
                                  process.env.REACT_APP_API +
                                  `/productimage/${order?.productBought?.image1}`
                                }
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
                                  • Buyer :{" "}
                                </span>
                                <span>
                                  {order?.user?.name}
                                  <br />
                                </span>
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
                            </MDBCol>
                            <MDBCol
                              md="6"
                              lg="3"
                              className="border-sm-start-none border-start"
                            >
                              <div className="d-flex flex-column align-items-right mb-1">
                                <h4 className="mb-1 me-1">
                                  ${order.productBought.price * order.quantity}
                                </h4>
                                <span>
                                  <b>Quantity : {order.quantity}</b>
                                </span>
                              </div>
                              <h6
                                className={
                                  order.status === "pending"
                                    ? "text-danger"
                                    : "text-success"
                                }
                              >
                                Status : {order.status}
                              </h6>
                              <div className="d-flex flex-column mt-4">
                                <i style={{ color: "grey" }}>
                                  This order was {order?.status} on
                                </i>
                                {dateformatter(order?.updatedAt)} at{" "}
                                {timeformatter(order?.updatedAt)}
                              </div>
                            </MDBCol>
                          </MDBRow>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                )
            )}
          </MDBContainer>
        </>
      )}
    </div>
  );
};

export default VproductPending;
