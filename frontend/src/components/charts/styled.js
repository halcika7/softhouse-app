import styled from 'styled-components';
import { ResponsiveContainer } from 'recharts';
import {
  CenterDiv,
  JustifyCenterFlex,
  setHeightWidth,
  AlignCenterFlex,
} from '@styled/components';

export const Wrapper = styled(CenterDiv)`
  padding: 32px;
  background: ${props => props.theme.bg.primary};
  box-shadow: ${props => props.theme.boxShadow};
  flex-direction: column;

  h4 {
    font-size: 1.6rem;
  }
`;

export const Container = styled(ResponsiveContainer)`
  ${JustifyCenterFlex}
`;

export const TooltipWrapper = styled.div`
  padding: 8px;
  border-radius: 4px;
  background: ${props => props.theme.colors.white};
`;

export const Paragraph = styled.p`
  ${AlignCenterFlex}
  margin: 0;
  111;
`;

export const Span = styled.span`
  ${setHeightWidth('16px')}
  display: block;
  margin-right: 8px;
  background: ${props => props.background};
`;
