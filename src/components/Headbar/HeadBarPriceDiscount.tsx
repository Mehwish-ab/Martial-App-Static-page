import { HeadBarPriceDiscountStyle } from "./style";

type headBarPriceDiscount = {
  displayName: string;
  subscriptionAmount: string;
  currencySymbol: string;
  subTotal: string;
};
const HeadBarPriceDiscount: React.FC<headBarPriceDiscount> = ({
  currencySymbol,
  displayName,
  subTotal,
  subscriptionAmount,
}) => {
  return (
    <HeadBarPriceDiscountStyle className="property-intro d-flex justify-content-between">
      <p className="heading">{displayName}</p>
      {subscriptionAmount === "0.0" ? (
        <span className="amount-fee">Free</span>
      ) : (
        <p className="amount-fee">
          <span className="me-1">
            {currencySymbol} {subTotal}
          </span>
          <span className="text-decoration-line-through">
            {currencySymbol} {subscriptionAmount}
          </span>
        </p>
      )}
    </HeadBarPriceDiscountStyle>
  );
};

export default HeadBarPriceDiscount;
