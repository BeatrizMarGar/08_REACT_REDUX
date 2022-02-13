import React from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';

import Layout from '../../layout';
import AdvertDetail from './AdvertDetail';
import { getAd } from '../../../store/selectors';
import {loadSingleAd, RemoveAd } from '../../../store/actions';
import useStoreAction from '../../../hooks/StoreActions';
import useStoreData from '../../../hooks/useStoreData';

function AdvertPage({}) {
  const { advertId } = useParams();
  //preparo llamr al anuncio cargado
  const loadAds = useStoreAction(loadSingleAd)
  // Preparo eliminar anuncios
  const deleteAds = useStoreAction(RemoveAd)
  const history = useHistory();
  const getAdvertById = useStoreData( state => getAd(state, advertId));
//const dispatch = useDispatch()


React.useEffect(() => {
  loadAds(advertId)
}, [loadAds, advertId]);

  const handleDelete = () => {
    deleteAds(advertId)
  };

  return (

    <Layout>
      {getAdvertById && <AdvertDetail {...getAdvertById} onDelete={handleDelete} />}
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