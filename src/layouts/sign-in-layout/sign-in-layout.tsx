import React, { useState } from 'react';
import image from 'assets/img/login-bg-image.jpg';
import logo from 'assets/img/logo-white.svg';
import styled from 'styled-components';
import CustomerSignIn from 'views/auth/sign-in/customer/customer-sign-in';
import { colors } from 'styles/variables';
import CheckUserType from 'views/auth/sign-in/check-user-type';
import DriverSignIn from 'views/auth/sign-in/driver/driver-sign-in';

export const SignInLayoutWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${colors.green_5};
`;

export const SignInImageWrapper = styled.div`
  width: 50%;
  height: 100vh;
  max-width: 705px;
  background-repeat: no-repeat;
  background-position-x: -25px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  img {
    margin-top: 32px;
    margin-left: 75px;
  }
`;

const SignInLayout = () => {
  const [type, setType] = useState<'customer' | 'driver' | ''>('');

  const handleChangeUserType = (val: 'customer' | 'driver' | '') => {
    setType(val);
  };
  return (
    <SignInLayoutWrapper>
      <SignInImageWrapper style={{ backgroundImage: `url(${image})` }}>
        <img src={logo} alt="Logo" />
      </SignInImageWrapper>
      {type === '' && <CheckUserType onChange={handleChangeUserType} />}
      {type === 'customer' && <CustomerSignIn />}
      {type === 'driver' && <DriverSignIn />}
    </SignInLayoutWrapper>
  );
};

export default SignInLayout;
