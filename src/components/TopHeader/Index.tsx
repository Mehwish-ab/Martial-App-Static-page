import { Container } from "./style";
import { Link } from "react-router-dom";

const Index = ({
  name = null,
  icon = null,
  navigateScreen,
}: {
  name: string | null;
  icon: string | null;
  navigateScreen: any;
}) => {
  return (
    <Container>
      <Link to="#" onClick={() => navigateScreen()}>
        {icon}
      </Link>
      <p>{name}</p>
    </Container>
  );
};

export default Index;
