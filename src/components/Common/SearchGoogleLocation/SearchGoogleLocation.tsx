import React, { useState } from "react";
import FormControl from "../../FormControl";
import { fontFamilyMedium } from "../../GlobalStyle";
import searchIcon from "../../../assets/icons/ic_search.svg";
import { Input, List } from "antd";

interface SearchGoogleLocationProps {
  name: string;
  label: string;
  placeholder: string;
  setFieldValue: (val: any) => void;
  className: string;
  value: string;
}
const SearchGoogleLocation = ({
  name,
  label,
  value,
  placeholder,
  className,
  setFieldValue,
}: SearchGoogleLocationProps) => {
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState(value);
  const handleOnChange = async (e: any) => {
    setSearchValue(e.target.value);

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${e.target.value}&key=AIzaSyC6PLT5-mrVFJcFqFixXZTW4d7Fj1EZg3Q`
    );

    const data = await response.json();

    if (data && data.predictions && data.predictions.length > 0) {
      let arr: any = [];
      data.predictions.forEach((item: any) => {
        arr.push({ label: item.description, value: item.place_id });
      });

      setOptions(arr);
    } else {
      setOptions([]);
    }
  };

  const handleClick = (e: any) => {
    setFieldValue(e.target.innerText);
    setSearchValue(e.target.innerText);
    setOptions([]);
  };
  return (
    <div>
      <label htmlFor="" className="ant-input-label">
        {label}
      </label>
      <Input
        name={name}
        className={className}
        type={"text"}
        placeholder={placeholder}
        suffix={<img src={searchIcon} alt="search icon" />}
        value={searchValue}
        onChange={handleOnChange}
        style={{ borderRadius: 10 }}
      />
      {options && options.length > 0 && (
        <List
          size="small"
          bordered
          dataSource={options}
          renderItem={(item: any) => (
            <List.Item onClick={handleClick} style={{ cursor: "pointer" }}>
              {item.label}
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default SearchGoogleLocation;
