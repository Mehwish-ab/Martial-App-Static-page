import { Col, Row } from 'react-bootstrap'
import FormControl from '../../../components/FormControl'
import { Dropdown, Space, Form } from 'antd'
import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'
import { Formik } from 'formik'
import { TimeTableCreate } from './styles'

const Slots = (): JSX.Element => {
    const items = [
        {
            key: '1',
            label: 'Add Slot',
        },
        {
            key: '2',
            label: 'Edit',
        },
        {
            key: '3',
            label: 'Duplicate',
        },
        {
            key: '4',
            label: 'Update',
        },
    ]
    return (
        <>
            <TimeTableCreate>
                <Formik
                    initialValues={{} as any}
                    // validationSchema={validationSchema}
                    onSubmit={(e) => {
                        {
                        }
                    }}
                >
                    {(formik) => {
                        return (
                            <Form
                                name="basic"
                                onFinish={formik.handleSubmit}
                                autoComplete="off"
                            >
                                <Row>
                                    <Col md="1"></Col>
                                    <Col md="2">
                                        <FormControl
                                            control="timePicker"
                                            type="timePicker"
                                            name="businessName"
                                            label="Start Time"
                                            fontSize="16px"
                                            max={6}
                                            placeholder="00:00:00"
                                        />
                                    </Col>
                                    <Col md="2">
                                        <FormControl
                                            control="timePicker"
                                            type="text"
                                            name="businessName"
                                            label="End Time"
                                            fontSize="16px"
                                            max={6}
                                            placeholder="00:00:00"
                                        />
                                    </Col>
                                    <Col md="2">
                                        <FormControl
                                            control="timePicker"
                                            type="text"
                                            name="businessName"
                                            label="Start Break"
                                            fontSize="16px"
                                            max={6}
                                            placeholder="00:00:00"
                                        />
                                    </Col>
                                    <Col md="2">
                                        <FormControl
                                            control="timePicker"
                                            type="text"
                                            name="businessName"
                                            label="End Break"
                                            fontSize="16px"
                                            max={6}
                                            placeholder="00:00:00"
                                        />
                                    </Col>
                                    <Col md="2" className="AddButton">
                                        <label>Slots</label>
                                        <span>{'Add'}</span>
                                    </Col>
                                    <Col md="1" className="actionContainer">
                                        <label>Actions</label>
                                        <div>
                                            <Space>
                                                <Dropdown menu={{ items }}>
                                                    <img
                                                        src={
                                                            actionMenuTogglerIcon as string
                                                        }
                                                        alt="action menu"
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                    />
                                                </Dropdown>
                                            </Space>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        )
                    }}
                </Formik>
            </TimeTableCreate>
        </>
    )
}
export default Slots
