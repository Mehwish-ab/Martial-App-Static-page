import { Helmet } from 'react-helmet'

type HeadProps = {
    title: string
}
const Head = ({ title }: HeadProps): JSX.Element => {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    )
}

export default Head
