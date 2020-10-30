// components
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import { TooltipWrapper, Paragraph, Span, Wrapper, Container } from '../styled';
// helpers
import { colorize } from '@helpers/colorize';
import PieChartSkeleton from './index.skeleton';
import { memo } from 'react';

const CustomTooltip = ({ active, payload, length }) => {
  if (active && payload && payload.length) {
    const { value, name, payload: Payload } = payload[0];
    return (
      <TooltipWrapper>
        <Paragraph>
          <Span background={Payload.fill} />
          {name} - {Math.round((value / length) * 100)}%
        </Paragraph>
      </TooltipWrapper>
    );
  }

  return null;
};

const getData = repos =>
  [
    ...repos
      .reduce((total, { language }) => {
        if (!language) return total;

        const item = total.get(language);

        total.set(language, {
          name: language,
          value: !item ? 1 : item.value + 1,
        });

        return total;
      }, new Map())
      .values(),
  ]
    .filter(repo => repo.value)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

const PieComponent = ({ repos = [], loading }) => {
  const languages = getData(repos);

  if (loading) return <PieChartSkeleton />;

  return (
    <Wrapper as="article">
      {languages.length > 0 && <h4>Languages</h4>}
      {languages.length ? (
        <Container width="100%" height={329}>
          <PieChart>
            <Pie
              data={languages}
              labelLine={false}
              dataKey="value"
              outerRadius={100}
            >
              {languages.map(val => (
                <Cell key={val.name} fill={colorize(val.name)} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip length={repos.length} />} />
            <Legend />
          </PieChart>
        </Container>
      ) : (
        <h3>User does not have repos</h3>
      )}
    </Wrapper>
  );
};

export default memo(PieComponent);
