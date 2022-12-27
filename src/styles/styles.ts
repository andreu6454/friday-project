import { createTheme, Link, styled, TextField } from '@mui/material';
import { grey } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    background: {
      default: grey[100],
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        columnSeparator: {
          display: 'none',
        },
        columnHeader: {
          fontWeight: 700,
        },
        columnHeaderTitle: {
          fontWeight: 700,
        },
        columnHeaders: ({ theme }) => ({
          backgroundColor: theme.palette.grey[300],
        }),
        root: {
          backgroundColor: 'white',
        },
      },
    },
  },
});

export const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: ${({ theme }) => theme.palette.background.paper};
  }
`;
