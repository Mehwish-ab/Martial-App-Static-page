import { Dropdown } from 'antd'
import { ErrorMessage } from 'formik'
import CheckboxesList, { CheckboxesListProps } from './CheckboxesList'
import Errormsg from '../ErrorMessage'
import { CheckboxesSelectStyled, CheckboxSelectTriggerStyled } from './styles'
import dropDownArrow from '../../assets/icons/ic_add_property_dropdown.svg'

const CheckboxesSelect = ({
    list,
    name,
    label,
    placeholder,
}: CheckboxesListProps): JSX.Element => {
    return (
        <CheckboxesSelectStyled>
            <label htmlFor="" className="title">
                {label}
            </label>
            <Dropdown
                overlay={
                    <CheckboxesList
                        label={''}
                        name={name}
                        list={list}
                        showErrorMsgInList={false}
                    />
                }
                overlayClassName="bg-white checkboxes-overlay"
                overlayStyle={{
                    border: '1px solid #d9d9d9',
                    padding: 16,
                    zIndex: 9999,
                    top: 100,
                }}
                trigger={['click']}
            >
                <CheckboxSelectTriggerStyled>
                    <label htmlFor="">{placeholder ?? label}</label>
                    <img src={dropDownArrow} alt="" height={7} width={12} />
                </CheckboxSelectTriggerStyled>
            </Dropdown>
            <ErrorMessage name={name} component={Errormsg} />
        </CheckboxesSelectStyled>
    )
}

export default CheckboxesSelect
