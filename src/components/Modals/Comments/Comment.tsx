/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseImgContainer } from '../../GlobalStyle'
import { childrenComment, commentTypes } from './CommentsModal'
import Replybox from './Replybox'
import type { MenuProps } from 'antd'
import { useState } from 'react'
import {
    authorizationToken,
    delete_comment_url,
    edit_comments_url,
} from '../../../utils/api_urls'
import axios from 'axios'
import { useAppSelector } from '../../../app/hooks'
import { useParams } from 'react-router-dom'
import placeholder from '../../../assets/icons/ic_use_placeholder.svg'
import usePostEvent from '../../../hooks/usePostEvent'
import EditComment from './EditComment'
import { truncateString } from '../../../utils/utilities'
import getTimeAgo from '../../Custom/GetTimeAgo'

type commentProps = {
    newsFeedId?: number
    children?: React.ReactNode
    editPromiseHandler: (commentId: number, commentContent: string) => void
    showReplyToggler: (id: number) => void
    replyCommentHandler: (
        commentId: number,
        newComment: childrenComment
    ) => void
    showEditToggler: (id: number) => void
    editCommentHandler: (commentId: number, newComment: string) => void
    deleteCommentFilter: (id: number) => void
    initialContent: string
} & commentTypes

// SlOptionsVertical
const Comment: React.FC<commentProps> = ({
    children,
    editPromiseHandler,
    newsFeedId,
    commentContent,
    id: commentId,
    showReply,
    showReplyToggler,
    replyCommentHandler,
    showEdit,
    showEditToggler,
    initialContent,
    editCommentHandler,
    createdDateTime,
    deleteCommentFilter,
    user: { firstName, lastName, profilePicture, userName, id: userId },
}) => {
    const [open, setOpen] = useState(false)
    const [editCommentLoading, seteditCommentLoading] = useState(false)
    const [editCommentData, setEditCommentData] = useState({})
    const [editCommentError, setEditCommentError] = useState('')
    const [deleteCommentLoading, setDeleteCommentLoading] = useState(false)
    const [deleteCommentData, setDeleteCommentData] = useState({})
    const [deleteCommentError, setDeleteCommentError] = useState('')
    const { id: newfeedId } = useParams()
    const { loading, apiDataPromise, data, error } = usePostEvent()

    // login data
    const { data: loginData } = useAppSelector((state) => state.loginData)

    // edit comment promise
    const editCommentPromise = async (_newsFeedId: number): Promise<void> => {
        try {
            setEditCommentData(true)
            const { data: data2 } = await axios.post(
                edit_comments_url,
                {
                    newsFeedId,
                    commentContent: 'paid',
                    commentId: commentId,
                    parentCommentId: commentId,
                },
                {
                    headers: {
                        ...authorizationToken(loginData!),
                    },
                }
            )
            setEditCommentData(data2.results)
            setEditCommentData(false)
            // eslint-disable-next-line @typescript-eslint/no-shadow
        } catch (error: any) {
            console.log(error)
            setEditCommentError(error.response.data.responseMessage)
            setEditCommentData(false)
        }
    }

    // delete comment promise
    const deleteCommentPromise = async (newsFeedId_: number): Promise<void> => {
        try {
            setDeleteCommentLoading(true)
            const { data: data3 } = await axios.post(
                delete_comment_url,
                {
                    newsFeedId,
                    commentIds: commentId,
                },
                {
                    headers: {
                        ...authorizationToken(loginData!),
                    },
                }
            )
            setDeleteCommentData(data3.results)
            setDeleteCommentLoading(false)
            // eslint-disable-next-line @typescript-eslint/no-shadow
        } catch (error: any) {
            console.log(error)
            setDeleteCommentError(error.response.data.responseMessage)
            setDeleteCommentLoading(false)
        }
    }

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        if (e.key === '1' && newfeedId) {
            editCommentPromise(+newfeedId)
        } else {
            deleteCommentPromise(+newfeedId!)
        }
        setOpen(false)
    }

    return (
        <>
            <div className="d-flex align-items-center">
                <article className="comment">
                    {profilePicture ? (
                        <BaseImgContainer
                            className="mb-0 img-container rounded-circle"
                            img_url={profilePicture}
                            alt={`${firstName} ${lastName}`}
                        />
                    ) : (
                        <img
                            height={52}
                            width={52}
                            src={placeholder}
                            alt={firstName}
                        />
                    )}

                    <div>
                        <div className="profile">
                            <h6 className="mb-1">{firstName}</h6>
                            <p className="mb-0">
                                {truncateString(commentContent, 220)}
                            </p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="info-container my-1 ms-2">
                                {/* <span className="cursor-pointer">like</span> */}
                                <span
                                    className="cursor-pointer reply"
                                    onClick={() => showReplyToggler(commentId)}
                                >
                                    reply
                                </span>
                                {loginData?.userDetails.id === userId && (
                                    <span
                                        className="cursor-pointer edit"
                                        onClick={() =>
                                            showEditToggler(commentId)
                                        }
                                    >
                                        Edit
                                    </span>
                                )}
                                {loginData?.userDetails.id === userId && (
                                    <span
                                        className="cursor-pointer delete"
                                        onClick={() => {
                                            deleteCommentFilter(commentId)
                                            apiDataPromise(delete_comment_url, {
                                                newsFeedId: 12,
                                                commentIds: commentId,
                                            })
                                        }}
                                    >
                                        Delete
                                    </span>
                                )}
                            </div>
                            <span className="time">
                                {createdDateTime
                                    ? getTimeAgo(createdDateTime)
                                    : 'just now'}
                            </span>
                        </div>
                    </div>
                </article>
            </div>
            {children}
            {showReply && (
                <div className="reply-comment">
                    <Replybox
                        profileIcon={profilePicture}
                        commentId={commentId}
                        username={userName}
                        replyCommentHandler={replyCommentHandler}
                        parentCommentId={commentId}
                        newsFeedId={newsFeedId!}
                        firstName={firstName}
                        lastName={lastName}
                        profilePicture={profilePicture}
                        userName={userName}
                        id={userId}
                    />
                </div>
            )}
            {showEdit && (
                <div className="edit-comment">
                    <EditComment
                        profileIcon={profilePicture}
                        commentId={commentId}
                        username={userName}
                        editCommentHandler={editCommentHandler}
                        parentCommentId={commentId}
                        newsFeedId={newsFeedId!}
                        firstName={firstName}
                        lastName={lastName}
                        profilePicture={profilePicture}
                        userName={userName}
                        id={userId}
                        initialContent={initialContent}
                    />
                </div>
            )}
        </>
    )
}

export default Comment
