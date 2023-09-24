import ItemInfoStyle from "./style";

const ItemInfo = ({
  heading,
  title,
}: {
  heading: string;
  title: string | null | number;
}) => (
  <ItemInfoStyle>
    <p className="heading">{heading}</p>
    {title && <h6 className="title">{title}</h6>}
  </ItemInfoStyle>
);

export default ItemInfo;
