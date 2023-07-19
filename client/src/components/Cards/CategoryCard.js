import React, { useState } from "react";
import image from "../../images/books.jpg";
import DeleteCategory from "../ConfirmationModals/DeleteCategory";

const CategoryCard = ({ category, setflag}) => {
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
          <div className="col-md-4 mt-3 d-flex justify-content-center">
            <img
              src={process.env.REACT_APP_API+`/categoryimages/${category?.image}` || image}
              style={{ objectFit: "contain" }}
              className="img-fluid"
              alt="..."
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h5 className="card-title">{category.name}</h5>
              <p className="card-text">
                <small className="text-body-secondary">
                  Created on {dateformatter(category.createdAt)} at{" "}
                  {timeformatter(category.createdAt)}
                </small>
              </p>
            </div>
          </div>
          <div className="col-md-2">
            <div className="card-body">
            <button className="btn btn-primary mb-2 w-100">Edit</button>
              {ModalOpen && (
                <DeleteCategory
                  setflag={setflag}
                  ModalOpen={ModalOpen}
                  category={category}
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

export default CategoryCard;
