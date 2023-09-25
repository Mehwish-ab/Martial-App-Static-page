import google from "../../assets/icons/ic_google.svg";
import facebook from "../../assets/icons/ic_facebook.svg";
import microsoft from "../../assets/icons/ic_microsoft.svg";
import apple from "../../assets/icons/ic_apple.svg";
import discord from "../../assets/icons/ic_discord.svg";

import styled from "styled-components";

const SocalAuth = () => {
  return (
    <Wrapper>
      {[
        {
          icon: google,
          title: "Goolge",
        },
        {
          icon: facebook,
          title: "Facebook",
        },
        {
          icon: apple,
          title: "Apple",
        },
        {
          icon: microsoft,
          title: "Microsoft",
        },
        {
          icon: discord,
          title: "Discord",
        },
      ].map(({ icon, title }, index) => (
        <div
          className="d-flex align-items-center gap-2 social-auth-btn"
          key={index}
        >
          <img src={icon} alt={title} />
          {/* <p className="mb-0">{title}</p> */}
        </div>
      ))}
    </Wrapper>
  );
};

export default SocalAuth;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 96%;
  gap: 10px;
  margin-top: 20px;

  .social-auth-btn {
    padding: 17px;
    border-radius: 10px;
    border: 1px solid #eaeaea;
    justify-content: center;
    cursor: pointer;
    p {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 425px){
      .social-auth-btn{
        padding: 10px;
      } 
    }
`;
