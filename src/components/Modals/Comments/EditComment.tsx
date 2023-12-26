import placeholder from '../../../assets/images/ic_professional_1.png'
import {
    add_comments_url,
    edit_comments_url,
    media_base_url,
} from '../../../utils/api_urls'
import { Formik } from 'formik'
import { Form } from 'antd'
import * as Yup from 'yup'
import FormControl from '../../FormControl'
import ic_comment from '../../../assets/icons/ic_send_comment.svg'
import { useAppSelector } from '../../../app/hooks'
import usePostEvent from '../../../hooks/usePostEvent'
import { User, childrenComment } from './CommentsModal'

type editCommentProps = {
    profileIcon: string
    commentId: number
    username: string
    newsFeedId: number
    parentCommentId: number
    editCommentHandler: (commentId: number, newComment: string) => void
    initialContent: string
} & User

//comment init values types
type initialValuesType = {
    comment: string
}

const EditComment: React.FC<editCommentProps> = ({
    profileIcon,
    commentId,
    username,
    newsFeedId,
    initialContent,
    parentCommentId,
    editCommentHandler,
    firstName,
    lastName,
    profilePicture,
    userName,
    id,
}) => {
    const { data: loginData } = useAppSelector((state) => state.loginData)
    // edit promise
    const { loading, data, apiDataPromise, error } = usePostEvent()

    // edit comment init values
    const initialValues: initialValuesType = {
        comment: initialContent,
    }
    // edit comment submit
    const onSubmit = async (values: initialValuesType, { resetForm }: any) => {
        editCommentHandler(commentId, values.comment)
        const commentContent = values.comment
        resetForm()
        apiDataPromise(edit_comments_url, {
            parentCommentId: 0,
            commentId,
            newsFeedId,
            commentContent,
        })
    }

    // validation schema
    const validationSchema = Yup.object({
        comment: Yup.string().required('field is required'),
    })

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
                        <div className="edit-container">
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
                                    placeholder="Edit"
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

export default EditComment
