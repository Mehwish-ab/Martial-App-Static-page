import { FallbackProps } from 'react-error-boundary'
import CustomButton from '../../components/CustomButton/CustomButton'
import { primaryColor } from '../../components/GlobalStyle'
import { ErrorPageStyle } from './style'

const ErrorPage = (props: FallbackProps) => {
    const { error, resetErrorBoundary } = props
    return (
        <ErrorPageStyle>
            <div>
                <h1>Error!!</h1>
                <p>{error.message}</p>
                <CustomButton
                    bgcolor={primaryColor}
                    color="white"
                    padding="8px 8px"
                    width="50%"
                    type="button"
                    title="Reload"
                    margin="auto"
                    fontSize="16px"
                    clicked={resetErrorBoundary}
                />
            </div>
        </ErrorPageStyle>
    )
}

export default ErrorPage
