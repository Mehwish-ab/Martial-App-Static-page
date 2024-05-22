import { useNavigate } from 'react-router-dom'
import { List } from 'antd'
import phoneIcon from '../../../assets/icons/ic_phone.svg'
import emailIcon from '../../../assets/images/ic_email.png'
import locationIcon from '../../../assets/images/ic_address.png'
import { AllUserSchoolList } from '../../../redux/features/dashboard/dashboardDataSlice'
import useUser from '../../../hooks/useUser'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { FC, useEffect, useState } from 'react'
import useCreateSchool from '../../../hooks/useCreateSchool'
import Feilds from '../../../assets/images/Felids.png'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import { fontFamilyMedium, lightBlue3 } from '../../../components/GlobalStyle'
import CustomButton from '../../../components/CustomButton/CustomButton'

interface Item {
    activitiesId: string
    address: string
    bannerImg: string
    description: string
    emailAddress: string
    hasClass: boolean
    id: string
    membership: boolean
    name: string
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

    const {
        statusData: { activities },
    } = useSelector((state: RootState) => state.appData.data)
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )
    const { getLabelByKey } = useScreenTranslation('updateClasses')

    const showActivities = (_activities: string[]): string => {
        let activitiesName = ''
        _activities.forEach((activity) => {
            const index = activities.findIndex((act) => act.id === activity)
            if (index !== -1) {
                const activityLabel = (activities[index] as any)[
                    selectedLanguage
                ]
                activitiesName =
                    activitiesName === ''
                        ? activityLabel
                        : `${activitiesName}, ${activityLabel}`
            }
        })
        if (activitiesName.length > 35) {
            return `${activitiesName.slice(0, 35)}...`
        }
        return activitiesName || getLabelByKey('activitiesPlaceholder')
    }
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
    // const [modalVisible, setIsModalVisible] = useState(false)
    // const [imgId, setImgId] = useState<string>()

    // const initialValues = (): void => {}
    // const handleCreateSubmit = (): void => {}
    // const handleModal = (id: string): void => {
    //     setImgId(id)
    //     setIsModalVisible(true)
    // }
    console.log('itemmmm', item)
    return (
        <>
            <div style={{ padding: '20px 6px 20px 6px' }}>
                <div key={item.id}>
                    <div>
                        {/* <img
                            src={
                                item.bannerImg
                                    ? `https://fistastore.com:444/${item.bannerImg}`
                                    : placeHolderImage
                            }
                            alt="bannerImg"
                            id={item.id}
                            // onClick={() => handleModal(item.id)}
                        /> */}

                        {/* {item.id === imgId && modalVisible && (
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
                                        item.bannerImg
                                            ? `https://fistastore.com:444/${item.bannerImg}`
                                            : placeHolderImage
                                    }
                                    alt="bannerImg"
                                    id={item.id}
                                />
                            </CustomModal>
                        )} */}
                    </div>
                    <h5>{item.name}</h5>
                    <List.Item
                        style={{ display: 'flex', alignItems: 'normal' }}
                    >
                        <div>
                            <div
                                style={{
                                    fontFamily: fontFamilyMedium,
                                    fontSize: '16px',
                                    fontWeight: '400',
                                }}
                            >
                                {' '}
                                {showActivities(
                                    item.activitiesId?.split(',').map(String)
                                )}
                            </div>
                            <div>
                                <img
                                    src={locationIcon}
                                    width={10}
                                    height={15}
                                    style={{
                                        marginLeft: 'auto',
                                        color: 'blue',
                                    }}
                                />{' '}
                                {item.address}
                            </div>
                            <div>
                                <img
                                    src={emailIcon}
                                    width={10}
                                    height={10}
                                    style={{
                                        marginLeft: 'auto',
                                        color: 'blue',
                                    }}
                                />
                                {item.emailAddress}
                            </div>
                            <div>
                                <img
                                    src={phoneIcon}
                                    width={10}
                                    height={10}
                                    style={{
                                        marginLeft: 'auto',
                                        color: 'blue',
                                    }}
                                />{' '}
                                {item.phoneNumber}
                            </div>
                        </div>
                        {item.profileImg ? (
                            <img
                                src={`https://fistastore.com:444${item.profileImg}`}
                                width={54}
                                height={54}
                                style={{ marginLeft: 'auto' }}
                            />
                        ) : (
                            <img
                                src={Feilds}
                                width={44}
                                height={44}
                                style={{ marginLeft: 'auto' }}
                            />
                        )}
                    </List.Item>

                    <hr className="solid" />
                    <div> {item.description}</div>
                </div>
                <div className="mt-3">
                    <CustomButton
                        bgcolor={lightBlue3}
                        textTransform="Captilize"
                        color="#006197"
                        padding="10px 27px"
                        fontFamily={`${fontFamilyMedium}`}
                        width="140 px"
                        type="button"
                        title="Enroll Now"
                        fontSize="14px"
                        loading={false}
                        margin="5px"
                        clicked={() => {
                            navigate('/subscriptionPlan')
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default AcademiesDetails
