import React from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE': {
      const updatedValues = {
        ...state.inputVals,
        [action.input]: action.value,
      };

      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.valid,
      };

      const updateInputDirty = {
        ...state.inputDirty,
        [action.input]: action.dirty,
      };

      const updateInputErrors = {
        ...state.inputErrors,
        [action.input]: action.error,
      };

      let formValid = true;

      Object.keys(updatedValidities).forEach(key => {
        formValid = formValid && updatedValidities[`${key}`];
      });

      return {
        ...state,
        inputVals: updatedValues,
        inputValidities: updatedValidities,
        inputDirty: updateInputDirty,
        inputErrors: updateInputErrors,
        formValid,
      };
    }
    case 'SUBMITTING': {
      return { ...state, submitting: action.submitting };
    }
    case 'UPDATE_ALL_STATE': {
      return { ...action.state };
    }
    case 'SET_ERRORS': {
      const inputErrors = { ...state.inputErrors };

      action.errors.forEach(val => {
        Object.entries(val).forEach(([key, value]) => {
          inputErrors[`${key}`] = value;
        });
      });

      return { ...state, inputErrors };
    }
    case 'CHECK_VALID_ALL': {
      const inputValidities = {};
      const inputDirty = {};

      Object.entries(state.inputVals).forEach(([key, value]) => {
        inputValidities[`${key}`] = false;
        inputDirty[`${key}`] = true;
        if (value && !state.inputErrors[key]) {
          inputValidities[`${key}`] = true;
        }
      });

      const formValid = Object.values(inputValidities).every(
        val => val === true
      );
      return { ...state, inputValidities, inputDirty, formValid };
    }
    default:
      return state;
  }
};

const useFormReducer = initialState => {
  const [formState, formDispatch] = React.useReducer(reducer, initialState);
  
  const showError = name =>
    !formState.inputValidities[`${name}`] && formState.inputDirty[`${name}`];

  return [formState, formDispatch, showError];
};

export default useFormReducer;
