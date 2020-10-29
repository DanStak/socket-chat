import React from 'react';
import PageContainer from "../../common/PageContainer";
import Form from "../../common/Form";
import {Link, Redirect} from "react-router-dom";
import {getFromLocalStorage} from "../../../utils/localStorage";
import LOCAL_STORAGE_ITEMS from "../../../configs/local-storage-items";

const RegisterPage = (props) => {
  const user = getFromLocalStorage(LOCAL_STORAGE_ITEMS.USER);

  if(user) {
    return (
      <Redirect to='/conversation'/>
    )
  }

  return (
    <PageContainer className='login-page'>
      <Form
        title='REGISTER'
        requestUrl='register'
        onFinish={() => props.history.push('/')}
      />
      <Link to='/'>
        <p className='mt-4'>Back to Log In</p>
      </Link>
    </PageContainer>
  );
};

export default RegisterPage;
