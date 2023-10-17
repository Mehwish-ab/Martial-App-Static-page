import { ErrorMessage, Field } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { DataTypesWithIdAndMultipleLangLabel } from "../../redux/features/types";
import { CustomCheckboxListStyled } from "./styles";

type CheckboxesListProps = {
  name: string;
  label: string;
  list: DataTypesWithIdAndMultipleLangLabel[];
};

const CheckboxesList = ({ name, label, list }: CheckboxesListProps) => {
  const { selectedLanguage } = useSelector(
    (state: RootState) => state.selectedLanguage
  );

  return (
    <CustomCheckboxListStyled>
      <div className="mt-20 pb-3" style={{ borderBottom: "1px solid #d9d9d9" }}>
        <label htmlFor="" style={{ marginBottom: 10, display: "block" }}>
          {label}
        </label>
        <div className="checkboxes_row">
          {list.map((item: DataTypesWithIdAndMultipleLangLabel) => (
            <div className="checkbox_col" key={item.id}>
              <label className="d-flex align-items-center gap-3">
                <Field type="checkbox" name={name} value={item.id} />
                {(item as any)[selectedLanguage]}
              </label>
            </div>
          ))}
        </div>

        <ErrorMessage name={name}>
          {(msg) => (
            <div className="invalid-activity error-message is-invalid">
              {msg}
            </div>
          )}
        </ErrorMessage>
      </div>
    </CustomCheckboxListStyled>
  );
};

export default CheckboxesList;
