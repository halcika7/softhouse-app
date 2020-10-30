import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import useFormReducer from '@hooks/useFormReducer';

// actions
import { getProfileData, reset, clearMessage, updatePassword } from '@actions';

// components
import {
  Button,
  ChangePassword,
  ConfirmButton,
  FlexWrapper,
  ImageWrapper,
  Wrapper,
} from './styled';
import Input from '@components/input/index';
import ProfileSkeleton from './skeleton';
import ButtonSpinner from '@components/spinner/buttonSpinner';
import Info from './info';

// helpers
import { PasswordRegex } from '@regex';
import { formErrors } from '@helpers/formErrors';
import SweetAlert from '@components/alert';

const redux = createSelector(
  state => state.profile.loading,
  state => state.profile.data,
  state => state.profile.message,
  state => state.profile.status,
  state => state.profile.errors,
  (loading, data, message, status, errors) => ({
    loading,
    data,
    message,
    status,
    errors,
  })
);

const initialFormState = {
  inputVals: {
    password: '',
    password2: '',
  },
  inputValidities: {
    password: false,
    password2: false,
  },
  inputDirty: {
    pasword: false,
    pasword2: false,
  },
  inputErrors: {
    password: '',
    password2: '',
  },
  formValid: false,
  submitting: false,
};

const { PASSWORD, PASSWORD2 } = formErrors;

const Profile = () => {
  const dispatch = useDispatch();
  const [addPassword, setAddPassword] = useState(false);
  const [formState, formDispatch, showError] = useFormReducer(initialFormState);
  const { loading, data, message, status, errors } = useSelector(redux);

  const inputChangeHandler = useCallback(
    (input, value) => {
      let valid = true;
      let error = '';
      let dirty = formState.inputDirty[input];

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
    dispatch(clearMessage);
    dispatch(updatePassword({ ...formState.inputVals }));
  };

  const resetMessage = () => dispatch(clearMessage);

  useEffect(() => {
    dispatch(getProfileData);
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      formDispatch({ type: 'SUBMITTING', submitting: false });
    }
  }, [message, formDispatch]);

  useEffect(() => {
    if (errors) {
      formDispatch({ type: 'SUBMITTING', submitting: false });
      formDispatch({ type: 'SET_ERRORS', errors });
      formDispatch({ type: 'CHECK_VALID_ALL' });
    }
  }, [errors, formDispatch]);

  useEffect(() => {
    if (status === 200) {
      formDispatch({ type: 'UPDATE_ALL_STATE', state: initialFormState });
    }
  }, [status, formDispatch]);

  useEffect(() => {
    return () => {
      dispatch(reset);
    };
  }, [dispatch]);

  if (loading) return <ProfileSkeleton />;

  return (
    <Wrapper>
      <ImageWrapper>
        <img src={data.picture} alt="user" />
      </ImageWrapper>
      <FlexWrapper>
        <Info {...data} />
        {!data.hasPassword && !addPassword && (
          <Button
            className="password"
            type="button"
            onClick={() => setAddPassword(true)}
          >
            Add password
          </Button>
        )}
        {(data.hasPassword || addPassword) && (
          <ChangePassword>
            <h1>{data.hasPassword ? 'Update Password' : 'Add Password'}</h1>
            {message && (
              <SweetAlert
                message={message}
                type={status === 200 ? 'success' : 'error'}
                callBack={resetMessage}
                withButtons
                failedButton="Close"
                successButton="OK"
              />
            )}
            <form onSubmit={onSubmit}>
              <Input
                value={formState.inputVals.password}
                error={formState.inputErrors.password}
                showError={showError('password')}
                onChange={inputChangeHandler}
                name="password"
                label="Password"
                type="password"
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
              <ConfirmButton
                disabled={!formState.formValid || formState.submitting}
                type="submit"
                onClick={onSubmit}
              >
                Confirm {formState.submitting && <ButtonSpinner />}
              </ConfirmButton>
            </form>
          </ChangePassword>
        )}
      </FlexWrapper>
    </Wrapper>
  );
};

export default Profile;
