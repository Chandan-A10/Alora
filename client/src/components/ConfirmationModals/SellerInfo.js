import { Avatar } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
const SellerInfo = ({ owner }) => {
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Seller Information
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body d-flex gap-4">
            <Avatar style={{display:"flex",alignItems:'center',justifyContent:'center'}} icon={<img alt="..." src={process.env.REACT_APP_API+`/userimages/${owner?.photo}`}></img> || <UserOutlined/>} size={100}></Avatar>
            <div className="m-2">
              <table>
                <tr>
                  <td className="form-label">Name </td>
                  <td className="info"><span className="form-label">:</span> {owner.name}</td>
                </tr>
                <tr>
                  <td className="form-label">Email </td>
                  <td className="info"><span className="form-label">:</span> {owner.email}</td>
                </tr>
                <tr>
                  <td className="form-label">Phone </td>
                  <td>
                  <span className="form-label">: </span>
                    {owner.phone || (
                      <span className="form-label">not available</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="form-label">Address </td>
                  <td>
                  <span className="form-label">: </span>
                    {owner.address || (
                      <span className="form-label">not available</span>
                    )}
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;
