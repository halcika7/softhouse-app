import { Wrapper } from '../styled';
import {
  SkeletonWrapper,
  Shimmer,
  Spacer,
  Line,
  ColumnDiv,
  Flex,
} from '@styled/components';

const Skeleton = () => (
  <Wrapper as="article">
    <h4>Most Forked Repos</h4>
    <ColumnDiv>
      <SkeletonWrapper Justify="flex-start">
        <Line Height={20} Width={200} marginTop="1.2rem">
          <Shimmer className="shimmer">
            <div />
          </Shimmer>
        </Line>
      </SkeletonWrapper>
      <Spacer Margin="0 0.8rem" />
      <SkeletonWrapper Justify="flex-start">
        <Line Height={20} Width={150} marginTop="1.2rem">
          <Shimmer className="shimmer">
            <div />
          </Shimmer>
        </Line>
      </SkeletonWrapper>
      <Spacer Margin="0 0.8rem" />
      <SkeletonWrapper Justify="flex-start">
        <Line Height={20} Width={100} marginTop="1.2rem">
          <Shimmer className="shimmer">
            <div />
          </Shimmer>
        </Line>
      </SkeletonWrapper>
      <Spacer Margin="0 0.8rem" />
      <SkeletonWrapper Justify="flex-start">
        <Line Height={20} Width={50} marginTop="1.2rem">
          <Shimmer className="shimmer">
            <div />
          </Shimmer>
        </Line>
      </SkeletonWrapper>
      <Spacer Margin="0 0.8rem" />
      <SkeletonWrapper Justify="flex-start">
        <Line Height={20} Width={30} marginTop="1.2rem">
          <Shimmer className="shimmer">
            <div />
          </Shimmer>
        </Line>
      </SkeletonWrapper>
    </ColumnDiv>
    <SkeletonWrapper Justify="flex-start">
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
