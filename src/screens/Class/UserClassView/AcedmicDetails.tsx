import { Link, useNavigate } from 'react-router-dom'
import { Avatar, Col, Table } from 'antd'
import CustomButton from '../../../components/CustomButton/CustomButton'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightBlue3,
} from '../../../components/GlobalStyle'
import rightArror from '../../../assets/icons/ic_arrow_right.svg'
import useUser from '../../../hooks/useUser'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { FC, useEffect, useState } from 'react'
import useCreateSchool from '../../../hooks/useCreateSchool'
import { ListClassStyled } from '../ListClasses/style'
import { ColumnsType } from 'antd/lib/table'
import useScreenTranslation from '../../../hooks/useScreenTranslation'

interface Item {
    activitiesId: number
    address: string
    bannerPicture: string
    description: string
    emailAddress: string
    hasClass: boolean
    id: string
    membership: boolean
    title: string
    phoneNumber: string
    profileImg: string
    totalItems: number
    currentPage: number
    totalpages: number
}

interface Props {
    item: Item
}
const AcademiesDetails: FC<Props> = ({ item }): JSX.Element => {
    const { getAllUserPagination } = useUser()
    const { getAllAppSchool } = useCreateSchool()

    const [currentPage, setCurrentPage] = useState(0)
    const [error, setError] = useState<string | undefined>(undefined)

    const pageSize = 10

    const [loading, setLoading] = useState(true)

    // const { schoolData } = useSelector(
    //     (state: RootState) => state.dashboardData
    // )
    const lengths: number = 0
    const { loginData } = useSelector((state: RootState) => state)
    const { UserData } = useSelector((state: RootState) => state.UserData)
    const handlePaginationChange = async (page: number): Promise<void> => {
        try {
            setLoading(true)
            // page = page - 1

            const response: any = await getAllUserPagination(
                String(loginData.data?.userDetails.countryName),
                page - 1
            )
            // setAllUSer(response)
        } catch (errors: unknown) {
            setError('Error fetching data')
        } finally {
            setLoading(false)
        }
        setCurrentPage(page)
    }
    const navigate = useNavigate()

    // useEffect(() => {
    //     store.dispatch(getAllUsers())
    // }, [])

    useEffect(() => {
        const fetchData = async (): Promise<any> => {
            try {
                const res = await getAllAppSchool(Number(currentPage))

                //setAllUSer(res)
            } catch (errors) {
                /// setError('Error fetching data')
            } finally {
                //  setLoading(false)
            }
        }
        fetchData()
    }, [])
    const items = [
        {
            key: '1',
            label: 'Report',
            // onClick: () => navigation(record, "view"),
        },
        {
            key: '2',
            label: 'Share',
            // onClick: () => navigation(record, "edit"),
        },
    ]
    const classData = [
        {
            id: '0',
            day: 'Monday',
            date: rightArror,
            totalItems: '11',
        },
        {
            id: '1',
            day: 'Tuesday',
            date: rightArror,
            totalItems: '11',
        },
        {
            id: '2',
            day: 'Wednesday',
            date: rightArror,
            totalItems: '11',
        },
        {
            id: '3',
            day: 'Thursday',
            date: rightArror,
            totalItems: '11',
        },
    ]
    const [modalVisible, setIsModalVisible] = useState(false)
    const [imgId, setImgId] = useState<string>()

    const handleModal = (id: string): void => {
        setImgId(id)
        setIsModalVisible(true)
    }
    const { getLabelByKey } = useScreenTranslation('classesList')
    const columns: ColumnsType<any> = [
        {
            title: '',
            dataIndex: 'day',
            key: 'id',
        },
        {
            title: '',
            dataIndex: 'date',
            key: 'id',
            render: (rightArrorow) => (
                <>
                    <img src={rightArrorow} />
                </>
            ),
        },
    ]
    return (
        <>
            <div style={{ padding: '20px 6px 20px 6px' }}>
                <div key={item.id}>
                    {/* <div id="bannerImg">
                        <img
                            src={
                                item.bannerPicture
                                    ? `https://fistastore.com:444/${item.bannerPicture}`
                                    : placeHolderImage
                            }
                            alt="bannerImg"
                            id={item.id}
                            onClick={() => handleModal(item.id)}
                        />

                        {item.id === imgId && modalVisible && (
                            <CustomModal
                                isModalVisible={modalVisible}
                                setIsModalVisible={setIsModalVisible}
                                onCancel={() => {
                                    setIsModalVisible(false)
                                }}
                            >
                                {' '}
                                <img
                                    src={
                                        item.bannerPicture
                                            ? `https://fistastore.com:444/${item.bannerPicture}`
                                            : placeHolderImage
                                    }
                                    alt="bannerImg"
                                    id={item.id}
                                />
                            </CustomModal>
                        )}
                    </div> */}
                    <div>
                        <div className="d-flex justify-content-between">
                            <Col
                                style={{
                                    marginLeft: '5px',
                                    marginTop: '5px',
                                    fontFamily: fontFamilyMedium,
                                    fontSize: ' 14.88px',
                                    fontWeight: ' 500',
                                    lineHeight: '17.76px',
                                }}
                            >
                                {item.title}
                            </Col>
                            <Col
                                style={{
                                    marginRight: '5px',
                                    marginTop: '5px',
                                    fontFamily: fontFamilyMedium,
                                    fontSize: ' 13.88px',
                                    fontWeight: ' 500',
                                    lineHeight: '17.76px',
                                }}
                            >
                                12/30
                            </Col>
                        </div>
                        <div className="d-flex justify-content-between">
                            <Col
                                style={{
                                    marginLeft: '5px',
                                    marginTop: '10px',
                                    fontFamily: fontFamilyRegular,
                                    fontSize: ' 13.88px',
                                    fontWeight: '400',
                                    lineHeight: '17.76px',
                                }}
                            >
                                {item.description}
                            </Col>
                        </div>
                        <hr className="solid" />
                        <div className="d-flex justify-content-between">
                            <Col
                                style={{
                                    marginLeft: '5px',

                                    fontFamily: fontFamilyRegular,
                                    fontSize: ' 13.88px',
                                }}
                            >
                                Karate
                            </Col>
                            <Col
                                style={{
                                    marginRight: '5px',

                                    fontFamily: fontFamilyRegular,
                                    fontSize: ' 12.88px',
                                }}
                            >
                                Mon 21 Aug 2023
                            </Col>
                            <Col
                                style={{
                                    marginRight: '5px',

                                    fontFamily: fontFamilyRegular,
                                    fontSize: ' 12.88px',
                                }}
                            >
                                07:00 PM - 08:30 PM
                            </Col>
                        </div>
                        <hr className="solid" />
                    </div>
                    <div className="d-flex justify-content-start">
                        <div>
                            <img
                                src={`https://fistastore.com:444${item.bannerPicture}`}
                                width={44}
                                height={44}
                                style={{ marginLeft: 'auto' }}
                            />
                        </div>
                        <div style={{ marginLeft: '5px' }}>
                            Jiu Jitsu Fundamentals
                            <br></br>
                            <div>Hutton, United Kingdom.</div>
                        </div>
                    </div>
                    <hr className="solid" />
                    <div className="d-flex justify-content-start">
                        <div>
                            <img
                                src={`https://fistastore.com:444${item.bannerPicture}`}
                                width={44}
                                height={44}
                                style={{ marginLeft: 'auto' }}
                            />
                        </div>
                        <div style={{ marginLeft: '5px' }}>
                            {item.title}
                            <br></br>
                            <div>Karate, Krav Maga, Taekwondo, Muay Thai</div>
                        </div>
                    </div>
                    <hr className="solid" />
                </div>
                <h5 className="table-heading">Activities</h5>
                <ListClassStyled>
                    <Table
                        columns={columns}
                        // dataSource={
                        //     Flag === false
                        //         ? ClassData?.data[0].id !== 0
                        //             ? ClassData.data
                        //             : []
                        //         : calenderData === undefined
                        //           ? []
                        //           : calenderData
                        // }
                        dataSource={classData}
                        // scroll={{ x: true }}
                        pagination={
                            classData &&
                            // classData.totalItems &&
                            4 > 10
                                ? {
                                      current: currentPage,
                                      total: classData ? 0 : 0,
                                      pageSize: pageSize,
                                      showTotal: (total, range) => (
                                          <span
                                              dangerouslySetInnerHTML={{
                                                  __html: `Page <span className='paginationVal'>${currentPage}</span> of ${Math.ceil(
                                                      total / pageSize
                                                  )}`,
                                              }}
                                          />
                                      ),
                                      onChange: (page) =>
                                          handlePaginationChange(page),
                                      position: ['bottomRight'],
                                  }
                                : false
                        }
                    />
                </ListClassStyled>
                <CustomButton
                    bgcolor={lightBlue3}
                    textTransform="Captilize"
                    color="#006197"
                    padding="10px 27px"
                    fontFamily={`${fontFamilyMedium}`}
                    width="135 px"
                    type="button"
                    title="BOOK NOW"
                    fontSize="14px"
                    loading={false}
                    margin="5px"
                    // clicked={() => {
                    //     navigate('/class/list')
                    // }}
                />
            </div>
        </>
    )
}

export default AcademiesDetails
