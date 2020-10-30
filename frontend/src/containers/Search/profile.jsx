import {
  CardsWrapper,
  Cards2,
  P,
  SmallInfo,
  ProfileInfo,
  ImageWrapper,
  FollowersWrapper,
  FollowerData,
} from './styled';

// helpers
import { trucText } from '@helpers/truncText';

import { ReactComponent as Link } from '@assets/images/link.svg';
import { ReactComponent as Marker } from '@assets/images/marker.svg';
import { ReactComponent as Building } from '@assets/images/building.svg';
import ProfileSkeleton from './profile.skeleton';

const Profile = ({
  avatar_url,
  name,
  twitter_username,
  html_url,
  bio,
  location,
  blog,
  company,
  followers,
  loading,
}) =>
  !loading ? (
    <CardsWrapper>
      <Cards2>
        <div>User</div>
        <ProfileInfo>
          <ImageWrapper>
            <img src={avatar_url} alt={name} />
            <div>
              <h5>{name}</h5>
              <p>@{twitter_username || 'john_doe'}</p>
            </div>
            <a href={html_url} target="_blank" rel="noreferrer">
              Follow
            </a>
          </ImageWrapper>
          <P>{trucText(bio || '', 100)}</P>
          <SmallInfo>
            <Building /> <span>{company || 'Me'}</span>
          </SmallInfo>
          <SmallInfo>
            <Marker /> <span>{location || 'earth'}</span>
          </SmallInfo>
          {blog && (
            <SmallInfo>
              <Link />{' '}
              <a target="_blank" rel="noreferrer" href={`https://${blog}`}>
                {blog}
              </a>
            </SmallInfo>
          )}
        </ProfileInfo>
      </Cards2>
      <Cards2>
        <div>Followers</div>
        <FollowersWrapper>
          {!followers.length && <h3>No followers</h3>}
          {followers.map(({ id, avatar_url, html_url, login }, index) => (
            <div key={`${id}-${login}-${index}`}>
              <img src={avatar_url} alt={login} />
              <FollowerData>
                <h5>{login}</h5>
                <a href={html_url} target="_blank" rel="noreferrer">
                  {html_url}
                </a>
              </FollowerData>
            </div>
          ))}
        </FollowersWrapper>
      </Cards2>
    </CardsWrapper>
  ) : (
    <ProfileSkeleton />
  );

export default Profile;
