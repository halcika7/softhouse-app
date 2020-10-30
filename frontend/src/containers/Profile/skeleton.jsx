import {
  SkeletonWrapper,
  ImageSkeleton,
  Shimmer,
  Line,
} from '@styled/components';
import { FlexWrapper, ImageWrapper, InfoWrapper, Wrapper } from './styled';

const ProfileSkeleton = () => (
  <Wrapper>
    <ImageWrapper>
      <SkeletonWrapper>
        <ImageSkeleton radius={140}>
          <Shimmer className="shimmer">
            <div />
          </Shimmer>
        </ImageSkeleton>
      </SkeletonWrapper>
    </ImageWrapper>
    <FlexWrapper>
      <InfoWrapper>
        <Line Height={45} Width={200}>
          <Shimmer className="shimmer">
            <div />
          </Shimmer>
        </Line>
        <Line Height={20} Width={120} marginTop="2rem">
          <Shimmer className="shimmer">
            <div />
          </Shimmer>
        </Line>
        <Line Height={40} Width={420} marginTop="0.7rem">
          <Shimmer className="shimmer">
            <div />
          </Shimmer>
        </Line>
        <Line Height={20} Width={120} marginTop="2rem">
          <Shimmer className="shimmer">
            <div />
          </Shimmer>
        </Line>
        <Line Height={40} Width={420} marginTop="0.7rem">
          <Shimmer className="shimmer">
            <div />
          </Shimmer>
        </Line>
        <Line Height={20} Width={80} marginTop="2rem">
          <Shimmer className="shimmer">
            <div />
          </Shimmer>
        </Line>
        <Line Height={40} Width={420} marginTop="0.7rem">
          <Shimmer className="shimmer">
            <div />
          </Shimmer>
        </Line>
      </InfoWrapper>
    </FlexWrapper>
  </Wrapper>
);

export default ProfileSkeleton;
