// components
import Pie from '@components/charts/PieChart';
import DonutChart from '@components/charts/DonutChart';
import HorizontalBarCart from '@components/charts/HorizontalBarChart';
import VerticalBarChart from '@components/charts/VerticalBarChart';
import Stats from './stats';
import Profile from './profile';
import { ChartsWrapper } from './styled';

const SearchLoading = () => (
  <>
    <Stats loading />
    <Profile loading />
    <Profile loading />
    <ChartsWrapper>
      <Pie loading />
      <HorizontalBarCart loading />
      <DonutChart loading />
      <VerticalBarChart loading />
    </ChartsWrapper>
  </>
);

export default SearchLoading;
