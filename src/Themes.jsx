import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "white",
  fontColor: "black",
};

export const darkTheme = {
  body: "#1a1a1a",
  fontColor: "white",
};

export const GlobalStyles = createGlobalStyle`
	* {
		background-color: ${(props) => props.theme.body};
	}
`;
