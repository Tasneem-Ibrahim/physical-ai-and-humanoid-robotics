import React from 'react';
import NavbarLayout from '@theme/Navbar/Layout';
import NavbarContent from '@theme/Navbar/Content';
import AuthButton from './AuthButton';

export default function Navbar(): JSX.Element {
  return (
    <NavbarLayout>
      <NavbarContent />
      <div style={{ position: 'absolute', right: '1rem' }}>
        <AuthButton />
      </div>
    </NavbarLayout>
  );
}
