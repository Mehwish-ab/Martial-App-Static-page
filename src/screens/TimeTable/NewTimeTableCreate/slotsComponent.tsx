// Import statements...
import { Col, Row } from 'react-bootstrap'
import { Form, Space, Dropdown, Menu } from 'antd'
import FormControl from '../../../components/FormControl'
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
        <TimeTableCreate>
            <Formik
                initialValues={{} as any}
                onSubmit={(e) => {
                    // Handle form submission
                }}
            >
                {(formik) => (
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
                                    name="startTime"
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
                                    name="endTime"
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
                                    name="startBreak"
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
                                    name="endBreak"
                                    label="End Break"
                                    fontSize="16px"
                                    max={6}
                                    placeholder="00:00:00"
                                />
                            </Col>
                            <Col md="2" className="AddButton">
                                <label>Slots</label>
                                <span>{'Adds'}</span>
                            </Col>
                            <Col md="1" className="actionContainer">
                                <label>Actionss</label>
                                <div>
                                    <Space>
                                        <Dropdown
                                            overlay={
                                                <Menu>
                                                    {/* Render your menu items here */}
                                                </Menu>
                                            }
                                        >
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
                )}
            </Formik>
        </TimeTableCreate>
    )
}

export default Slots
