/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import { MembershipCardViewStyled } from './styles'
import { Dropdown } from 'antd'
import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import FormControl from '../../../components/FormControl'
import placeHolderImage from '../../../assets/images/custom_card_placeholder.png'
import {
    darkBlue,
    fontFamilyMedium,
    lightBlue3,
    maastrichtBlue,
    pureDark,
} from '../../../components/GlobalStyle'
import CustomButton from '../../../components/CustomButton/CustomButton'
import RightArrow from '../../../assets/images/rightArrow.svg'
import LeftArrow from '../../../assets/images/leftArrow.svg'
import DateCalander from '../../../assets/images/dateCalander.svg'
import FilterIcon from '../../../assets/icons/ic_filter.svg'
import { CustomDiv } from './CustomDiv'
import Head from '../../../components/Head/Head'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import { useSelector } from 'react-redux'
import store, { RootState } from '../../../redux/store'
import { getBranchBySchoolId } from '../../../redux/features/CLasses/ClassSlice'
import useMembership from '../../../hooks/useMembership'

const MembershipCardView = (): JSX.Element => {
    const navigate = useNavigate()
    const { handleCreateSubmit, loading } = useMembership()
    const [selectedClassIds, setSelectedClassIds] = useState<string[]>([])
    const { getLabelByKey } = useScreenTranslation('updateMembershipClass')
    const { ClassData } = useSelector((state: RootState) => state.ClassData)
    useEffect(() => {
        store.dispatch(getBranchBySchoolId())
    }, [])
    console.log('Selected Class IDs:', selectedClassIds)
    const location = useLocation()
    const data = location.state && location.state.data
    console.log('Received data:', data)
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

    const handleCheckboxChange = (classId: string): void => {
        const isSelected = selectedClassIds.includes(classId)

        if (isSelected) {
            // If already selected, remove from the array
            setSelectedClassIds((prevIds: any[]) =>
                prevIds.filter((id) => id !== classId)
            )
        } else {
            // If not selected, add to the array
            setSelectedClassIds((prevIds: any) => [...prevIds, classId])
        }
    }
    // const submit = async (): any => {
    //    // await handleCreateSubmit(val, file)
    // }
    return (
        <>
            <Head title="Membership Class" />
            <MembershipCardViewStyled>
                <CustomDiv>
                    <div className="mainWrapper">
                        <h3 className="table-heading">
                            {getLabelByKey('title')}
                        </h3>
                        <div className="FilterMainContainer">
                            <div className="arrowsMain">
                                <div className="arrowRight">
                                    <img
                                        src={LeftArrow}
                                        alt="Date"
                                        width={18}
                                        height={12}
                                    />
                                </div>
                                <div className="arrowLeft">
                                    <img
                                        src={RightArrow}
                                        alt="Date"
                                        width={18}
                                        height={12}
                                    />
                                </div>
                            </div>
                            <div className="dateRange">
                                <p>
                                    {' '}
                                    <span>Mon,</span> Sep 11, 2023 -{' '}
                                    <span>Thu,</span> Sep 21, 2023
                                </p>
                                <img
                                    src={DateCalander}
                                    alt="calander"
                                    width={21}
                                    height={21}
                                />
                            </div>
                            <div className="todayPlusContainer">
                                <div className="dateToday">
                                    <p>Today</p>
                                </div>
                                <CustomButton
                                    bgcolor={darkBlue}
                                    textTransform="Captilize"
                                    color={pureDark}
                                    padding="6.5px 0px"
                                    fontFamily={`${fontFamilyMedium}`}
                                    width="40px"
                                    type="submit"
                                    title=""
                                    fontSize="17px"
                                    loading={loading}
                                    icon={
                                        <img
                                            src={FilterIcon}
                                            alt="edit icon"
                                            width={17}
                                            height={17}
                                        />
                                    }
                                    clicked={() => {
                                        navigate(`/membership/create`)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </CustomDiv>
                <div className="custom_card_list d-flex flex-wrap justify-content-center">
                    {/* branchData?.data[0].branchId !== 0 ? branchData.data : [] */}
                    {ClassData?.data.map((classItem) => {
                        return (
                            <div
                                className="custom_card"
                                key={classItem.classId}
                            >
                                <div
                                    className="custom_card_placeholder_img"
                                    id="cardImg"
                                >
                                    <img
                                        src={
                                            classItem.bannerPicture
                                                ? `https://fistastore.com:444${classItem.bannerPicture}`
                                                : placeHolderImage
                                        }
                                        alt="CardImg"
                                        id="cardImg"
                                    />
                                    <FormControl
                                        control="checkbox"
                                        type="checkbox"
                                        id="cardImg"
                                        name="cardImg"
                                        className="custom_card_checkbox"
                                        onChange={() =>
                                            handleCheckboxChange(
                                                String(classItem.classId)
                                            )
                                        }
                                    />
                                </div>
                                <div className="custom_card_body d-flex align-items-center">
                                    <div className="card_body_inner ">
                                        <div className="cardBody_title d-flex justify-content-between align-items-center ">
                                            <h6 className="mb-0">
                                                {classItem.title}
                                            </h6>
                                        </div>
                                        <div className="cardBody_time d-flex justify-content-between align-items-center">
                                            <p className="mb-0">
                                                {classItem.startDate}
                                            </p>
                                            <p className="mb-0">
                                                {classItem.fee}
                                                {/* Add the relevant data here */}
                                            </p>
                                        </div>
                                    </div>
                                    <Dropdown menu={{ items }}>
                                        <img
                                            src={
                                                actionMenuTogglerIcon as string
                                            }
                                            alt="action menu"
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </Dropdown>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="mt-20 d-flex justify-content-end">
                    <CustomButton
                        bgcolor={lightBlue3}
                        textTransform="Captilize"
                        color={maastrichtBlue}
                        padding="11px 40.50px"
                        fontFamily={`${fontFamilyMedium}`}
                        width="fit-content"
                        type="submit"
                        title={getLabelByKey('primaryButton')}
                        fontSize="18px"
                        loading={loading}
                        // clicked={}
                    />
                </div>
                <div>
                    <ul className="ant-pagination ant-table-pagination ant-table-pagination-right">
                        <li className="ant-pagination-total-text">
                            <span>
                                Page <span className="paginationVal">1</span> of
                                10
                            </span>
                        </li>
                        <li
                            title="Previous Page"
                            className="ant-pagination-prev ant-pagination-disabled"
                            aria-disabled="true"
                        >
                            <button
                                className="ant-pagination-item-link"
                                type="button"
                                tabIndex={-1}
                                disabled
                            >
                                <span
                                    role="img"
                                    aria-label="left"
                                    className="anticon anticon-left"
                                >
                                    <svg
                                        viewBox="64 64 896 896"
                                        focusable="false"
                                        data-icon="left"
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
                                    </svg>
                                </span>
                            </button>
                        </li>
                        <li
                            title="1"
                            className="ant-pagination-item ant-pagination-item-1 ant-pagination-item-active"
                            tabIndex={0}
                        >
                            <a rel="nofollow">1</a>
                        </li>
                        {/* Repeat the li elements for other pages */}
                        <li
                            title="Next Page"
                            tabIndex={0}
                            className="ant-pagination-next"
                            aria-disabled="false"
                        >
                            <button
                                className="ant-pagination-item-link"
                                type="button"
                                tabIndex={-1}
                            >
                                <span
                                    role="img"
                                    aria-label="right"
                                    className="anticon anticon-right"
                                >
                                    <svg
                                        viewBox="64 64 896 896"
                                        focusable="false"
                                        data-icon="right"
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
                                    </svg>
                                </span>
                            </button>
                        </li>
                        <li className="ant-pagination-options">
                            <div
                                className="ant-select ant-pagination-options-size-changer ant-select-single ant-select-show-arrow"
                                aria-label="Page Size"
                            ></div>
                        </li>
                    </ul>
                </div>
            </MembershipCardViewStyled>
        </>
    )
}

export default MembershipCardView
