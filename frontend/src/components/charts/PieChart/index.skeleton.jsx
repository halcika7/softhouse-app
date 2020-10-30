import { Wrapper } from '../styled';
import {
  SkeletonWrapper,
  ImageSkeleton,
  Shimmer,
  Spacer,
  Line,
} from '@styled/components';

const PieChartSkeleton = () => (
  <Wrapper as="article">
    <h4>Languages</h4>
    <Spacer Margin="1rem 0" />
    <SkeletonWrapper>
      <ImageSkeleton radius={200}>
        <Shimmer className="shimmer">
          <div />
        </Shimmer>
      </ImageSkeleton>
    </SkeletonWrapper>
    <SkeletonWrapper Justify="flex-start">
      <Line Height={20} Width={200} marginTop="1.2rem">
        <Shimmer className="shimmer">
          <div />
        </Shimmer>
      </Line>
    </SkeletonWrapper>
    <SkeletonWrapper Justify="center">
      <Line Height={20} Width={100} marginTop="1.2rem">
        <Shimmer className="shimmer">
          <div />
        </Shimmer>
      </Line>
    </SkeletonWrapper>
  </Wrapper>
);

export default PieChartSkeleton;
