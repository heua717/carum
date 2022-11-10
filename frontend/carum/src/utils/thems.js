import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: { fontFamily: "LeeSeoyun" },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: 'LeeSeoyun';
        font-style: normal;
        font-weight: normal;
        src: url(${"assets/LeeSeoyun.ttf"})
      }
      `,
    },
  },
});

export default theme;
