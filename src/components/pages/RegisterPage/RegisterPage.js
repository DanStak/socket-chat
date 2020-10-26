import React from 'react';
import PageContainer from "../../common/PageContainer";
import Form from "../../common/Form";
import {Link} from "react-router-dom";

const RegisterPage = () => {
  return (
    <PageContainer className='login-page'>
      <Form
        title='REGISTER'
        requestUrl='/register'
      />
      <Link to='/'>
        <p className='mt-4'>Back to Log In</p>
      </Link>
    </PageContainer>
  );
};

export default RegisterPage;
