import React from 'react';

import { getTags } from '../service';
import { CheckboxGroup } from '../../common';
import useQuery from '../../../hooks/useQuery';
import { tagsLoaded } from '../../../store/actions'
import { useDispatch } from 'react-redux';

function SelectTags(props) {

  const dispatch = useDispatch();
  const { data: tags = [] } = useQuery(getTags);
  
  const tags_storage = dispatch(tagsLoaded(tags));

  return <CheckboxGroup options={tags} {...props} />;
}

export default SelectTags;
