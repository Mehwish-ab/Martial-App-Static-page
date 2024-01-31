import { InputNumber, Space } from 'antd'

const CustomNumberField = ({
    defaultValue1 = 100,
    defaultValue2 = 100,
}: {
    defaultValue1?: number
    defaultValue2?: number
}): JSX.Element => {
    return (
        <Space direction="vertical">
            <Space.Compact size="large">
                <InputNumber defaultValue={defaultValue1} />
                <InputNumber defaultValue={defaultValue2} />
            </Space.Compact>
        </Space>
    )
}

export default CustomNumberField
