import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { clearDataMessage, removeUserFromData, saveDataToFile } from '@actions';
import Spinner from '@components/spinner';
import Input from '@components/input';
import { inputsMapping } from './index.inputs';
import { ReactComponent as Remove } from '@assets/images/remove.svg';
import {
  Wrapper,
  RemoveButton,
  RemoveUserButton,
  UserImage,
  UserWrapper,
  SaveFileButton,
} from './styled';
import SweetAlert from '@components/alert';

const redux = createSelector(
  state => state.data,
  data => ({ ...data })
);

const Data = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const { updating, loading, data, message, status } = useSelector(redux);

  const getUser = index => {
    const updatedUsers = [...users];
    const user = updatedUsers[index];
    return { updatedUsers, user };
  };

  const changeHandler = index => (name, value) => {
    const { updatedUsers, user } = getUser(index);
    const key = name.split('-')[0];
    user[`${key}`] = value;
    setUsers(() => updatedUsers);
  };

  const removeUser = (index, id) => () =>
    dispatch(removeUserFromData(index, id));

  const removeHandler = (index, key) => () => {
    const { updatedUsers, user } = getUser(index);
    delete user[key];
    const { length } = Object.keys(user);

    if (length === 1) {
      removeUser(index, user.id)();
    } else {
      setUsers(() => updatedUsers);
    }
  };

  const saveToFile = e => {
    if (updating || loading) return;

    const dataCopy = data.map(value => {
      const user = users.find(user => user.id === value.user.id);

      if (user) return { ...value, user };

      return { ...value };
    });

    dispatch(saveDataToFile(dataCopy));
  };

  const resetMessage = () => dispatch(clearDataMessage);

  useEffect(() => {
    if (data) {
      const usrs = data.map(({ user }) => user);
      setUsers(() => usrs);
    }
  }, [data]);

  useEffect(() => {
    return () => {
      dispatch(clearDataMessage);
    };
  }, [dispatch]);

  if (loading)
    return (
      <Wrapper>
        <Spinner />
      </Wrapper>
    );

  return (
    <Wrapper>
      <h1>{data.length ? 'Selected Github Users' : 'No Data'}</h1>
      {data.length > 0 && (
        <>
          <SaveFileButton
            type="button"
            onClick={saveToFile}
            disabled={updating}
          >
            Save to File
          </SaveFileButton>
          <form>
            {users.map((user, index) => (
              <div key={user.id}>
                <RemoveUserButton
                  disabled={updating}
                  type="button"
                  onClick={removeUser(index, user.id)}
                >
                  Remove User
                </RemoveUserButton>
                <UserImage>
                  {user.avatar_url && <img src={user.avatar_url} alt="user" />}
                  <div>
                    {user.name && <p>{user.name}</p>}
                    <p>ID - {user.id}</p>
                  </div>
                </UserImage>
                <UserWrapper>
                  {Object.entries(user).map(([key, value]) => {
                    if (key === 'id') return null;

                    const { label, type } = inputsMapping[key];
                    let defaultValue;

                    switch (type) {
                      case 'text':
                        defaultValue = '';
                        break;
                      case 'number':
                        defaultValue = 0;
                        break;
                      case 'boolean':
                        defaultValue = false;
                        break;
                      default:
                        defaultValue = new Date(value)
                          .toISOString()
                          .split('T')[0];
                        break;
                    }

                    return (
                      <div key={`${key}-${user.id}`}>
                        <RemoveButton
                          type="button"
                          onClick={removeHandler(index, key)}
                          disabled={updating}
                        >
                          <Remove />
                        </RemoveButton>
                        <Input
                          name={`${key}-${user.id}`}
                          label={label}
                          type={type}
                          value={
                            value === null || type === 'date'
                              ? defaultValue
                              : value
                          }
                          showError={false}
                          onChange={changeHandler(index)}
                        />
                      </div>
                    );
                  })}
                </UserWrapper>
              </div>
            ))}
            <SaveFileButton
              type="submit"
              disabled={updating}
              onClick={saveToFile}
            >
              Save to File
            </SaveFileButton>
          </form>
        </>
      )}
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
    </Wrapper>
  );
};

export default Data;
