import { Link, useNavigate } from 'react-router-dom'
import { Avatar, Col, Dropdown, List, Rate, Row, Table } from 'antd'
import CustomButton from '../../../components/CustomButton/CustomButton'
import phoneIcon from '../../../assets/icons/ic_phone.svg'
import emailIcon from '../../../assets/icons/ic_email.svg'
import locationIcon from '../../../assets/icons/location-sign-svgrepo-com.svg'
import { CardViewStyled, ImageModal } from './styles'
import placeHolderImage from '../../../assets/images/custom_card_placeholder.png'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightBlue3,
    maastrichtBlue,
} from '../../../components/GlobalStyle'
import RightArrow from '../../../assets/images/rightArrow.svg'
import LeftArrow from '../../../assets/images/leftArrow.svg'
import { Form, Formik } from 'formik'
import FormControl from '../../../components/FormControl'
import { AllUserSchoolList } from '../../../redux/features/dashboard/dashboardDataSlice'
import { CustomDiv } from '../../CreateSchool/ListSchool/CustomDiv'
import Head from '../../../components/Head/Head'
import useUser from '../../../hooks/useUser'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { FC, useEffect, useState } from 'react'
import useCreateSchool from '../../../hooks/useCreateSchool'
import CustomModal from '../../../components/Modal/CustomModal'

interface Item {
    activitiesId: number
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
    const [modalVisible, setIsModalVisible] = useState(false)
    const [imgId, setImgId] = useState<string>()

    const initialValues = (): void => {}
    const handleCreateSubmit = (): void => {}
    const handleModal = (id: string): void => {
        setImgId(id)
        setIsModalVisible(true)
    }

    return (
        <>
            <div>
                <div key={item.id}>
                    <div id="bannerImg">
                        <img
                            src={
                                item.bannerImg
                                    ? `https://fistastore.com:444/${item.bannerImg}`
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
                                        item.bannerImg
                                            ? `https://fistastore.com:444/${item.bannerImg}`
                                            : placeHolderImage
                                    }
                                    alt="bannerImg"
                                    id={item.id}
                                />
                            </CustomModal>
                        )}
                    </div>
                    <List.Item
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        <List.Item.Meta title={item.name} description={null} />
                        {item.profileImg ? (
                            <img
                                src={`https://fistastore.com:444${item.profileImg}`}
                                width={44}
                                height={44}
                                style={{ marginLeft: 'auto' }}
                            />
                        ) : (
                            <Avatar />
                        )}
                    </List.Item>

                    <div>
                        <img
                            src={locationIcon}
                            width={10}
                            height={10}
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

                    <div
                        style={{
                            borderTop: '1px solid #ccc',
                            margin: ' 10px ',
                            marginBottom: '10px',
                        }}
                    ></div>
                    <div> {item.description}</div>
                </div>
            </div>
        </>
    )
}

export default AcademiesDetails
