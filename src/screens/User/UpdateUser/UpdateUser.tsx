import { Formik } from 'formik'
import * as Yup from 'yup'
import { Form } from 'antd'
import FormControl from '../../../components/FormControl'
import CustomButton from '../../../components/CustomButton/CustomButton'
import UpdateUserStyle from './style'
import { useNavigate } from 'react-router-dom'
import { ProfileImage, primaryColor } from '../../../components/GlobalStyle'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { RootState } from '../../../redux/store'
import CustomPhoneInput from '../../../components/CustomInputNumber/CustomPhoneInput'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import Head from '../../../components/Head/Head'
import CustomModal from '../../../components/Modal/CustomModal'
import EnnvisionModal from '../../../components/CustomModals/EnnvisionModal'
import placeholder from '../../../assets/icons/ic_use_placeholder.svg'
import {
    authorizationToken,
    media_base_url,
    upload_profile_url,
} from '../../../utils/api_urls'
import axios from 'axios'
import Loader from '../../../components/Loader/Loader'
import {
    removeData,
    updateUser,
} from '../../../redux/features/admin/user/updateUserStatusSlice'

// update user types
type updateUserTypes = {
    firstName: string
    lastName: string
    emailAddress: string
    phoneNumber: string
    username: string
    profileImage: string
}

const UpdateUser = (): JSX.Element => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const userToastId = useRef<unknown>(null)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [profileImage, setProfileImage] = useState<File | null>(null)
    const { data: loginData } = useAppSelector((state) => state.loginData)
    const [profileLoading, setLoading] = useState(false)

    const { loading, result, error } = useAppSelector(
        (state) => state.updateUser
    )
    const { data } = useAppSelector((state) => state.loginData)

    // initial values
    const initialValues: updateUserTypes = {
        firstName: data?.userDetails.userFirstName || '',
        lastName: data?.userDetails.userLastName || '',
        emailAddress: data?.userDetails.email || '',
        phoneNumber: data?.userDetails.phoneNumber || '',
        username: data?.userDetails.username || '',
        profileImage: data?.userDetails.profileImageURL || '',
    }

    // get Validations from redux appData
    const {
        countryName: {
            results: {
                countryCode,
                countryFlagURL,
                examplePhoneNumber,
                name,
                phoneNumberLength,
            },
        },
        validations,
    } = useAppSelector((state: RootState) => state.appData.data)

    // user validations
    const firstName = validations[16]
    const lastName = validations[19]
    // user regExpressions
    const firstNameReg = new RegExp(firstName.pattern)
    const lastNameReg = new RegExp(lastName.pattern)

    // edit user validations
    const validationSchema = Yup.object({
        firstName: Yup.string()
            .required(firstName.notBlankMsgEn)
            .matches(firstNameReg, firstName.pattern),
        lastName: Yup.string()
            .required(lastName.notBlankMsgEn)
            .matches(lastNameReg, lastName.pattern),
    })

    // on submit handler
    const onSubmit = async (values: {
        firstName: string
        lastName: string
    }): Promise<void> => {
        const userData = {
            userId: Number(data?.userDetails.id),
            firstName: values.firstName,
            lastName: values.lastName,
        }
        await dispatch(updateUser(userData!))
        setIsModalVisible(true)
        setTimeout(() => {
            setIsModalVisible(false)
            navigate('/user-profile')
        }, 2000)
    }

    console.log({ loading, result, error })
    if (error) {
        userToastId.current = toast(error.responseMessage, {
            type: 'error',
            autoClose: 1000,
        })
    }
    if (result && !result.errors) {
        dispatch(removeData())
    }

    // do task
    const doTask = (): void => {
        navigate('/user-profile')
    }

    // upload file promise

    useEffect(() => {
        const uploadFilePromise = async (): Promise<void> => {
            if (!profileImage) return
            const formData = new FormData()
            formData.append('profilePicture', profileImage)

            // formdata.append(
            //   "data",
            //   JSON.stringify({
            //     userId: loginData?.userDetails.id,
            //   })
            // );

            formData.append(
                'data',
                new Blob(
                    [
                        JSON.stringify({
                            userId: loginData?.userDetails.id,
                        }),
                    ],
                    {
                        type: 'application/json',
                    }
                )
            )

            try {
                setLoading(true)
                const { data: data2 } = await axios.post(
                    upload_profile_url,
                    formData,

                    {
                        headers: {
                            ...authorizationToken(loginData!),
                        },
                    }
                )
                console.log({ data2 })
                setLoading(false)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (errors: any) {
                // setError(error.response.data);
                setLoading(false)
                console.log(errors.response.data, 'error in properties data')
            }
        }
        ;(async () => {
            if (profileImage) {
                await uploadFilePromise()
            }
        })()
    }, [loginData, profileImage])

    return (
        <>
            <Head title="update-user" />
            <CustomModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                showCloseBtn={false}
            >
                <EnnvisionModal
                    title="Profile successfully updated"
                    // eslint-disable-next-line max-len
                    description="Profile successfully edited. Your changes have been saved and are now reflected in your updated profile"
                    doTask={doTask}
                />
            </CustomModal>
            <UpdateUserStyle>
                <div className="inner-container-card">
                    <div className="inner-container-card-form">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        >
                            {(formik) => {
                                console.log(formik.values)
                                return (
                                    <Form
                                        name="basic"
                                        onFinish={formik.handleSubmit}
                                        // onFinishFailed={onFinishFailed}
                                        autoComplete="off"
                                        // validateMessages={validationSchema}
                                    >
                                        {profileLoading ? (
                                            <Loader />
                                        ) : formik.values.profileImage ? (
                                            <ProfileImage
                                                className="mx-auto mb-2"
                                                url={formik.values.profileImage}
                                                width="140px"
                                                height="140px"
                                                border="1px solid #9fa1a0"
                                            />
                                        ) : (
                                            <label className="label">
                                                <input
                                                    type="file"
                                                    onChange={(
                                                        event: React.ChangeEvent<HTMLInputElement>
                                                    ) => {
                                                        const files =
                                                            event.target.files
                                                        if (files) {
                                                            setProfileImage(
                                                                files[0]
                                                            )
                                                        }
                                                    }}
                                                />
                                                <span>
                                                    {profileImage ? (
                                                        <div
                                                            style={{
                                                                // eslint-disable-next-line max-len
                                                                backgroundImage: `url(${URL.createObjectURL(
                                                                    profileImage
                                                                )})`,
                                                                height: '140px',
                                                                width: '140px',
                                                                backgroundSize:
                                                                    'cover',
                                                                borderRadius:
                                                                    '50%',
                                                                backgroundRepeat:
                                                                    'no-repeat',
                                                                backgroundPosition:
                                                                    'center',
                                                                border: '1px solid #9fa1a0',
                                                            }}
                                                        />
                                                    ) : (
                                                        <img
                                                            src={
                                                                (formik.values
                                                                    .profileImage
                                                                    ? media_base_url +
                                                                      formik
                                                                          .values
                                                                          .profileImage
                                                                    : placeholder) as string
                                                            }
                                                            alt={
                                                                formik.values
                                                                    .firstName
                                                            }
                                                            className="profile-img"
                                                        />
                                                    )}
                                                </span>
                                            </label>
                                        )}

                                        <div>
                                            <FormControl
                                                control="input"
                                                type="text"
                                                name="firstName"
                                                border="1px solid #EFEFF4"
                                                placeholder="First Name"
                                                className={
                                                    formik.errors.firstName &&
                                                    formik.touched.firstName
                                                        ? 'is-invalid'
                                                        : 'customInput'
                                                }
                                            />
                                        </div>
                                        <div>
                                            <FormControl
                                                control="input"
                                                type="text"
                                                name="lastName"
                                                border="1px solid #EFEFF4"
                                                placeholder="Last Name"
                                                className={
                                                    formik.errors.lastName &&
                                                    formik.touched.lastName
                                                        ? 'is-invalid'
                                                        : 'customInput'
                                                }
                                            />
                                        </div>
                                        <div>
                                            <FormControl
                                                control="input"
                                                type="email"
                                                name="emailAddress"
                                                border="1px solid #EFEFF4"
                                                placeholder="Enter Email"
                                                disabled={true}
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <CustomPhoneInput
                                                countryNumber={countryCode}
                                                placeholder={examplePhoneNumber}
                                                phoneLength={phoneNumberLength}
                                                countryFlag={countryFlagURL}
                                                phoneValueHandler={(
                                                    value: number | string
                                                ) =>
                                                    formik.setFieldValue(
                                                        'phoneNumber',
                                                        value
                                                    )
                                                }
                                                value={
                                                    formik.values.phoneNumber
                                                }
                                                name="phoneNumber"
                                                countryName={name}
                                                disabled={true}
                                            />
                                        </div>
                                        <div className="login-input-fields-field mt-3">
                                            <FormControl
                                                control="input"
                                                type="text"
                                                name="username"
                                                border="1px solid #EFEFF4"
                                                placeholder="User Name"
                                                disabled={true}
                                            />
                                        </div>
                                        <div className="mt-3">
                                            <CustomButton
                                                bgcolor={primaryColor}
                                                color="white"
                                                padding="11px 8px"
                                                width="100%"
                                                type="submit"
                                                title="Submit"
                                                fontSize="16px"
                                                loading={loading}
                                            />
                                        </div>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </div>
                </div>
            </UpdateUserStyle>
        </>
    )
}

export default UpdateUser
