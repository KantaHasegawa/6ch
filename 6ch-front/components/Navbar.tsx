import {
  AppBar,
  Box,
  Toolbar,
  Tooltip
} from '@mui/material';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static' color='default'>
          <Toolbar>
            <Tooltip title="ホーム">
              <div style={{ display: "inline-block" }}>
                <Link href='/' passHref>
                  <a style={{ fontWeight: 'bold' }}>6ちゃんねる</a>
                </Link>
              </div>
            </Tooltip>
            <Tooltip title="過去ログ一覧">
              <div style={{ display: "inline-block", marginLeft: 'auto' }}>
                <Link href='/threads/not-active' passHref>
                  <a style={{ fontWeight: 'bold' }}>過去ログ</a>
                </Link>
              </div>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
};

export default Navbar;
