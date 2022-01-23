import React from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';

import Layout from '../../layout';
import AdvertDetail from './AdvertDetail';
import { getAdvert, deleteAdvert } from '../service';
import useQuery from '../../../hooks/useQuery';
import useMutation from '../../../hooks/useMutation';
import { useDispatch } from 'react-redux';
import {loadSingleAd, RemoveAd } from '../../../store/actions';

function AdvertPage({}) {
  const { advertId } = useParams();
  const history = useHistory();
  const getAdvertById = React.useCallback(
    () => getAdvert(advertId),
    [advertId],
  );
const dispatch = useDispatch()


React.useEffect(() => {
dispatch(loadSingleAd(advertId))
}, []);
/*
  const dispatch = useDispatch();
  dispatch(loadSingleAd(advertId))
  advertinfo = advertId
*/
//const HandlegetAd = useSelector(getAd(...state, advertId))
/*  React.useEffect(() => {
    getAdvertById()
  });
*/
  const { isLoading, error, data: advert } = useQuery(getAdvertById);
  const mutation = useMutation(deleteAdvert);

  const handleDelete = () => {
    dispatch(RemoveAd(advertId))
    mutation.execute(advertId).then(() => history.push('/'));
  };

  if (error?.statusCode === 401 || mutation.error?.statusCode === 401) {
    return <Redirect to="/login" />;
  }

  if (error?.statusCode === 404) {
    return <Redirect to="/404" />;
  }

  return (

    <Layout {...advert}>
      {advert && <AdvertDetail {...advert} onDelete={handleDelete} />}
    </Layout>
  );
}

export default AdvertPage 
/*
const mapDispatchToProps = (dispatch, ownProps) => ({
  getAd: () => dispatch(loadSingleAd(ownProps.advertId)) 
  //dispatch(loadSingleAd(ownProps.advertinfo)) 
})


const mapStateToProps = (state, ownProps) => ({
  //ads: getAd(state, ownProps.getAdvert),
  //ads: getAd(state, ownProps.getAdvert.advertId),
  ads: getAd(state, ownProps.getAdvert.useParams.advertId),
  ...getUi(state),
})


export default connect(mapDispatchToProps)(AdvertPage);

//export default connect(mapStateToProps)(AdvertPage); */