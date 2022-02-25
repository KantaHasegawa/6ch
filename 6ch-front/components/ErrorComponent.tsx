import { Box, Typography } from '@mui/material';

const ErrorComponent = (error: any) => {
  console.log(error);
  return (
    <Box
      color='white'
      sx={{
        textAlign: 'center',
        backgroundColor: '#F4909D',
        padding: '2rem',
        margin: '1rem',
        borderRadius: '50px',
      }}
    >
      <Typography>エラーが発生しました</Typography>
    </Box>
  );
};

export default ErrorComponent;
