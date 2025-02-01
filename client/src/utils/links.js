import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';

const links = [
  { id: 1, text: 'statisztika', path: '/', icon: <IoBarChartSharp /> },
  { id: 2, text: 'összes állás', path: 'all-jobs', icon: <MdQueryStats /> },
  { id: 3, text: 'állás hozzáadása', path: 'add-job', icon: <FaWpforms /> },
  { id: 4, text: 'profil', path: 'profile', icon: <ImProfile /> },
];

export default links;
