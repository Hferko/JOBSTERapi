import { Link } from 'react-router-dom';
import img from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';

const Error = () => {
  return (
    <Wrapper className='full-page'>
      <div>
        <img src={img} alt='not found' />
        <h3>Ohh! Az oldal nem található</h3>
        <p>Úgy tűnik, nem találjuk a keresett oldalt</p>
        <Link to='/'>vissza a kezdőlapra</Link>
      </div>
    </Wrapper>
  );
};
export default Error;
