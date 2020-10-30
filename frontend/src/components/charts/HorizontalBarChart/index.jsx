//components
import { XAxis, Bar, YAxis, ComposedChart, Rectangle, Tooltip } from 'recharts';
import { TooltipWrapper, Paragraph, Span, Wrapper, Container } from '../styled';
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

const margin = { top: 0, right: 0, left: 0, bottom: 10 };
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { value, payload: Payload } = payload[0];
    return (
      <TooltipWrapper>
        <Paragraph>
          <Span background={colorize(Payload.name)} />
          {Payload.name} - {value} - Stars
        </Paragraph>
      </TooltipWrapper>
    );
  }

  return null;
};

const getPopular = repos =>
  [
    ...repos
      .reduce((total, { name, stargazers_count }) => {
        total.set(name, { name, value: stargazers_count });
        return total;
      }, new Map())
      .values(),
  ]
    .filter(repo => repo.value)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

const HorizontalBarCart = ({ repos = [], loading }) => {
  const popular = getPopular(repos);

  if(loading) return <Skeleton />

  return (
    <Wrapper as="article">
      {popular.length > 0 && <h4>Most Popular Repos</h4>}
      {popular.length ? (
        <Container width="100%" height="100%">
          <ComposedChart data={popular} margin={margin}>
            <XAxis tickLine={false} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              shape={CustomBar}
              dataKey="value"
              barSize={30}
              labelLine={false}
            />
          </ComposedChart>
        </Container>
      ) : (
        <h3>User does not have stars</h3>
      )}
    </Wrapper>
  );
};

export default memo(HorizontalBarCart);
