import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { Link } from 'react-router-dom';
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        {/* info */}
        <div className='info'>
          <h1>
            állás <span>kereső</span> app
          </h1>
          <p>
          Nincs az az állás, ami biztonságot adna. A biztonságérzet belülről jön, és ott is kell megtalálnod. Ha azt hiszed, hogy a munkád biztonságot ad, a munkahelyeddel együtt az önbizalmadat is elveszítheted, mert baj esetén semmid sem marad.
          </p>
          <Link to='/register' className='btn btn-hero'>
            Belépés/Regisztrálás
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
