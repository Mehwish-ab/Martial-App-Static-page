import React, { FC, useState } from 'react'

import searchIcon from '../../../assets/icons/ic_search.svg'
import { Input, List } from 'antd'

interface SearchGoogleLocationProps {
    name: string
    label: string
    placeholder: string
    setFieldValue: (val: unknown) => void
    className: string
    value: string
}
const SearchGoogleLocation: FC<SearchGoogleLocationProps> = ({
    name,
    label,
    value,
    placeholder,
    className,
    setFieldValue,
}: SearchGoogleLocationProps): JSX.Element => {
    const [options, setOptions] = useState([])
    const [searchValue, setSearchValue] = useState(value)
    const handleOnChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ): Promise<void> => {
        setSearchValue(e.target.value)

        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${e.target.value}&key=AIzaSyC6PLT5-mrVFJcFqFixXZTW4d7Fj1EZg3Q`
        )

        const data = await response.json()

        if (data && data.predictions && data.predictions.length > 0) {
            const arr: any = []
            data.predictions.forEach(
                (item: { description: any; place_id: any }) => {
                    arr.push({ label: item.description, value: item.place_id })
                }
            )

            setOptions(arr)
        } else {
            setOptions([])
        }
    }

    const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
        const htmlElement = e.target as HTMLElement
        setFieldValue(htmlElement.innerText)
        setSearchValue(htmlElement.innerText)
        setOptions([])
    }
    return (
        <div>
            <label htmlFor="" className="ant-input-label">
                {label}
            </label>
            <Input
                name={name}
                className={className}
                type={'text'}
                placeholder={placeholder}
                suffix={<img src={searchIcon as string} alt="search icon" />}
                value={searchValue}
                onChange={handleOnChange}
                style={{ borderRadius: 10 }}
            />
            {options && options.length > 0 && (
                <List
                    size="small"
                    bordered
                    dataSource={options}
                    renderItem={(item: any) => (
                        <List.Item
                            onClick={handleClick}
                            style={{ cursor: 'pointer' }}
                        >
                            {item.label}
                        </List.Item>
                    )}
                />
            )}
        </div>
    )
}

export default SearchGoogleLocation
