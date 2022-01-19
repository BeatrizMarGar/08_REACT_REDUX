import React from 'react';
import { Redirect } from 'react-router-dom';

import Layout from '../../layout';
import FiltersForm from './FiltersForm';
import AdvertsList from './AdvertsList';
import EmptyList from './EmptyList';
import storage from '../../../utils/storage';
import { getAdverts } from '../service';
import { defaultFilters, filterAdverts } from './filters';
import useQuery from '../../../hooks/useQuery';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { adsLoaded } from '../../../store/actions';
import { getAdverts_sel } from '../../../store/selectors';

const getFilters = () => storage.get('filters') || defaultFilters;
const saveFilters = filters => storage.set('filters', filters);

function AdvertsPage() {
  
const dispatch = useDispatch();
  const { isLoading, error, data: adverts = [] } = useQuery(getAdverts);
  const [filters, setFilters] = React.useState(getFilters);

  React.useEffect(() => {
    saveFilters(filters);
  }, [filters]);

  if (error?.statusCode === 401) {
    return <Redirect to="/login" />;
  }

  const filteredAdverts = filterAdverts(adverts, filters);
  const ads_storage = dispatch(adsLoaded(adverts, filters));
  const saved = storage.set('ads_saved', filteredAdverts)

  return (
    <Layout>
      {adverts.length > 0 && (
        <FiltersForm
          initialFilters={filters}
          defaultFilters={defaultFilters}
          prices={adverts.map(({ price }) => price)}
          onFilter={setFilters}
        />
      )}
      {filteredAdverts.length ? (
        <AdvertsList adverts={filteredAdverts} />
      ) : (
        <EmptyList advertsCount={adverts.length} />
      )}
    </Layout>
  );
}

export default AdvertsPage;
/*
export default connect(getAdverts_sel, dispatch => ({
  filterAdverts: (filters) => dispatch(adsLoaded(filters))
}))(AdvertsPage)*/