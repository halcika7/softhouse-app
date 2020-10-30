import {
  CardsWrapper,
  Cards2,
  SmallInfo,
  ProfileInfo,
  ImageWrapper,
  FollowersWrapper,
  FollowerData,
} from './styled';
import {
  SkeletonWrapper,
  Shimmer,
  Line,
  ImageSkeleton,
  Spacer,
} from '@styled/components';

import { ReactComponent as Link } from '@assets/images/link.svg';
import { ReactComponent as Marker } from '@assets/images/marker.svg';
import { ReactComponent as Building } from '@assets/images/building.svg';

const arr = [1, 2, 3, 4, 5, 6];

const ProfileSkeleton = () => (
  <CardsWrapper>
    <Cards2>
      <div>User</div>
      <ProfileInfo>
        <ImageWrapper>
          <SkeletonWrapper>
            <ImageSkeleton radius={50}>
              <Shimmer className="shimmer">
                <div />
              </Shimmer>
            </ImageSkeleton>
          </SkeletonWrapper>
          <div>
            <SkeletonWrapper>
              <Line Height={20} Width={60}>
                <Shimmer className="shimmer">
                  <div />
                </Shimmer>
              </Line>
            </SkeletonWrapper>
            <SkeletonWrapper>
              <Line Height={10} Width={60} marginTop="0.7rem">
                <Shimmer className="shimmer">
                  <div />
                </Shimmer>
              </Line>
            </SkeletonWrapper>
          </div>
        </ImageWrapper>
        <SkeletonWrapper Justify="flex-start">
          <Line Height={10} Width={500} marginTop="1.2rem">
            <Shimmer className="shimmer">
              <div />
            </Shimmer>
          </Line>
        </SkeletonWrapper>
        <SkeletonWrapper Justify="flex-start">
          <Line Height={10} Width={160} marginTop="0.5rem">
            <Shimmer className="shimmer">
              <div />
            </Shimmer>
          </Line>
        </SkeletonWrapper>
        <Spacer />
        <SmallInfo>
          <Building /> <Spacer Margin="0 0 0 0.5rem" />
          <SkeletonWrapper Justify="flex-start">
            <Line Height={15} Width={80}>
              <Shimmer className="shimmer">
                <div />
              </Shimmer>
            </Line>
          </SkeletonWrapper>
        </SmallInfo>
        <SmallInfo>
          <Marker /> <Spacer Margin="0 0 0 0.5rem" />
          <SkeletonWrapper Justify="flex-start">
            <Line Height={15} Width={80}>
              <Shimmer className="shimmer">
                <div />
              </Shimmer>
            </Line>
          </SkeletonWrapper>
        </SmallInfo>
        <SmallInfo>
          <Link /> <Spacer Margin="0 0 0 0.5rem" />
          <SkeletonWrapper Justify="flex-start">
            <Line Height={15} Width={80}>
              <Shimmer className="shimmer">
                <div />
              </Shimmer>
            </Line>
          </SkeletonWrapper>
        </SmallInfo>
      </ProfileInfo>
    </Cards2>
    <Cards2>
      <div>Followers</div>
      <FollowersWrapper>
        {arr.map(val => (
          <div key={val}>
            <SkeletonWrapper Justify="flex-start">
              <ImageSkeleton radius={25}>
                <Shimmer className="shimmer">
                  <div />
                </Shimmer>
              </ImageSkeleton>
            </SkeletonWrapper>
            <FollowerData>
              <SkeletonWrapper Justify="flex-start">
                <Line Height={12} Width={60}>
                  <Shimmer className="shimmer">
                    <div />
                  </Shimmer>
                </Line>
              </SkeletonWrapper>
              <SkeletonWrapper Justify="flex-start">
                <Line Height={9} Width={120} marginTop="0.5rem">
                  <Shimmer className="shimmer">
                    <div />
                  </Shimmer>
                </Line>
              </SkeletonWrapper>
            </FollowerData>
          </div>
        ))}
      </FollowersWrapper>
    </Cards2>
  </CardsWrapper>
);

export default ProfileSkeleton;
