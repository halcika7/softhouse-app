import styled from 'styled-components';
import {
  JustifySpaceBetween,
  FlexColumn,
  AlignCenterDiv,
  setMarginPadding,
  setHeightWidth,
  BaseButton,
} from '@styled/components';

export const Wrapper = styled.section`
  ${FlexColumn}

  h1 {
    font-size: 2rem;
    font-weight: 500;
    color: ${props => props.theme.text.primary};
  }
`;

export const UserWrapper = styled.div`
  ${JustifySpaceBetween}
  margin: 2rem 0;
  flex-wrap: wrap;

  > div {
    max-width: 30%;

    @media (max-width: 1200px) {
      max-width: 47%;
    }

    @media (max-width: 768px) {
      width: 100%;
    }

    @media (max-width: 576px) {
      width: 100%;
      max-width: 100%;

      input {
        width: 100%;
      }
    }
  }
`;

export const UserImage = styled(AlignCenterDiv)`
  ${setMarginPadding('2rem 0', '16px')}
  background: ${props => props.theme.bg.formGroup};
  box-shadow: ${props => props.theme.boxShadow};
  width: fit-content;

  @media (max-width: 768px) {
    width: 100%;
  }

  img {
    ${setHeightWidth('50px')}
    border-radius: 50%;
  }

  > div {
    ${FlexColumn}
    margin-left: 2rem;

    &:only-child {
      margin: 0;
      align-self: flex-start;
    }
  }
`;

export const RemoveButton = styled(BaseButton)`
  ${setHeightWidth('30px')}
  background: tomato;
  border-radius: 50%;
  box-shadow: ${props => props.theme.boxShadow};

  > svg {
    width: 13px;

    path {
      fill: ${props => props.theme.colors.white};;
    }
  }

  &:active {
    box-shadow: none;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const RemoveUserButton = styled(RemoveButton)`
  width: fit-content;
  color: ${props => props.theme.colors.white};
  border-radius: 0;
  margin-top: 1rem;
`;

export const SaveFileButton = styled(RemoveUserButton)`
  background: #00a86b;
`;
