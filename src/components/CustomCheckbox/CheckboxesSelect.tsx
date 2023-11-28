import { Dropdown } from "antd";
import { ErrorMessage } from "formik";
import CheckboxesList, { CheckboxesListProps } from "./CheckboxesList";
import Errormsg from "../ErrorMessage";
import { CheckboxesSelectStyled, CheckboxSelectTriggerStyled } from "./styles";
import dropDownArrow from "../../assets/icons/ic_add_property_dropdown.svg";

const CheckboxesSelect = ({
  list,
  name,
  label,
  showErrorMsgInList,
}: CheckboxesListProps) => {
  return (
    <CheckboxesSelectStyled>
      <label htmlFor="" className="title" >
        {label}
      </label>
      <Dropdown
        overlay={
          <CheckboxesList
            label={""}
            name={name}
            list={list}
            showErrorMsgInList={false}
          />
        }
        overlayClassName="bg-white checkboxes-overlay"
        overlayStyle={{ border: "1px solid #d9d9d9", padding: 16 }}
        trigger={["click"]}
      >
        <CheckboxSelectTriggerStyled>
          <label htmlFor="">{label}</label>
          <img src={dropDownArrow} alt="" />
        </CheckboxSelectTriggerStyled>
      </Dropdown>
      <ErrorMessage name={name} component={Errormsg} />
    </CheckboxesSelectStyled>
  );
};

export default CheckboxesSelect;
