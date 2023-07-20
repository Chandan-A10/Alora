import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { getAllProducts } from "../../utils/getAllProducts";

const ProductModals = ({ name, ModalOpen, setModalOpen, id }) => {
  const [products, setproducts] = useState([]);
  const dateformatter = (timestamps) => {
    const dateobj = new Date(timestamps);
    return dateobj.toLocaleDateString();
  };
  const timeformatter = (timestamps) => {
    const dateobj = new Date(timestamps);
    return dateobj.toLocaleTimeString();
  };
  useEffect(() => {
    getAllProducts(setproducts);
  }, []);
  return (
    <div>
      <Modal
        title={name}
        open={ModalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        {products.length === 0 ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h5 style={{ opacity: 0.5 }}>
              <i>This merchant doesn't have any Products</i>
            </h5>
          </div>
        ) : (
          products.map((pro, idx) => {
            return (
              pro?.owner._id === id && (
                <div className="card mb-3" style={{ maxWidth: 540 }}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={
                          process.env.REACT_APP_API +
                          `/productimage/${pro?.image1}`
                        }
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{pro?.name}</h5>
                        <p className="card-text">{pro?.description}</p>
                        <p className="card-text">
                          <small className="text-body-secondary">
                            Last updated on {dateformatter(pro.updatedAt)} at{" "}
                            {timeformatter(pro.updatedAt)}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          })
        )}
      </Modal>
    </div>
  );
};

export default ProductModals;
