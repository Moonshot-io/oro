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
    h1: {
      fontSize: string,
      fontWeight: number,
    },
    h2: {
      fontSize: string,
      fontWeight: number,
      color: string
    },
    h3: {
      fontSize: string,
      fontWeight: number,
    },
    h4: {
      fontSize: string,
      fontWeight: number,
    },
    h5: {
      fontSize: string,
      fontWeight: number,
    },
    h6: {
      fontSize: string,
      fontWeight: number,
    },
    body1: string,
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
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          paddingRight: string,
        }
      }
    }
  }
}
}

const dark = createTheme({
  palette: {
    primary: {
      main: '#1A2027', // main dark
      contrastText: '#03a9f4', // highlight
    },
    secondary: {
      main: '#232c35', // off shade dark
      contrastText: '#F0F2F5', // off white
    },
    text: {
      primary: '#F0F2F5',
    },
    mode: 'dark',
  },
  typography: {
    fontFamily: 'Roboto',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 550,
      marginTop: '2.25rem',
      marginBottom: '1rem',
      color: '#03a9f4'
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 450,
      marginTop: '2.25rem',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 425,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 400,
    },
    body1: {
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
          },
          input: {
            '&:-webkit-autofill': {
              '-webkit-box-shadow': '0 0 0 100px #000 inset',
            },
            '-webkit-text-fill-color': '#a352ff'
          },
        },
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          paddingRight: '0px',
        }
      }
    },
  }
});

const light = createTheme({
  palette: {
    primary: {
      main: '#F0F2F5',
      contrastText: '#03a9f4',
    },
    secondary: {
      main: '#ffffff',
      contrastText: '#1A2027',
    },
    text: {
      primary: '#1A2027',
    },
    mode: 'light',
  },
  typography: {
    fontFamily: 'Roboto',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 550,
      marginTop: '2.25rem',
      marginBottom: '1rem',
      color: '#03a9f4',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 450,
      marginTop: '2.25rem',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 425,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 400,
    },
    body1: {
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
          },
          input: {
            '&:-webkit-autofill': {
              '-webkit-box-shadow': '0 0 0 100px #000 inset',
            },
            '-webkit-text-fill-color': '#a352ff'
          }
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          paddingRight: '1px',
        }
      }
    },
  },
});



const GlobalTheme = createGlobalStyle`

 body {
    font-family: Roboto;
    text-align: center;
    margin: 0;
    height: 100vh;
    background: ${(props: themeType) => props.theme.palette.primary.main};
    color: ${(props) => props.theme.palette.secondary.contrastText};
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
  color: ${(props) => props.theme.palette.primary.contrastText};
}

.home-icons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.palette.primary.contrastText};
}

.page-body {
  padding-left: 20px;
  padding-right: 20px;
}

.socials {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: left;
}

.home-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.avatar-submit {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.home-text-box {
  align-text: left;
  background-color: ${ (props) => props.theme.palette.mode === 'dark' ? '#232c35' : '#FFFFFF'};
  padding-bottom: 10px;
  max-width: 80%;
  margin: auto;
  margin-left:
}

.home-text {
  color: ${ (props) => props.theme.palette.mode === 'dark' ? '#F0F2F5' : '#232c35'};
}

.comment {
  margin-right: 10px;
  margin-left: 10px;
}


.MuiTypography-h2 {
  margin-top: 100px;
}

.commentsPaperLight {
  background: #F0F2F5;
  word-break: break-all;
  word-wrap: break-word;
  width: auto;
  border-radius: 10px;
}
// .uploadButton :hover{
//   border: 2px solid black;
// }

.commentsPaperDark {
  background: #1A2027;
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

/* #profile-photo {
  opacity: 0.5;
}

#profile-photo:hover {
  opacity: 1.0;
} */

#photo-dialog {
  margin: 0px;
}

.chat-list{
  float:left;
}

.chat{
  float:right;
}

#social-media {
  justify-content: center;
}

.commentTime {
  float:left;
}

.editDelete {
  float:right;
}

.edit {
  margin: 0px 5px 0px 0px
}

.edit:hover {
  font-weight: 900;
}


.delete {
  margin: 0px 0px 0px 5px;
}
.delete:hover {
  font-weight: 900;
}

.comments {
  margin: 0px 0px 5px
}

#comments-container {
  margin: auto;
}

#google-button {
  display: flex;
  justify-content: center;
}

.css-6hp17o-MuiList-root-MuiMenu-list {
  background: ${(props) => props.theme.palette.secondary.main};
}

a:-webkit-any-link {
  color: ${(props) => props.theme.palette.secondary.contrastText};
}

.css-vj1n65-MuiGrid-root {
margin-top: 20px;
}

.css-v2i77y-MuiInputBase-input-MuiFilledInput-input {
  background: ${(props) => props.theme.palette.primary.main};
}

.css-l31d51-MuiInputBase-root-MuiOutlinedInput-root {
  padding-right: 0px;
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

.icon-buttons {
  padding: 5px;
}

.css-1q30djv-MuiListItem-root {
  padding-bottom: 2px;
}

// .css-11lq3yg-MuiGrid-root {
//   padding: 10px 12.5px 0px 0px;
// }

.notificationIMG {
  max-width: 100%;
  max-height: 50px;
}

.notificationBody {
  margin: auto;

}

.css-1a4m082-MuiCardContent-root:last-child {
  padding-bottom: 0px;
}

.css-1drgtl0-MuiButtonBase-root-MuiIconButton-root {
  font-size: 1rem;
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
