import { css } from '@emotion/react'

export const globalStyles = css`
  * { 
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
    height: 100%;
  }
  body {
    font-family: 'Titillium Web';
    font-size: 1.6rem;
    cursor: default;
    height: 100%;
  }
  h1, h2, h3, h4, h5, h6,button {
    font-family: 'Poppins';
  }
  a {
    text-decoration: none;
  }
  li {
    list-style: none;
  }`