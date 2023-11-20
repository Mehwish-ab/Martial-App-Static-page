import { Button } from "antd";
import { fontFamilyMedium } from "../GlobalStyle";
import CustormButtonStyle from "./style";
import styled from "styled-components"

export type ButtonProps = {
  title: string;
  type: "button" | "submit" | "reset" | undefined;
  bgcolor: string;
  disabled?: boolean;
  width: string;
  color: string;
  padding: string;
  clicked?: () => void;
  form?: any;
  key?: string | number;
  fontSize?: string;
  fontFamily?: "EnnVisions" | "EnnVisionsMedium" | "EnnVisionsBold";
  margin?: string;
  icon?: React.ReactNode | null;
  border?: string;
  loading?: boolean;
  textTransform?: string;
  borderRadius?: string;
};

const CustomButton = ({
  title,
  type = "button",
  bgcolor,
  disabled,
  width,
  color,
  padding,
  clicked,
  form,
  key,
  fontSize = "16px",
  icon = null,
  fontFamily = fontFamilyMedium,
  margin = "auto",
  border = "none",
  loading = false,
  textTransform = "uppercase",
  borderRadius = "8px",
}: ButtonProps) => {
  return (
    <CustormButtonStyle
      bgcolor={bgcolor}
      color={color}
      width={width}
      padding={padding}
      fontSize={fontSize}
      fontFamily={fontFamily}
      margin={margin}
      border={border}
      textTransform={textTransform}
      borderRadius={borderRadius}
    >
      <Button
        disabled={disabled}
        form={form}
        key={key}
        onClick={clicked}
        htmlType={type}
        loading={loading}
        icon={icon}
      >
        {title}
      </Button>
    </CustormButtonStyle>
  );
};

export default CustomButton;

export const CustomDiv = styled.div`
  position: relative;
  display: flex;
  .instructorDateSection, .mainarrow, .dateRange {
    display: flex;
}
  .arrowleft, .arrowright, .dateRange, .dateToday {
    border-radius: 8px;
    border: 1px solid rgb(232, 232, 232);
    background: rgb(255, 255, 255);
    color: rgb(51, 51, 51);
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    padding: 10px 10px;
    margin-right: 20px;
    height: 40px;
    cursor: pointer;
}
.dateRange {
  p{
    margin-right: 10px;
    color: rgb(51, 51, 51);
    font-size: 15px;
  }
  img{
    margin-left: 10px;
  }
}
`;
