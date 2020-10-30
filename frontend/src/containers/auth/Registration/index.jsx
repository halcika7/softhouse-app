// hooks
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import useDarkMode from 'use-dark-mode';
import useFormReducer from '@hooks/useFormReducer';

// actions
import {
  register,
  clearErrors,
  searchByUsername,
} from '@actions';

// components
import { CenterDiv, ErrorDiv } from '@styled/components';
import {
  ButtonsWrapper,
  ContainerWrapper,
  H1,
  ImageWrapper,
  SubmitButton,
  Paragraph,
  LinkButton,
  Wrapper,
} from '../styled';
import GoHomeArrow from '@components/GoHomeArrow';
import Input from '@components/input';
import ButtonSpinner from '@components/spinner/buttonSpinner';
import { NavLink } from 'react-router-dom';

// helpers
import { EmailRegex, PasswordRegex } from '@regex';
import { formErrors } from '@helpers/formErrors';

import { ReactComponent as RegisterLight } from '@assets/images/register-light.svg';
import { ReactComponent as RegisterDark } from '@assets/images/register-dark.svg';

const initialFormState = {
  inputVals: {
    email: '',
    username: '',
    password: '',
    password2: '',
  },
  inputValidities: {
    email: false,
    username: false,
    password: false,
    password2: false,
  },
  inputDirty: {
    email: false,
    username: false,
    password: false,
    password2: false,
  },
  inputErrors: {
    email: '',
    username: '',
    password: '',
    password2: '',
  },
  formValid: false,
  submitting: false,
};

const reduxProps = createSelector(
  state => state.auth.errors,
  state => state.auth.error,
  (errors, error) => ({ errors, error })
);

const { EMAIL, PASSWORD, PASSWORD2, USERNAME } = formErrors;

const Register = () => {
  const dispatch = useDispatch();
  const { value } = useDarkMode();
  const [gitInfo, setGitInfo] = useState();
  const { errors, error } = useSelector(reduxProps);
  const [formState, formDispatch, showError] = useFormReducer(initialFormState);

  const RegisterImage = !value ? RegisterLight : RegisterDark;

  const inputChangeHandler = useCallback(
    async (input, value) => {
      let valid = true;
      let error = '';
      let dirty = formState.inputDirty[input];

      if (input === 'email') {
        valid = EmailRegex.test(value);
        error = !valid ? EMAIL : '';
      }

      if (input === 'username') {
        const info = await searchByUsername(value);
        if (info.error) {
          valid = false;
          error = USERNAME;
          setGitInfo(null);
        }
        setGitInfo(!info.error ? info : null);
      }

      if (input === 'password') {
        valid = PasswordRegex.test(value);
        error = !valid ? PASSWORD : '';
      }

      if (input === 'password2') {
        valid = value === formState.inputVals.password;
        error = !valid ? PASSWORD2 : '';
      }

      if (!dirty) {
        dirty = !!value;
      }

      formDispatch({
        type: 'UPDATE',
        value,
        valid,
        dirty: !!value,
        error,
        input,
      });
    },
    [formDispatch, formState.inputDirty, formState.inputVals.password]
  );

  const onSubmit = e => {
    e.preventDefault();
    
    if (!formState.formValid || formState.submitting) return;
    
    formDispatch({ type: 'SUBMITTING', submitting: true });
    dispatch(clearErrors);
    dispatch(register({ ...formState.inputVals, ...gitInfo }));
  };

  useEffect(() => {
    if (errors) {
      formDispatch({ type: 'SUBMITTING', submitting: false });
      formDispatch({ type: 'SET_ERRORS', errors });
      formDispatch({ type: 'CHECK_VALID_ALL' });
    }
  }, [errors, formDispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearErrors);
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      formDispatch({ type: 'SUBMITTING', submitting: false });
    }
  }, [error, formDispatch]);

  return (
    <ContainerWrapper as="section">
      <GoHomeArrow />
      <CenterDiv>
        <ImageWrapper>
          <RegisterImage />
        </ImageWrapper>
        <Wrapper>
          <H1>Sign Up</H1>
          <Paragraph>Become part of a wonderful community 🔔</Paragraph>
          <form onSubmit={onSubmit}>
            {error && <ErrorDiv>{error}</ErrorDiv>}
            <Input
              name="email"
              label="Email Address"
              type="email"
              value={formState.inputVals.email}
              error={formState.inputErrors.email}
              showError={showError('email')}
              onChange={inputChangeHandler}
            />
            <Input
              name="username"
              label="Github Username"
              type="text"
              value={formState.inputVals.username}
              error={formState.inputErrors.username}
              showError={showError('username')}
              onChange={inputChangeHandler}
              withDebounce
            />
            <Input
              name="password"
              label="Password"
              type="password"
              value={formState.inputVals.password}
              error={formState.inputErrors.password}
              showError={showError('password')}
              onChange={inputChangeHandler}
            />
            <Input
              name="password2"
              label="Confirm Password"
              type="password"
              value={formState.inputVals.password2}
              error={formState.inputErrors.password2}
              showError={showError('password2')}
              onChange={inputChangeHandler}
            />
          </form>
          <ButtonsWrapper>
            <SubmitButton
              disabled={!formState.formValid || formState.submitting}
              onClick={onSubmit}
              type="button"
            >
              Register {formState.submitting && <ButtonSpinner />}
            </SubmitButton>
            <LinkButton as={NavLink} to="/login">Go to Login</LinkButton>
          </ButtonsWrapper>
        </Wrapper>
      </CenterDiv>
    </ContainerWrapper>
  );
};

export default Register;
