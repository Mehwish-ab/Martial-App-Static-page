import { useNavigate } from 'react-router-dom'
import { Col, Table } from 'antd'
import CustomButton from '../../../components/CustomButton/CustomButton'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightBlue3,
} from '../../../components/GlobalStyle'
import { AllUserSchoolList } from '../../../redux/features/dashboard/dashboardDataSlice'
import useUser from '../../../hooks/useUser'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { FC, useEffect, useState } from 'react'
import useCreateSchool from '../../../hooks/useCreateSchool'
import { ColumnsType } from 'antd/lib/table'
import DefaultImage from '../../../assets/images/Felids.png'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import Felids from '../../../assets/images/Felids.png'
import { TableMembershipStyled } from './Tablestyle'

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
    price: string
}

interface Props {
    item: Item
}
const AcademiesDetails: FC<Props> = ({ item }): JSX.Element => {
    const { getAllUser, getAllUserPagination } = useUser()
    const { getAllAppSchool } = useCreateSchool()
    const [AllUSer, setAllUSer] = useState<
        | {
              currentPage: number
              totalItems: number | undefined
              data: AllUserSchoolList[]
          }
        | undefined
    >(undefined)
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
            setAllUSer(response)
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

                setAllUSer(res)
            } catch (errors) {
                /// setError('Error fetching data')
            } finally {
                //  setLoading(false)
            }
        }
        fetchData()
    }, [])
    const [modalVisible, setIsModalVisible] = useState(false)
    const [imgId, setImgId] = useState<string>()

    const handleModal = (id: string): void => {
        setImgId(id)
        setIsModalVisible(true)
    }
    const { getLabelByKey } = useScreenTranslation('classesList')
    const memberShipData = [
        {
            imgaes: Felids,
            className: 'Daniel Day-Lewis',
            adress: 'Calle Polifemo, 3, Málaga, España, Málaga...',
            frequency: 'Unlimited Week',
        },
        {
            imgaes: Felids,
            className: 'Daniel Day-Lewis',
            adress: 'Calle Polifemo, 3, Málaga, España, Málaga...',
            frequency: 'Unlimited Week',
        },
        {
            imgaes: Felids,
            className: 'Daniel Day-Lewis',
            adress: 'Calle Polifemo, 3, Málaga, España, Málaga...',
            frequency: 'Unlimited Week',
        },
        {
            imgaes: Felids,
            className: 'Daniel Day-Lewis',
            adress: 'Calle Polifemo, 3, Málaga, España, Málaga...',
            frequency: 'Unlimited Week',
        },
    ]
    const columns: ColumnsType<any> = [
        {
            title: 'Image',
            dataIndex: 'images',
            key: 'images',
            render: (Dummydatas) => {
                if (!Dummydatas) {
                    return (
                        <img
                            // src={DefaultImage}
                            src={DefaultImage}
                            width={44}
                            height={44}
                        />
                    )
                } else {
                    return (
                        <img
                            src={`https://fistastore.com:444${Dummydatas}`}
                            width={44}
                            height={44}
                        />
                    )
                }
            },
        },
        {
            title: 'Class Name',
            key: 'classNamegg',
            render: (record) => {
                console.log('record', record)
                return (
                    <div>
                        <div>{record.className}</div>
                        <div>{record.adress}</div>
                    </div>
                )
            },
        },
        {
            title: 'Frequency',
            dataIndex: 'frequency',
            key: 'id',
        },
    ]
    return (
        <>
            <div style={{ padding: '20px 2px 20px 2px' }}>
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
                                {item.price}
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

                                    fontFamily: fontFamilyMedium,
                                    fontSize: ' 13.88px',
                                }}
                            >
                                Karate
                            </Col>
                            <Col
                                style={{
                                    marginRight: '5px',

                                    fontFamily: fontFamilyMedium,
                                    fontSize: ' 13.88px',
                                }}
                            >
                                Mon 21 Aug 2023
                            </Col>
                        </div>
                        <hr className="solid" />
                    </div>
                    <div className="d-flex justify-content-start">
                        <div>
                            {item.bannerPicture ? (
                                <img
                                    src={`https://fistastore.com:444${item.bannerPicture}`}
                                    width={44}
                                    height={44}
                                    style={{ marginLeft: 'auto' }}
                                />
                            ) : (
                                <img
                                    src={DefaultImage}
                                    width={44}
                                    height={44}
                                    style={{ marginLeft: 'auto' }}
                                />
                            )}
                        </div>
                        <div style={{ marginLeft: '5px' }}>
                            Jiu Jitsu Fundamentals
                            <br></br>
                            <div>Hutton, United Kingdom.</div>
                        </div>
                    </div>

                    <hr className="solid" />
                </div>
                <TableMembershipStyled>
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
                        dataSource={memberShipData}
                        // scroll={{ x: true }}
                        pagination={
                            memberShipData &&
                            // classData.totalItems &&
                            4 > 10
                                ? {
                                      current: currentPage,
                                      total: memberShipData ? 0 : 0,
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
                </TableMembershipStyled>

                <div className="mt-5">
                    <CustomButton
                        bgcolor={lightBlue3}
                        textTransform="Captilize"
                        color="#006197"
                        padding="10px 27px"
                        fontFamily={`${fontFamilyMedium}`}
                        width="135 px"
                        type="button"
                        title="PURCHASE"
                        fontSize="14px"
                        loading={false}
                        margin="5px"

                        // clicked={() => {
                        //     navigate('/class/list')
                        // }}
                    />
                </div>
            </div>
        </>
    )
}

export default AcademiesDetails
