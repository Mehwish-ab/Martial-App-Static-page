import { ViewMoreStyled } from "./style";

type viewMoreDataProps = {
  viewMoreTask?: () => void;
  listing?: string;
};
const ViewMore: React.FC<viewMoreDataProps> = ({ listing, viewMoreTask }) => {
  return (
    <ViewMoreStyled>
      <div className="d-flex view-more">
        <p className="view-more-text" onClick={viewMoreTask}>
          {listing}
        </p>
        <div className="view-more-line" />
      </div>
    </ViewMoreStyled>
  );
};

export default ViewMore;
