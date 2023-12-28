import { Container } from 'react-bootstrap'
import RoleAndCommisions from './RoleAndCommisions'
import WeeklyTotalIncome from './WeeklyTotalIncome'

const Dashboard = (): JSX.Element => {
    return (
        <>
            <Container>
                <RoleAndCommisions />
                <WeeklyTotalIncome />
            </Container>
        </>
    )
}

export default Dashboard
