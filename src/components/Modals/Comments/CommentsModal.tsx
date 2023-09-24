import { Form } from "antd";
import axios from "axios";
import { Formik } from "formik";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import {
  add_comments_url,
  authorizationToken,
  edit_comments_url,
  get_comments_url,
} from "../../../utils/api_urls";
import Loader from "../../Loader/Loader";
import NoDataAvailable from "../../NoData/NoDataAvailable";
import Comment from "./Comment";
import CommentsStyle from "./style.";
import * as Yup from "yup";
import FormControl from "../../FormControl";
import NewsfeedModal from "../NewsFeedModal";
import CustomModal from "../../Modal/CustomModal";
import ic_comment from "../../../assets/icons/ic_send_comment.svg";
import NoComments from "../../NoData/NoDataModal";
import ChildComment from "./ChildComment";

// comments result types

export type commentTypes = {
  id: number;
  showReply: boolean;
  showEdit: boolean;
  commentContent: string;
  createdDateTime: string;
  user: {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
  childrenComments: childrenComment[];
};

export interface childrenComment {
  id: number;
  commentContent: string;
  createdDateTime: string;
  user: User;
  childrenComments: any[];
}

export interface User {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

type commentsResultTypes = {
  totalItems: number;
  comments: commentTypes[];
  totalPages: number;
  currentDateTime: string;
  currentPage: number;
};

//comment init values types
type initialValuesType = {
  comment: string;
};

// validation schema
const validationSchema = Yup.object({
  comment: Yup.string().required("field is required"),
});

type commentsModalProps = {
  readComments: boolean;
  turnOffCommenting: boolean;
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  newsFeedId: number;
  title: string;
};

const CommentsModal: React.FC<commentsModalProps> = ({
  readComments,
  turnOffCommenting,
  setIsModalVisible,
  isModalVisible,
  newsFeedId,
  title,
}) => {
  const [commentsData, setCommentData] = useState({} as commentsResultTypes);
  const { data: loginData } = useAppSelector((state) => state.loginData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addCommentLoading, setAddCommentLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom initially
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [commentsData]);

  console.log({ newsFeedId }, "newsfeed id in comment modal");

  // show reply toggler
  const showReplyToggler = (id: number) => {
    const updatedComments = commentsData.comments.map((comment: commentTypes) =>
      comment.id == id
        ? {
            ...comment,
            showEdit: false,
            showReply: !comment.showReply,
          }
        : comment
    );
    setCommentData({ ...commentsData, comments: updatedComments });
  };

  // show edit toggler
  const showEditToggler = (id: number) => {
    const updatedComments = commentsData.comments.map((comment: commentTypes) =>
      comment.id == id
        ? { ...comment, showReply: false, showEdit: !comment.showEdit }
        : comment
    );
    setCommentData({ ...commentsData, comments: updatedComments });
  };

  // add comment promise
  const addCommentsPromise = async (commentContent: string) => {
    try {
      setAddCommentLoading(true);
      const { data } = await axios.post(
        add_comments_url,
        {
          newsFeedId,
          commentContent,
          parentCommentId: 0,
        },
        {
          headers: {
            ...authorizationToken(loginData!),
          },
        }
      );
      setAddCommentLoading(false);
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.responseMessage);
      setAddCommentLoading(false);
    }
  };

  //   get comments Promise
  const getCommentsPromise = async () => {
    try {
      setLoading(true);
      const { data } = await axios(get_comments_url + newsFeedId, {
        headers: {
          ...authorizationToken(loginData!),
        },
      });
      setCommentData({
        ...data.results,
        comments: data.results.comments.map((comment: commentTypes) => ({
          ...comment,
          showReply: false,
          showEdit: false,
        })),
      });
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.responseMessage);
      setLoading(false);
    }
  };

  // get comments by useeffect
  useEffect(() => {
    getCommentsPromise();
  }, []);

  // edit comment promise
  const editPromiseHandler = async (
    commentId: number,
    commentContent: string
  ) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        edit_comments_url,
        {
          commentId,
          newsFeedId: newsFeedId!,
          commentContent,
        },
        {
          headers: {
            ...authorizationToken(loginData!),
          },
        }
      );
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.responseMessage);
      setLoading(false);
    }
  };

  // create comment init values
  const initialValues: initialValuesType = {
    comment: "",
  };
  // comment data submit
  const onSubmit = async (values: initialValuesType, { resetForm }: any) => {
    if (newsFeedId) {
      addCommentsPromise(values.comment);
      setCommentData({
        ...commentsData,
        comments: [
          ...commentsData.comments,
          {
            id: commentsData.comments.length + 1,
            commentContent: values.comment,
            createdDateTime: "",
            user: {
              id: loginData?.userDetails.id!,
              userName: loginData?.userDetails.username!,
              firstName: loginData?.userDetails.userFirstName!,
              lastName: loginData?.userDetails.userLastName!,
              profilePicture: loginData?.userDetails.profileImageURL,
            },
            showEdit: false,
            showReply: false,
            childrenComments: [],
          },
        ],
      });
      resetForm();
    }
  };
  console.log({ commentsData }, "data of comment");
  console.log({ loading });
  console.log({ error });

  // filter comment which are deleted
  const deleteCommentFilter = (commentId: number) => {
    const oldCommentsData = { ...commentsData };
    setCommentData({
      ...oldCommentsData,
      comments: oldCommentsData.comments.filter(({ id }) => id !== commentId),
    });
  };

  const deleteChildCommentFilter = (
    commentId: number,
    childCommentId: number
  ) => {
    const oldCommentsData = structuredClone(commentsData);
    setCommentData({
      ...oldCommentsData,
      comments: oldCommentsData.comments.map((comment: any) => {
        if (comment.id === commentId) {
          const newChildComments = comment.childrenComments.filter(
            (childComment: any) => childComment.id !== childCommentId
          );
          return {
            ...comment,
            childrenComments: newChildComments,
          };
        }
        return comment;
      }),
    });
  };

  // reply comment handler
  const replyCommentHandler = (
    commentId: number,
    newComment: childrenComment
  ) => {
    const oldCommentsData = { ...commentsData };
    setCommentData({
      ...oldCommentsData,
      comments: oldCommentsData.comments.map((comment: any) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            childrenComments: [...comment.childrenComments, newComment],
          };
        }
        return comment;
      }),
    });
  };

  // edit comment handler
  const editCommentHandler = (commentId: number, newComment: string) => {
    const oldCommentsData = { ...commentsData };
    setCommentData({
      ...oldCommentsData,
      comments: oldCommentsData.comments.map((comment: any) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            commentContent: newComment,
            showEdit: false,
          };
        }
        return comment;
      }),
    });
  };

  console.log({ commentsData }, "data of comment");

  return (
    <CustomModal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      showCloseBtn={false}
      onCancel={() => {}}
    >
      <NewsfeedModal
        title={title}
        closeHandler={() => setIsModalVisible(false)}
      >
        {loading ? (
          <Loader />
        ) : error ? (
          <NoDataAvailable title={error} />
        ) : (
          <CommentsStyle>
            <div>
              {!error && commentsData.comments.length === 0 ? (
                <NoComments error="No comment available" />
              ) : (
                <div className="post-comments" ref={containerRef}>
                  {commentsData.comments.map((comment: any) => (
                    <div key={comment.id}>
                      <Comment
                        {...comment}
                        showReplyToggler={showReplyToggler}
                        replyCommentHandler={replyCommentHandler}
                        showEditToggler={showEditToggler}
                        editCommentHandler={editCommentHandler}
                        // editCommentHandler={editCommentHandler}
                        editPromiseHandler={editPromiseHandler}
                        newsFeedId={newsFeedId}
                        deleteCommentFilter={deleteCommentFilter}
                        initialContent={comment.commentContent}
                      />
                      {comment.childrenComments.map(
                        (childComment: childrenComment, index: number) => (
                          <ChildComment
                            showReply={false}
                            showEdit={false}
                            {...childComment}
                            parentCommentId={comment.id}
                            key={index}
                            showReplyToggler={showReplyToggler}
                            editPromiseHandler={editPromiseHandler}
                            newsFeedId={newsFeedId}
                            deleteChildCommentFilter={deleteChildCommentFilter}
                            deleteCommentFilter={deleteCommentFilter}
                            replyCommentHandler={replyCommentHandler}
                          />
                        )
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="add-comment-form">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formik) => {
                  console.log(formik.values);
                  return (
                    <Form
                      name="basic"
                      onFinish={formik.handleSubmit}
                      autoComplete="off"
                    >
                      <div className="d-flex mt-2 write-comment ">
                        <FormControl
                          control="input"
                          type="text"
                          disabled={turnOffCommenting}
                          padding="12px"
                          name="comment"
                          placeholder="Subject"
                          className={
                            formik.errors.comment && formik.touched.comment
                              ? "is-invalid"
                              : "customInput"
                          }
                        />
                        <div className="mt-1">
                          <button
                            type="submit"
                            disabled={turnOffCommenting}
                            className="add-comment-btn mt-2"
                          >
                            <img src={ic_comment} alt="send-comment" />
                          </button>
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </CommentsStyle>
        )}
      </NewsfeedModal>
    </CustomModal>
  );
};

export default CommentsModal;
