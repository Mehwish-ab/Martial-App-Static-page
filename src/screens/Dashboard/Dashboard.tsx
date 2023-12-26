import { Container } from 'react-bootstrap'
import RoleAndCommisions from './RoleAndCommisions'
import WeeklyTotalIncome from './WeeklyTotalIncome'

const Dashboard = () => {
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
