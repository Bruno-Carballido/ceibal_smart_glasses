"use client";

import PropTypes from 'prop-types';
import { useRef } from 'react';
import { SnackbarProvider as NotistackProvider } from 'notistack';
// @mui
import StyledNotistack from './styles';

// ----------------------------------------------------------------------

SnackbarProvider.propTypes = {
  children: PropTypes.node,
};

export default function SnackbarProvider({ children }) {

  const notistackRef = useRef(null);

  return (
    <>
      <StyledNotistack />

      <NotistackProvider
        ref={notistackRef}
        dense
        maxSnack={5}
        preventDuplicate
        autoHideDuration={3000}
        variant="success" // Set default variant
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {children}
      </NotistackProvider>
    </>
  );
}