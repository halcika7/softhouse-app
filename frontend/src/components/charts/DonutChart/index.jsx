// components
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import { TooltipWrapper, Paragraph, Span, Wrapper, Container } from '../styled';
// helpers
import { colorize } from '@helpers/colorize';
import DonutChartSkeleton from './index.skeleton';
import { memo } from 'react';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, payload: Payload } = payload[0];

    return (
      <TooltipWrapper>
        <Paragraph>
          <Span background={Payload.fill} />
          {name} - {Payload.stars}
        </Paragraph>
      </TooltipWrapper>
    );
  }

  return null;
};

const getStars = repos =>
  [
    ...repos
      .reduce((total, { language, stargazers_count }) => {
        if (!language) return total;

        const item = total.get(language);

        if (!item) {
          total.set(language, {
            name: language,
            stars: stargazers_count,
          });
        } else {
          total.set(language, {
            name: language,
            stars: item.stars + stargazers_count,
          });
        }

        return total;
      }, new Map())
      .values(),
  ]
    .filter(repo => repo.stars)
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 5);

const DonutChart = ({ repos = [], loading }) => {
  const stars = getStars(repos);

  if(loading) return <DonutChartSkeleton />

  return (
    <Wrapper as="article">
      {stars.length > 0 && <h4>Stars Per Language</h4>}
      
      {stars.length ? (
        <Container width="100%" height={329}>
          <PieChart>
            <Pie
              data={stars}
              labelLine={false}
              dataKey="stars"
              outerRadius={100}
              innerRadius={60}
              fill="#8884d8"
              paddingAngle={5}
            >
              {stars.map(val => (
                <Cell key={val.name} fill={colorize(val.name)} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </Container>
      ) : (
        <h3>User does not have stars</h3>
      )}
    </Wrapper>
  );
};

export default memo(DonutChart);
