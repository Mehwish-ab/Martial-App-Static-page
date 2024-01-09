import { ErrorMessage, Field } from 'formik'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { DataTypesWithIdAndMultipleLangLabel } from '../../redux/features/types'
import { CustomCheckboxListStyled } from './styles'
import Errormsg from '../ErrorMessage'

export type CheckboxesListProps = {
    name: string
    label: string | JSX.Element
    showErrorMsgInList: boolean
    list: DataTypesWithIdAndMultipleLangLabel[]
    placeholder?: string
}

const CheckboxesList = ({
    name,
    label,
    list,
    showErrorMsgInList,
}: CheckboxesListProps): JSX.Element => {
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )

    return (
        <CustomCheckboxListStyled>
            {label && (
                <label htmlFor="" style={{ marginBottom: 7, display: 'block' }}>
                    {label}
                </label>
            )}
            <div className="checkboxes_row">
                {list.map((item: DataTypesWithIdAndMultipleLangLabel) => (
                    <div className="checkbox_col" key={item.id}>
                        <label className="d-flex align-items-center gap-3">
                            <Field
                                type="checkbox"
                                name={name}
                                value={item.id}
                            />
                            {(item as any)[selectedLanguage]}
                        </label>
                    </div>
                ))}
            </div>

            {showErrorMsgInList && (
                <ErrorMessage name={name} component={Errormsg} />
            )}
        </CustomCheckboxListStyled>
    )
}

export default CheckboxesList
