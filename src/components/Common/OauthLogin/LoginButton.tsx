import { FC } from 'react'
interface Props {
    type: string
    alt: string
}

const LoginButton: FC<Props> = ({ type, alt }): JSX.Element => {
    return (
        <div className="d-flex align-items-center gap-2 social-auth-btn">
            <img src={type} alt={alt} />
            {/* <p className="mb-0">{title}</p> */}
        </div>
    )
}

export default LoginButton
