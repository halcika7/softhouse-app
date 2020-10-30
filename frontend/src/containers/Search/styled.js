import styled from 'styled-components';
import {
  AlignCenterDiv,
  JustifySpaceBetween,
  CenterAllFlex,
  setHeightWidth,
  FlexColumn,
  JustifyCenterDiv,
  setMarginPadding,
  AlignCenterFlex,
  BaseButton,
} from '@styled/components';

export const SearchWrapper = styled(AlignCenterDiv)`
  ${JustifySpaceBetween}

  @media (max-width: 500px) {
    flex-direction: column;
  }

  > p {
    flex-basis: 15%;

    @media (max-width: 991px) {
      flex-basis: 20%;
    }

    @media (max-width: 767px) {
      flex-basis: 30%;
    }

    @media (max-width: 500px) {
      flex-basis: 100%;
      width: 100%;
      text-align: center;
    }
  }
`;

export const SearchInput = styled(AlignCenterDiv)`
  background: ${props => props.theme.bg.formGroup};
  padding: 8px 8px;
  z-index: 15;
  flex-basis: 80%;
  border-radius: 4px;

  @media (max-width: 991px) {
    flex-basis: 75%;
  }

  @media (max-width: 767px) {
    flex-basis: 65%;
  }

  @media (max-width: 500px) {
    flex-basis: 100%;
    width: 100%;
    margin-bottom: 1rem;
  }

  > svg {
    height: 24px;

    > g path {
      fill: ${props => props.theme.text.primary};
    }
  }

  label {
    width: 100%;
    margin-left: 8px;
  }

  input {
    border: none;
    background-color: transparent;
    outline: none;
    color: ${props => props.theme.text.primary};
    width: 100%;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  > button {
    border: none;
    background: #50c878;
    color: ${props => props.theme.colors.white};
    border-radius: 4px;
    padding: 2px 8px;
    cursor: pointer;
  }
`;

export const CardsWrapper = styled.div`
  ${JustifySpaceBetween}
  flex-wrap: wrap;
  margin: 2rem 0;
`;

export const Card = styled(AlignCenterDiv)`
  ${JustifySpaceBetween}
  background: ${props => props.theme.bg.primary};
  color: ${props => props.theme.text.primary};
  box-shadow: ${props => props.theme.boxShadow};
  padding: 8px 32px;
  width: 23%;

  @media (max-width: 991px) {
    width: 48%;
    margin-bottom: 2rem;
  }

  @media (max-width: 575px) {
    width: 100%;
  }

  > span {
    ${CenterAllFlex}
    padding: 10px;
    border-radius: 50%;

    &.pink {
      background: #ffe0f0;

      > svg {
        g g path {
          fill: #da4a91;
        }
      }
    }

    &.green {
      background: #aaf0d1;

      > svg {
        g g path {
          fill: #00a86b;
        }
      }
    }

    &.purple {
      background: #e6e6ff;

      > svg {
        path {
          fill: #5d55fa;
        }
      }
    }

    &.yellow {
      background: #fffbea;

      > svg {
        path {
          fill: #f0b429;
        }
      }
    }
  }

  svg {
    ${setHeightWidth('32px')}
  }

  > div {
    ${FlexColumn}
    margin-left: 8px;

    h4 {
      font-weight: 700;
      font-size: 1.8rem;
      text-align: right;
    }

    p {
      font-size: 0.8rem;
      letter-spacing: 1px;
      color: grey;
      text-align: right;
    }
  }
`;

export const Cards2 = styled(JustifyCenterDiv)`
  ${FlexColumn}
  color: ${props => props.theme.text.primary};
  width: 48.6%;

  > div {
    padding: 8px 32px;
    background: ${props => props.theme.bg.primary};
    box-shadow: ${props => props.theme.boxShadow};
  }

  > div:first-child {
    width: fit-content;
    color: gray;
  }

  > div:nth-child(2) {
    ${setMarginPadding('2rem 0 0', '1rem 32px')}
    height: 220px;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 2rem;
  }
`;

export const SmallInfo = styled(AlignCenterDiv)`
  margin-bottom: 0.5rem;

  > svg {
    ${setHeightWidth('16px', '24px')}

    path {
      fill: ${props => props.theme.text.primary};

      ~ rect {
        fill: ${props => props.theme.text.primary};
      }
    }
  }

  > span,
  > a {
    margin-left: 8px;
    font-size: 0.7rem;
  }

  > a {
    color: #0073cf;
  }
`;

export const P = styled.div`
  font-size: 0.7rem;
  margin: 1rem 0;
`;

export const ChartsWrapper = styled.div`
  ${JustifySpaceBetween}
  flex-wrap: wrap;
  margin: 2rem 0 0;

  > article {
    margin-bottom: 2rem;
  }

  > article:first-child,
  > article:nth-child(3) {
    width: 40%;
  }

  > article:nth-child(2),
  > article:nth-child(4) {
    width: 56.5%;
  }

  @media (max-width: 1200px) {
    > article:first-child,
    > article:nth-child(3) {
      width: 40%;
    }

    > article:nth-child(2),
    > article:nth-child(4) {
      width: 55%;
    }
  }

  @media (max-width: 768px) {
    > article {
      width: 100% !important;
    }
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ImageWrapper = styled.div`
  ${FlexColumn}

  img {
    ${setHeightWidth('50px')}
    border-radius: 50%;
  }

  > div {
    margin-left: 16px;

    h5 {
      margin: 0;
      font-size: 0.9rem;
      font-weight: 900;
    }

    p {
      font-size: 0.75rem;
      font-weight: 500;
      color: gray;
      margin: 0.3rem 0;
    }
  }

  a {
    margin-left: auto;
    border: 1px solid #00a86b;
    border-radius: 30px;
    padding: 0 16px;
    color: #00a86b;
    font-size: 0.8rem;
  }
`;

export const FollowersWrapper = styled.div`
  overflow-y: scroll;
  padding: 16px 32px;

  > div {
    ${AlignCenterFlex}
    margin-bottom: 0.5rem;

    img {
      ${setHeightWidth('30px')}
      border-radius: 50%;
    }
  }
`;

export const FollowerData = styled.div`
  margin-left: 16px;

  h5 {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 600;
  }

  a {
    font-size: 0.75rem;
    font-weight: 500;
    color: gray;
  }
`;

export const AddButton = styled(BaseButton)`
  border-radius: 4px;
  background: ${props => props.theme.bg.accent};
  padding: 4px 16px;
  color: ${props => props.theme.colors.white};
  margin: 2rem 0;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
