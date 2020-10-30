import { CardsWrapper, Card } from './styled';
import { SkeletonWrapper, Shimmer, Line } from '@styled/components';

import { ReactComponent as Followers } from '@assets/images/followers.svg';
import { ReactComponent as Gists } from '@assets/images/gists.svg';
import { ReactComponent as Follow } from '@assets/images/follow.svg';
import { ReactComponent as Repos } from '@assets/images/repos.svg';

const Stats = ({
  public_repos,
  followers,
  following,
  public_gists,
  loading,
}) => (
  <CardsWrapper>
    <Card>
      <span className="pink">
        <Repos />
      </span>
      <div>
        {!loading ? (
          <h4>{public_repos}</h4>
        ) : (
          <SkeletonWrapper>
            <Line Height={20} Width={60}>
              <Shimmer className="shimmer">
                <div />
              </Shimmer>
            </Line>
          </SkeletonWrapper>
        )}
        <p>Repos</p>
      </div>
    </Card>
    <Card>
      <span className="green">
        <Followers />
      </span>
      <div>
        {!loading ? (
          <h4>{followers}</h4>
        ) : (
          <SkeletonWrapper>
            <Line Height={20} Width={60}>
              <Shimmer className="shimmer">
                <div />
              </Shimmer>
            </Line>
          </SkeletonWrapper>
        )}
        <p>Followers</p>
      </div>
    </Card>
    <Card>
      <span className="purple">
        <Follow />
      </span>
      <div>
        {!loading ? (
          <h4>{following}</h4>
        ) : (
          <SkeletonWrapper>
            <Line Height={20} Width={60}>
              <Shimmer className="shimmer">
                <div />
              </Shimmer>
            </Line>
          </SkeletonWrapper>
        )}
        <p>Following</p>
      </div>
    </Card>
    <Card>
      <span className="yellow">
        <Gists />
      </span>
      <div>
        {!loading ? (
          <h4>{public_gists}</h4>
        ) : (
          <SkeletonWrapper>
            <Line Height={20} Width={60}>
              <Shimmer className="shimmer">
                <div />
              </Shimmer>
            </Line>
          </SkeletonWrapper>
        )}
        <p>Gists</p>
      </div>
    </Card>
  </CardsWrapper>
);

export default Stats;
