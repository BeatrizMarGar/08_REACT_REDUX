import React from 'react';
import T from 'prop-types';
import Layout from '../../layout';
import NewAdvertForm from './NewAdvertForm';
import { createAd } from '../../../store/actions';
import useStoreAction from '../../../hooks/StoreActions';

function NewAdvertPage() {
  const createnewad = useStoreAction(createAd)

  return (
    <Layout>
      <NewAdvertForm onSubmit={createnewad} />
    </Layout>
  );
}

export default NewAdvertPage;
