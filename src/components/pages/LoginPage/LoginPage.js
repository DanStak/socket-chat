import React from 'react';
import Form from '../../common/Form';
import PageContainer from "../../common/PageContainer";
import { Link } from "react-router-dom";
import LOCAL_STORAGE_ITEMS from "../../../configs/local-storage-items";
import {setInLocalStorage} from "../../../utils/localStorage";

const LoginPage = (props) => {

  const redirectToConversation = (data) => {
    setInLocalStorage(LOCAL_STORAGE_ITEMS.USER, data.user)
    props.history.push('/conversation')
  }

  return(
    <PageContainer className='login-page'>
      <Form
        title='LOG IN'
        requestUrl='/login'
        onFinish={redirectToConversation}
      />
      <Link to='/register'>
        <p className='mt-4'>Don't have account?</p>
      </Link>
    </PageContainer>
  );
}

export default LoginPage;
