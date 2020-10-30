import { useCallback, useEffect, useMemo, useState } from 'react';
// components
import { ErrorDiv } from '@styled/components';
import { FormWrapper } from './styled';
// hooks
import useDebounce from '@hooks/debounce';

import { ReactComponent as Lock } from '@assets/images/lock.svg';
import { ReactComponent as Email } from '@assets/images/email.svg';
import { ReactComponent as User } from '@assets/images/user.svg';

const InputWrapper = ({
  label,
  name,
  type,
  value,
  error,
  showError,
  onChange,
  withDebounce = false,
}) => {
  const [localValue, setLocalValue] = useState(value);
  const enteredValue = useDebounce(localValue, 500);

  const changeHandler = e => {
    if (!withDebounce) onChange(name, e.target.value);
    else setLocalValue(e.target.value);
  };

  const debounce = useCallback(() => {
    if (enteredValue) onChange(name, enteredValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, enteredValue]);

  useEffect(() => {
    if (withDebounce) debounce();
  }, [withDebounce, debounce]);

  const getIcon = useMemo(() => {
    switch (type) {
      case 'email':
        return <Email />;
      case 'password':
        return <Lock />;
      default:
        return null;
    }
  }, [type]);

  if (type === 'boolean')
    return (
      <FormWrapper>
        {getIcon && <div>{getIcon}</div>}
        <div>
          <label htmlFor={name}>{label}</label>
          <label htmlFor={name} className="switch">
            <input
              type="checkbox"
              name={name}
              id={name}
              checked={!withDebounce ? value : localValue}
              onChange={changeHandler}
              autoComplete="off"
              spellCheck="false"
            />
            <span />
          </label>
          {showError && <ErrorDiv small>{error}</ErrorDiv>}
        </div>
      </FormWrapper>
    );

  return (
    <FormWrapper>
      {getIcon && <div>{getIcon}</div>}
      {name === 'username' && (
        <div>
          <User />
        </div>
      )}
      <div>
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          name={name}
          id={name}
          value={!withDebounce ? value : localValue}
          onChange={changeHandler}
          autoComplete="off"
          spellCheck="false"
        />
        {showError && <ErrorDiv small>{error}</ErrorDiv>}
      </div>
    </FormWrapper>
  );
};

export default InputWrapper;
