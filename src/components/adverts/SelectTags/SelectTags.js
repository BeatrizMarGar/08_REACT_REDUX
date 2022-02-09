import React from 'react';

import { getTags } from '../service';
import { CheckboxGroup } from '../../common';
import { getAllTags } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { tagsLoaded } from '../../../store/actions';
import { getTagsSelector } from '../../../store/selectors';

function SelectTags(props) {

  const dispatch = useDispatch();
  
  const tags = useSelector(getTagsSelector)

  React.useEffect(() => {
    dispatch(tagsLoaded(tags));
 }, [tags]);

  return <CheckboxGroup options={tags} {...props} />;
}

export default SelectTags;
