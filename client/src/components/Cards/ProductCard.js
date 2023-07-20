import React, { useState } from "react";
import DeleteConfir from "../ConfirmationModals/DeleteConfir";
import SellerInfo from "../ConfirmationModals/SellerInfo";
import { Button } from "@mui/material";
import OutofStock from "../ConfirmationModals/Out of Stock";
import InStockmarked from "../ConfirmationModals/InStock";

const ProductCard = ({ product, setflag, draft, isAdmin }) => {
  const [stock, setstock] = useState(false);
  const [instock, setinstock] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);
  const dateformatter = (timestamps) => {
    const dateobj = new Date(timestamps);
    return dateobj.toLocaleDateString();
  };
  const timeformatter = (timestamps) => {
    const dateobj = new Date(timestamps);
    return dateobj.toLocaleTimeString();
  };
  return (
    <div>
      <br />
      <div className="card mb-2 pcard" style={{ marginRight: "30px" }}>
        <div className="row g-0">
          <div className="col-md-4 mt-3">
            <img
              src={
                process.env.REACT_APP_API + `/productimage/${product?.image1}`
              }
              style={{ objectFit: "contain" }}
              className="img-fluid"
              alt="..."
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">
                {product.description}
                <br />
                Price : ${product.price}
                <br />
                quantity:{product.quantity}
              </p>
              <p className="card-text">
                <small className="text-body-secondary">
                  Created on {dateformatter(product.createdAt)} at{" "}
                  {timeformatter(product.createdAt)}
                </small>
              </p>
            </div>
          </div>
          <div className="col-md-2">
            <div className="card-body">
              {draft || isAdmin ? <></> : (
                <Button
                  disabled={product.quantity === 0 ? true : false}
                  onClick={() => setstock(true)}
                  className="mb-2 w-100"
                  variant="outlined"
                  color="error"
                >
                  Out of stock
                </Button>
              )}
              { product.quantity === 0 && (
                <Button
                  onClick={() => setinstock(true)}
                  className="mb-2 w-100"
                  variant="outlined"
                  color="error"
                >
                  Add quantity
                </Button>
              )}
              {isAdmin && (
                <>
                  <button
                    className="btn btn-primary mb-2 w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    Seller info...
                  </button>
                  <SellerInfo owner={product.owner} />
                </>
              )}
              {ModalOpen && (
                <DeleteConfir
                  setflag={setflag}
                  ModalOpen={ModalOpen}
                  product={product}
                  setModalOpen={setModalOpen}
                />
              )}
              {stock && (
                <OutofStock
                  setflag={setflag}
                  ModalOpen={stock}
                  product={product}
                  setModalOpen={setstock}
                />
              )}
              {instock && (
                <InStockmarked
                  setflag={setflag}
                  ModalOpen={instock}
                  product={product}
                  setModalOpen={setinstock}
                />
              )}
              <button
                className="btn btn-danger w-100"
                onClick={() => setModalOpen(true)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
