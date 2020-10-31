// hooks
import { useCallback, useEffect } from 'react';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import useDarkMode from 'use-dark-mode';
import useFormReducer from '@hooks/useFormReducer';

// components
import { CenterDiv, ErrorDiv } from '@styled/components';
import {
  ButtonsWrapper,
  ContainerWrapper,
  H1,
  ImageWrapper,
  LightWrapper,
  SubmitButton,
  Paragraph,
  LinkButton,
  SocialLink,
  Wrapper,
} from '../styled';
import GoHomeArrow from '@components/GoHomeArrow';
import Input from '@components/input/index';
import ButtonSpinner from '@components/spinner/buttonSpinner';

// actions
import { login, clearErrors, authSuccess, setError } from '@actions';

import { ReactComponent as LoginLight } from '@assets/images/login-light.svg';
import { ReactComponent as LoginDark } from '@assets/images/login-dark.svg';
import { ReactComponent as Github } from '@assets/images/github.svg';

const initialFormState = {
  inputVals: {
    username: '',
    password: '',
  },
  inputValidities: {
    username: false,
    password: false,
  },
  inputDirty: {
    username: false,
    password: false,
  },
  errors: {
    username: '',
    password: '',
  },
  formValid: false,
  submitting: false,
};

const reduxProps = createSelector(
  state => state.auth.error,
  error => error
);

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();
  const { value } = useDarkMode();
  const error = useSelector(reduxProps);
  const [formState, formDispatch] = useFormReducer(initialFormState);

  const LoginImage = !value ? LoginLight : LoginDark;
  const token = new URLSearchParams(search).get('token');
  const serverError = new URLSearchParams(search).get('err');

  const inputChangeHandler = useCallback(
    (input, value) => {
      let dirty = formState.inputDirty[input];

      if (!dirty) {
        dirty = !!value;
      }

      formDispatch({
        type: 'UPDATE',
        value,
        valid: !!value,
        dirty: !!value,
        input,
      });
    },
    [formDispatch, formState.inputDirty]
  );

  const onSubmit = e => {
    e.preventDefault();

    if (!formState.formValid || formState.submitting) return;

    formDispatch({ type: 'SUBMITTING', submitting: true });
    dispatch(clearErrors);
    dispatch(login(formState.inputVals));
  };

  useEffect(() => {
    if (error) {
      formDispatch({ type: 'SUBMITTING', submitting: false });
    }
  }, [error, formDispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearErrors);
    };
  }, [dispatch]);

  useEffect(() => {
    if (serverError) {
      dispatch(setError(serverError));
      history.replace('/login');
    }
    if (token) {
      dispatch(authSuccess(token));
      history.replace('/login');
    }
  }, [serverError, token, dispatch, history]);

  return (
    <ContainerWrapper as="section">
      <GoHomeArrow />
      <CenterDiv>
        <ImageWrapper>
          <LoginImage />
        </ImageWrapper>
        <Wrapper>
          <H1>Welcome Back</H1>
          <Paragraph>
            To keep connected with us please login with your personal
            information by email address and password 🔔
          </Paragraph>
          <form onSubmit={onSubmit}>
            {error && <ErrorDiv>{error}</ErrorDiv>}
            <Input
              name="username"
              label="Email Address / Username"
              type="text"
              value={formState.inputVals.username}
              showError={false}
              onChange={inputChangeHandler}
            />
            <Input
              name="password"
              label="Password"
              type="password"
              value={formState.inputVals.password}
              error={formState.errors.password}
              showError={false}
              onChange={inputChangeHandler}
            />
          </form>

          <LightWrapper>
            <a href="/">Forget Password?</a>
          </LightWrapper>

          <ButtonsWrapper>
            <SubmitButton
              disabled={!formState.formValid || formState.submitting}
              onClick={onSubmit}
              type="button"
            >
              Login Now {formState.submitting && <ButtonSpinner />}
            </SubmitButton>
            <LinkButton as={NavLink} to="/register">
              Create Account
            </LinkButton>
          </ButtonsWrapper>

          <LightWrapper>
            <small>Or you can join with</small>
          </LightWrapper>

          <SocialLink
            href={`${process.env.REACT_APP_BACKEND_URL}/auth/github`}
            aria-label="Login with Github account"
          >
            <Github />
          </SocialLink>
        </Wrapper>
      </CenterDiv>
    </ContainerWrapper>
  );
};

export default Login;
