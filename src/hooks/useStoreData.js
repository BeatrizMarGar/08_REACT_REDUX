import { useSelector } from 'react-redux';

export default function useStoreData(selector) {
  return useSelector(selector);
}