import { Wrapper } from '../styled';
import {
  SkeletonWrapper,
  Shimmer,
  Spacer,
  Line,
  Flex,
} from '@styled/components';

const Skeleton = () => (
  <Wrapper as="article">
    <h4>Most Popular Repos</h4>
    <Flex>
      <SkeletonWrapper Justify="flex-start">
        <Line Height={200} Width={20} marginTop="1.2rem">
          <Shimmer className="shimmer">
            <div />
          </Shimmer>
        </Line>
      </SkeletonWrapper>
      <Spacer Margin="0 0.8rem" />
      <SkeletonWrapper Justify="flex-end">
        <Line Height={150} Width={20} marginTop="auto">
          <Shimmer className="shimmer">
            <div />
          </Shimmer>
        </Line>
      </SkeletonWrapper>
      <Spacer Margin="0 0.8rem" />
      <SkeletonWrapper Justify="flex-end">
        <Line Height={100} Width={20} marginTop="auto">
          <Shimmer className="shimmer">
            <div />
          </Shimmer>
        </Line>
      </SkeletonWrapper>
      <Spacer Margin="0 0.8rem" />
      <SkeletonWrapper Justify="flex-end">
        <Line Height={50} Width={20} marginTop="auto">
          <Shimmer className="shimmer">
            <div />
          </Shimmer>
        </Line>
      </SkeletonWrapper>
      <Spacer Margin="0 0.8rem" />
      <SkeletonWrapper Justify="flex-end">
        <Line Height={30} Width={20} marginTop="auto">
          <Shimmer className="shimmer">
            <div />
          </Shimmer>
        </Line>
      </SkeletonWrapper>
    </Flex>
    <SkeletonWrapper Justify="flex-end">
      <Line Height={2} Width={220} marginTop="0.2rem">
        <Shimmer className="shimmer">
          <div />
        </Shimmer>
      </Line>
    </SkeletonWrapper>
    <Flex>
      <SkeletonWrapper Justify="flex-start">
        <Line Height={15} Width={15} marginTop="0.2rem" Radius="50%">
          <Shimmer className="shimmer">
            <div />
          </Shimmer>
        </Line>
      </SkeletonWrapper>
      <Spacer Margin="0 0.9rem" />
      <SkeletonWrapper Justify="flex-end">
        <Line Height={15} Width={15} marginTop="0.2rem" Radius="50%">
          <Shimmer className="shimmer">
            <div />
          </Shimmer>
        </Line>
      </SkeletonWrapper>
      <Spacer Margin="0 0.9rem" />
      <SkeletonWrapper Justify="flex-end">
        <Line Height={15} Width={15} marginTop="0.2rem" Radius="50%">
          <Shimmer className="shimmer">
            <div />
          </Shimmer>
        </Line>
      </SkeletonWrapper>
      <Spacer Margin="0 0.9rem" />
      <SkeletonWrapper Justify="flex-end">
        <Line Height={15} Width={15} marginTop="0.2rem" Radius="50%">
          <Shimmer className="shimmer">
            <div />
          </Shimmer>
        </Line>
      </SkeletonWrapper>
      <Spacer Margin="0 0.9rem" />
      <SkeletonWrapper Justify="flex-end">
        <Line Height={15} Width={15} marginTop="0.2rem" Radius="50%">
          <Shimmer className="shimmer">
            <div />
          </Shimmer>
        </Line>
      </SkeletonWrapper>
    </Flex>
  </Wrapper>
);

export default Skeleton;
