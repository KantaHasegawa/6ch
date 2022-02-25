import { Box, Container } from '@mui/material';
import Head from 'next/head';
import React, { ReactNode } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Navbar></Navbar>
      <Container maxWidth='xl'>
        <Box sx={{ paddingTop: '2rem' }}>{children}</Box>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
