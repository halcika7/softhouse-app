import styled from 'styled-components';
import {
  FlexColumn,
  setMarginPadding,
  ColumnDiv,
  CenterAllFlex,
  JustifySpaceBetween,
} from '@styled/components';

export const Wrapper = styled.section`
  ${FlexColumn}
  ${setMarginPadding('0 0 2rem', '32px')}
  box-shadow: ${props => props.theme.boxShadow};
  position: relative;

  h1 {
    margin: 0 0 2rem;
    font-size: 2rem;
  }
`;

export const ImageWrapper = styled.div`
  ${setMarginPadding('0 0 2rem', '32px 0')}
  display: flex;

  img {
    border-radius: 50%;
    height: 140px;
  }

  &.skeleton {
    > div {
      border-radius: 50%;
      height: 140px;
    }
  }
`;

export const InfoWrapper = styled(ColumnDiv)`
  padding: 0;
`;

export const DisabledInput = styled.div`
  margin-bottom: 1rem;
  cursor: not-allowed;

  span {
    display: block;
    margin-bottom: 0.3rem;
    font-weight: 500;
  }

  p {
    padding: 8px;
    border: 1px solid gray;
    border-radius: 4px;
    max-width: 400px;
    background: ${props => props.theme.bg.formGroup};
  }
`;

export const ChangePassword = styled(ColumnDiv)`
  display: flex;
  flex-direction: column;

  > form div:nth-of-type(1) {
    margin-top: -0.5rem;
  }

  h1 {
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    h1 {
      margin: 2rem 0;
    }
  }
`;

export const Button = styled.button`
  cursor: pointer;
  border: none;
  background: ${props => props.theme.bg.accent};
  color: ${props => props.theme.colors.white};
  padding: 8px 16px;
  margin-top: 1rem;
  max-width: 300px;

  &.password {
    height: 40px;
  }
`;

export const ConfirmButton = styled(Button)`
  ${CenterAllFlex}
  background: #aaf0d1;
  color: ${props => props.theme.colors.black};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const FlexWrapper = styled.div`
  ${JustifySpaceBetween}

  > div {
    width: 45%;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    > div {
      max-width: 100%;
      width: 100%;
    }
  }
`;
