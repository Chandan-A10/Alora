import React, { useState } from "react";
import image from "../../images/books.jpg";
import DeleteConfir from "../ConfirmationModals/DeleteConfir";
import SellerInfo from "../ConfirmationModals/SellerInfo";

const ProductCard = ({ product, setflag, draft, isAdmin }) => {
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
              src={process.env.REACT_APP_API+`/productimage/${product?.image1}`}
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
              {draft || isAdmin ? (
                <button className="btn btn-primary mb-2 w-100">Edit</button>
              ) : (
                <button className="btn btn-danger mb-2 w-100">Disable</button>
              )}
              {isAdmin && (
                <>
                <button className="btn btn-primary mb-2 w-100" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  Seller info...
                </button>
                <SellerInfo owner={product.owner}/>
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
