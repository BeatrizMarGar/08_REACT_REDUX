import React from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';

import Layout from '../../layout';
import AdvertDetail from './AdvertDetail';
import { getAdvert, deleteAdvert } from '../service';
import useQuery from '../../../hooks/useQuery';
import useMutation from '../../../hooks/useMutation';
import { connect, useSelector } from 'react-redux';
import { getAd, getUi } from '../../../store/selectors';
import { advert } from '../propTypes';

function AdvertPage() {
  const { advertId } = useParams();
  const history = useHistory();
  const getAdvertById = React.useCallback(
    () => getAdvert(advertId),
    [advertId],
  );

//const HandlegetAd = useSelector(getAd(...state, advertId))
/*  React.useEffect(() => {
    getAdvertById()
  });
*/
  const { isLoading, error, data: advert } = useQuery(getAdvertById);
  const mutation = useMutation(deleteAdvert);

  const handleDelete = () => {
    mutation.execute(advertId).then(() => history.push('/'));
  };

  if (error?.statusCode === 401 || mutation.error?.statusCode === 401) {
    return <Redirect to="/login" />;
  }

  if (error?.statusCode === 404) {
    return <Redirect to="/404" />;
  }

  return (

    <Layout>
      {advert && <AdvertDetail {...advert} onDelete={handleDelete} />}
    </Layout>
  );
}

const mapStateToProps = (state, ownProps) => ({
  ads: getAd(state, ownProps),
  ...getUi(state),
})

export default connect(mapStateToProps)(AdvertPage);