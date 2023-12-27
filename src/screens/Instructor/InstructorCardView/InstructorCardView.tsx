import { InstructorCardViewStyled } from './styles'
import { Avatar, Dropdown, List } from 'antd'
import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'

import placeHolderImage from '../../../assets/images/custom_card_placeholder.png'

const InstructorCardView = (): JSX.Element => {
    // const navigate = useNavigate()

    const items = [
        {
            key: '1',
            label: 'View',
            // onClick: () => navigation(record, "view"),
        },
        {
            key: '2',
            label: 'Edit',
            // onClick: () => navigation(record, "edit"),
        },
        {
            key: '3',
            label: 'Subscribe',
            // onClick: () => navig[ation(record, "subscribe"),
        },
    ]

    // const navigation = (record: BranchDataType, redirectTo: string) => {
    //     switch (redirectTo) {
    //         case 'edit':
    //             navigate(`/franchise/edit/${record.branchId}`, {
    //                 state: {
    //                     branchToEdit: record as BranchDataType,
    //                 },
    //             })
    //             break

    //         case 'view':
    //             navigate(`/franchise/view/${record.branchId}`, {
    //                 state: {
    //                     branch: record as BranchDataType,
    //                 },
    //             })
    //             break

    //         case 'subscribe':
    //             navigate(`/franchise/subscribe/${record.branchId}`, {
    //                 state: {
    //                     branch: record as BranchDataType,
    //                 },
    //             })
    //     }
    // }

    return (
        <>
            <InstructorCardViewStyled className="mt-20">
                <h3 className="table-heading mb-20 ms-4">Instructor Class</h3>
                <div className="mainContainer">
                    <div className="custom_card_list d-flex flex-wrap">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
                            return (
                                <div className="custom_card" key={item}>
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar />}
                                            title={'Apex Martial Arts Academy'}
                                            description="Hutton, United Kingdom"
                                        />
                                        <Dropdown menu={{ items }}>
                                            <img
                                                src={
                                                    actionMenuTogglerIcon as string
                                                }
                                                alt="action menu"
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </Dropdown>
                                    </List.Item>

                                    <div className="custom_card_placeholder_img">
                                        <img src={placeHolderImage} alt="" />
                                    </div>
                                    <div className="custom_card_body">
                                        <div className="cardBody_title d-flex justify-content-between align-items-center ">
                                            <h6 className="mb-0">Jiu Jitsu</h6>
                                            <p className="mb-0">12/30</p>
                                        </div>
                                        <div className="cardBody_time d-flex justify-content-between align-items-center">
                                            <p className="mb-0">
                                                Mon 21 Aug 2023
                                            </p>
                                            <p className="mb-0">
                                                07:00 PM - 08:30 PM
                                            </p>
                                        </div>
                                        <div className="cardBody_para d-flex justify-content-between align-items-center">
                                            <p className="mb-0">
                                                Norem ipsum dolor sit amet,
                                                consectetur adipiscing elit.
                                                Nunc vulputate libero et velit
                                                interdum, ac aliquet odio
                                                mattis.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </InstructorCardViewStyled>
        </>
    )
}

export default InstructorCardView
