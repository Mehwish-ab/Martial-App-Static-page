import { Link } from 'react-router-dom'
import CustomLinkStyle from './style'

type linkTypes = {
    link: string
    title: string
    color: string
    fontSize?: string
    textDecoration?: string
    fontFamily?: string
}

const CustomLink: React.FC<linkTypes> = ({
    link,
    title,
    color = 'balck',
    fontSize = '16px',
    textDecoration = 'none',
    fontFamily = 'EnnVisions',
}) => {
    return (
        <CustomLinkStyle
            color={color}
            fontSize={fontSize}
            textDecoration={textDecoration}
            fontFamily={fontFamily}
        >
            <Link to={link} color="red">
                {title}
            </Link>
        </CustomLinkStyle>
    )
}

export default CustomLink
