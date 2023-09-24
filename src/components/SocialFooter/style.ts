import styled from 'styled-components';
import { whiteColor } from '../GlobalStyle';

export const SocialFooterStyled=styled.div`
position:fixed; 
width:100% ;
bottom:0; 
z-index:20;
.hero-footer{
background-color: ${whiteColor};
box-shadow: 0px -2px 6px #00000029;
.icon{
cursor: pointer;
&:not(:first-child){
margin-left: 12px;
}
}
}

`