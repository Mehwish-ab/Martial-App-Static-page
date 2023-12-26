import placeholder from '../../../assets/images/ic_professional_1.png'
import { add_comments_url, media_base_url } from '../../../utils/api_urls'
import { Formik } from 'formik'
import { Form } from 'antd'
import * as Yup from 'yup'
import FormControl from '../../FormControl'
import ic_comment from '../../../assets/icons/ic_send_comment.svg'
import { useAppSelector } from '../../../app/hooks'
import usePostEvent from '../../../hooks/usePostEvent'
import { User, childrenComment } from './CommentsModal'

type replyBoxProps = {
    profileIcon: string
    commentId: number
    username: string
    newsFeedId: number
    parentCommentId: number
    replyCommentHandler: (
        commentId: number,
        newComment: childrenComment
    ) => void
} & User

//comment init values types
type initialValuesType = {
    comment: string
}

const Replybox: React.FC<replyBoxProps> = ({
    profileIcon,
    commentId,
    username,
    newsFeedId,
    parentCommentId,
    replyCommentHandler,
    firstName,
    lastName,
    profilePicture,
    userName,
    id,
}) => {
    const { data: loginData } = useAppSelector((state) => state.loginData)
    // reply comment init values
    const initialValues: initialValuesType = {
        comment: '',
    }
    // reply comment submit
    const onSubmit = async (values: initialValuesType, { resetForm }: any) => {
        console.log('alert reply box submit')
        replyCommentHandler(commentId, {
            commentContent: values.comment,
            childrenComments: [],
            createdDateTime: '',
            id: 0,
            user: {
                firstName: loginData?.userDetails.userFirstName!,
                lastName: loginData?.userDetails.userLastName!,
                id: loginData?.userDetails.id!,
                profilePicture: loginData?.userDetails.profileImageURL!,
                userName: loginData?.userDetails.username!,
            },
        })
        const commentContent = values.comment
        resetForm()
        apiDataPromise(add_comments_url, {
            newsFeedId,
            commentContent,
            parentCommentId,
        })
    }

    // validation schema
    const validationSchema = Yup.object({
        comment: Yup.string().required('field is required'),
    })

    // reply handler

    const { loading, data, apiDataPromise, error } = usePostEvent()

    return (
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
                        autoComplete="off"
                    >
                        <div className="reply-container">
                            <figure className="mt-2">
                                <img
                                    className="mt-1 rounded-circle"
                                    src={
                                        loginData?.userDetails.profileImageURL
                                            ? media_base_url +
                                              loginData?.userDetails
                                                  .profileImageURL
                                            : placeholder
                                    }
                                    alt={username}
                                />
                            </figure>
                            <div className="d-flex align-items-center">
                                <FormControl
                                    control="input"
                                    type="text"
                                    padding="12px"
                                    name="comment"
                                    placeholder="Reply"
                                    showErrorMessage={false}
                                    className={
                                        formik.errors.comment &&
                                        formik.touched.comment
                                            ? 'is-invalid'
                                            : 'customInput'
                                    }
                                />
                                <button
                                    type="submit"
                                    className="add-comment-btn mt-2"
                                >
                                    <img src={ic_comment} alt="send-comment" />
                                </button>
                            </div>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default Replybox
