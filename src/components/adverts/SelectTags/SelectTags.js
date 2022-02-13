import React from 'react';

import { getTags } from '../service';
import { CheckboxGroup } from '../../common';
import { getAllTags } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { tagsLoaded } from '../../../store/actions';
import { getTagsSelector, getTagsSelector2 } from '../../../store/selectors';
import useStoreAction from '../../../hooks/StoreActions';
import useStoreData from '../../../hooks/useStoreData';

function SelectTags(props) {
  const loadTagsAction = useStoreAction(getAllTags);
  React.useEffect(() => {
    loadTagsAction();
  }, []);

 // const tags = useStoreData(getTagsSelector);

  const tags2 = useStoreData(getTagsSelector2);

  return <CheckboxGroup options={tags2} {...props} />;
}

export default SelectTags;