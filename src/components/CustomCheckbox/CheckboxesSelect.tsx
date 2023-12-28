import { Dropdown } from 'antd'
import { ErrorMessage, useFormikContext } from 'formik'
import CheckboxesList, { CheckboxesListProps } from './CheckboxesList'
import Errormsg from '../ErrorMessage'
import { CheckboxesSelectStyled, CheckboxSelectTriggerStyled } from './styles'
import dropDownArrow from '../../assets/icons/ic_add_property_dropdown.svg'
import {
    // ReactElement,
    // JSXElementConstructor,
    // ReactNode,
    // ReactPortal,
    Key,
} from 'react'

const CheckboxesSelect = ({
    list,
    name,
    label,
}: CheckboxesListProps): JSX.Element => {
    const { values }: any = useFormikContext()

    const selectedItems = values[name] || []

    const renderSelectedItems = (): any => {
        if (selectedItems.length === 0) {
            return 'Select options'
        }

        return selectedItems.map(
            (selectedItem: any, index: Key | null | undefined) => (
                <span key={index}>{selectedItem}</span>
            )
        )
    }

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
                overlayStyle={{ border: '1px solid #d9d9d9', padding: 16 }}
                trigger={['click']}
            >
                <CheckboxSelectTriggerStyled>
                    <label htmlFor="">{renderSelectedItems()}</label>
                    <img src={dropDownArrow} alt="" height={7} width={12} />
                </CheckboxSelectTriggerStyled>
            </Dropdown>
            <ErrorMessage name={name} component={Errormsg} />
        </CheckboxesSelectStyled>
    )
}

export default CheckboxesSelect
