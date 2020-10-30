// components
import { XAxis, Bar, YAxis, ComposedChart, Rectangle, Tooltip } from 'recharts';
import { Container, Paragraph, Span, TooltipWrapper, Wrapper } from '../styled';
// helpers
import { colorize } from '@helpers/colorize';
import Skeleton from './index.skeleton';
import { memo } from 'react';

const CustomBar = props => (
  <Rectangle
    {...props}
    fill={colorize(props.name)}
    className={`recharts-bar-rectangle`}
  />
);

const margin = { top: 0, right: 0, left: 0, bottom: 0 };

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { value, payload: Payload } = payload[0];
    return (
      <TooltipWrapper>
        <Paragraph>
          <Span background={colorize(Payload.name)} />
          {Payload.name} - {value} - Forks
        </Paragraph>
      </TooltipWrapper>
    );
  }

  return null;
};

const getData = repos =>
  [
    ...repos
      .reduce((total, { name, forks }) => {
        total.set(name, { name, value: forks });
        return total;
      }, new Map())
      .values(),
  ]
    .filter(repo => repo.value)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

const VerticalBarChart = ({ repos = [], loading }) => {
  const mostForked = getData(repos);

  if(loading) return <Skeleton />

  return (
    <Wrapper as="article">
      {mostForked.length > 0 && <h4>Most Forked Repos</h4>}
      {mostForked.length ? (
        <Container width="100%" height="100%">
          <ComposedChart data={mostForked} margin={margin} layout="vertical">
            <YAxis type="category" dataKey="name" hide />
            <XAxis type="number" />
            <Tooltip content={<CustomTooltip />} />
            <Bar shape={CustomBar} dataKey="value" barSize={30} />
          </ComposedChart>
        </Container>
      ) : (
        <h3>No Forks</h3>
      )}
    </Wrapper>
  );
};

export default memo(VerticalBarChart);
