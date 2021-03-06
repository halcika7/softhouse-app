// hooks
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from './lib/hooks/useAuth';

// actions
import { refresh, getUserData } from './redux/actions';

import Nav from './components/nav/index';
import Footer from './components/footer/index';
import Routes from './routes';
import { Container } from './styled/components';

let called = false;

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if(!called) {
      dispatch(refresh(true));
      called = true;
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserData);
    }
  }, [dispatch, isAuthenticated]);

  return (
    <>
      <Nav />
      <Container as="main">
        <Routes />
      </Container>
      <Footer />
    </>
  );
}

export default App;
