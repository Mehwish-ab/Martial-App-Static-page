import { InputErrorMessage } from './GlobalStyle'
const Errormsg = (props: any): JSX.Element => {
    return <InputErrorMessage>{props.children}</InputErrorMessage>
}
export default Errormsg
