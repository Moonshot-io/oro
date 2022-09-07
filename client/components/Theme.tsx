import React, { useContext, ReactNode } from 'react';
import { createGlobalStyle } from 'styled-components';
import { StyledProvider } from '../styles/material';
import { ThemeContext } from '../context/ThemeContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface themeType {
  theme: {
  palette: {
    primary: {
      main: string,
      contrastText: string
    },
    secondary: {
      main: string,
      contrastText: string
    },
    text: {
      primary: string
    },
    mode: string
  },
  typography: {
    fontFamily: string,
    h6: {
      fontSize: string,
      fontWeight: number,
    },
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          palette: {
            action: {
              selected: string,
              hover: string,
              disabled: string
            }
          }
        }
      }
    }
  }
}
}

const dark = createTheme({
  palette: {
    primary: {
      main: '#1A2027',
      contrastText: '#F3F3F3',
    },
    secondary: {
      main: '#F3F3F3',
      contrastText: '#1A2027',
    },
    text: {
      primary: '#1A2027',
    },
    mode: 'dark',
  },
  typography: {
    fontFamily: 'Roboto',
    h6: {
      fontSize: '1rem',
      fontWeight: 400,
    },
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          palette: {
            action: {
              selected: '#E7A615',
              hover: '#FFD371',
              disabled: '#9B9B9B'
            }
          }
        }
      }
    }
  }
});

const light = createTheme({
  palette: {
    primary: {
      main: '#F3F3F3',
      contrastText: '#1A2027',
    },
    secondary: {
      main: '#1A2027',
      contrastText: '#F3F3F3',
    },
    text: {
      primary: '#F3F3F3',
    },
    mode: 'light',
  },
  typography: {
    fontFamily: 'Roboto',
    h6: {
      fontSize: '1rem',
      fontWeight: 400,
    },
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          palette: {
            action: {
              selected: '#E7A615',
              hover: 'blue',
              disabled: '#9B9B9B'
            }
          }
        }
      }
    }
  }
});



const GlobalTheme = createGlobalStyle`

 body {
    font-family: Roboto;
    text-align: center;
    margin: 0;
    height: 100vh;
    background: ${(props: themeType) => props.theme.palette.primary.main};
    color: ${(props) => props.theme.palette.primary.contrastText};
  }

@media only screen and (min-width: 600px){
body {
  font-family: Roboto;
  text-align: center;
  margin: 0;
  height: 100vh;
  padding-left: 20%;
  padding-right: 20%;
  background: ${(props) => props.theme.palette.primary.main};
  color: ${(props) => props.theme.palette.primary.contrastText};
}

}

.nav-icons {
  margin-right: 10px;
}

.comment {
  margin-right: 10px;
  margin-left: 10px;
}

.commentsPaperLight {
  background: #30363c;
  word-break: break-all;
  word-wrap: break-word;
  width: auto;
  border-radius: 10px;
}
// .uploadButton :hover{
//   border: 2px solid black;
// }

.commentsPaperDark {
  background: #dbdbdb;
  word-break: break-all;
  word-wrap: break-word;
  width: auto;
  border-radius: 10px;
}
.avatar {
    text-align: center;
    object-fit: cover;
    color: transparent;
    text-indent: 10000px;
    border-radius: 50%;
    overflow: hidden;
    width: 30px;
    height: 30px;
}

.MenuItem:hover {
  background-color: #1A76D2;
  color: #2e8b57;
}

.css-6hp17o-MuiList-root-MuiMenu-list {
  background: ${(props) => props.theme.palette.primary.contrastText};
}

a:-webkit-any-link {
  color: ${(props) => props.theme.palette.primary.main};
}

.css-vj1n65-MuiGrid-root {
margin-top: 20px;
}

.css-9425fu-MuiOutlinedInput-notchedOutline {
  border-color: ${(props) => props.theme.palette.primary.main};
}

.css-1xc75p7-MuiFormLabel-root-MuiInputLabel-root {
  color: ${(props) => props.theme.palette.primary.main};
}

.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
  color: ${(props) => props.theme.palette.primary.contrastText};
}

.css-v2i77y-MuiInputBase-input-MuiFilledInput-input {
  background: ${(props) => props.theme.palette.primary.main};
}

.css-1gb7w2s-MuiGrid-root {
color: ${(props) => props.theme.palette.primary.contrastText};
}

.css-r6wjqo-MuiTypography-root {
  text-align: left;
}

.css-1betqn-MuiAccordionSummary-content {
  justify-content: space-between;
}

`;
interface Props {
  children?: ReactNode
}
// Global Theme Export
export const Theme = ({ children }: Props) => {
  const themeContext = useContext(ThemeContext);
  const {mode} = themeContext;
  return (
    <ThemeProvider theme={mode == 'dark' ? dark : light}>
      <StyledProvider theme={mode == 'dark' ? dark : light}>
        <GlobalTheme />
        {children}
      </StyledProvider >
    </ThemeProvider>
  );
};
