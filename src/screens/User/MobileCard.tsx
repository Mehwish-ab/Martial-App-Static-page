import deleteIcon from "../../assets/icons/ic_delete.svg";
import editIcon from "../../assets/icons/ic_edit.svg";
import { TableCardStyle } from "./style";

const MobileTable = () => {
  return (
    <TableCardStyle>
      <div className=" plus-icon d-md-none">
        {/* <img src={addIcon} onClick={() => console.log("")} alt="add-icon" /> */}
      </div>
      <div className="inner-section container">
        <div className="card">
          <div className="name-section d-flex justify-content-between">
            <p className="name"></p>name
            <p className="id">name</p>
          </div>

          <p className="details">name</p>
          <p className="details-1">OC12 Aqueous Room AW Sump/ P-trap Decon</p>
          <div className="price-section d-flex justify-content-between">
            <p className="price">$20.00</p>
            <p className="date">name</p>
          </div>
          <div className="actions-section d-flex justify-content-between">
            <div className="d-flex warn-actions">
              <div style={{ display: "flex", gap: "4px" }}>
                <img
                  src={deleteIcon}
                  alt="delete Icon"
                  className="action_icons deleteicon"
                />
                <img
                  src={editIcon}
                  alt="edit Icon"
                  className="action_icons editicon"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </TableCardStyle>
  );
};

export default MobileTable;
