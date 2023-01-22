import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";

export const darckTheme = createTheme({
    palette: {
        mode: 'dark',
        secondary: {
          main: '#32CD32'
        },
        error: {
          main: red.A400
        },
      },
      components: {
        MuiAppBar: {
          defaultProps: {
            elevation: 0
          },
          styleOverrides: {
            root: {
              backgroundColor: '#4a148c'
            }
          }
        }
      }
  })