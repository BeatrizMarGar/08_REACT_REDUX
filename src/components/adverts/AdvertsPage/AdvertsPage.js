import React from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../../layout';
import FiltersForm from './FiltersForm';
import AdvertsList from './AdvertsList';
import EmptyList from './EmptyList';
import storage from '../../../utils/storage';
import { getAdverts } from '../service';
import { defaultFilters, filterAdverts } from './filters';
import { useDispatch } from 'react-redux';
import { loadAds, tagsLoaded } from '../../../store/actions';
import { getAllTags } from '../../../store/actions';
import useStoreData from '../../../hooks/useStoreData';
import { getAdverts_sel } from '../../../store/selectors';
import useStoreAction from '../../../hooks/StoreActions';

const getFilters = () => storage.get('filters') || defaultFilters;
const saveFilters = filters => storage.set('filters', filters);

function AdvertsPage() {
  
const dispatch = useDispatch();
  const adverts = useStoreData(getAdverts_sel)
  const loadadverts = useStoreAction(loadAds)
  const [filters, setFilters] = React.useState(getFilters);

  React.useEffect(() => {
    loadadverts();
  }, [loadadverts]);
  

  React.useEffect(() => {
    saveFilters(filters);
  }, [filters]);
  
  const filteredAdverts = filterAdverts(adverts, filters);

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