import { LoginContainer } from './style'
// eslint-disable-next-line import/no-unresolved
import ic_logo from '../../Assets/icons/ic_logo.svg'
import { useNavigate } from 'react-router-dom'

const Index = ({
    handleCancel,
    userDetail,
    deleteUser,
    toLocation,
}: any): JSX.Element => {
    const navigate = useNavigate()
    const closeModal = (): void => {
        handleCancel()
    }
    const handleDelete = (): void => {
        deleteUser()
        setTimeout(() => {
            handleCancel()
            navigate(toLocation)
        }, 300)
    }

    return (
        <LoginContainer>
            <div className="login-container-card">
                <div className="login-container-card-logo">
                    <img src={ic_logo} alt="ic_logo" className="logo" />
                </div>
                <h5 className="question-text">
                    {' '}
                    Do You Really Want to Delete!{' '}
                </h5>
                {/* <p className="inquiry-delete">
          <span className="delete-user">Improve Canada Mall</span> is delete
          <br />
          successfully <span className="delete-by">by O'Neil McLean</span>
        </p> */}

                <p>{userDetail.name}</p>
                <div className="login-container-card-btn">
                    <button
                        className="login-container-card-btn-yes"
                        onClick={() => handleDelete()}
                    >
                        Yes!
                    </button>
                    <button
                        className="login-container-card-btn-no"
                        onClick={() => closeModal()}
                    >
                        cancel
                    </button>
                </div>
            </div>
        </LoginContainer>
    )
}

export default Index
