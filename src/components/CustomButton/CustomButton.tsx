import { Button } from "antd";
import { fontFamilyMedium } from "../GlobalStyle";
import CustormButtonStyle from "./style";

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
