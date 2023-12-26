import { ReactNode } from 'react'

type CardProps = {
    children: ReactNode
    className: string
}
const Card = ({ className, children }: CardProps) => {
    return (
        <div
            className={`bg-white d-flex justify-content-between flex-column custom-card ${className}`}
        >
            {children}
        </div>
    )
}

export default Card
