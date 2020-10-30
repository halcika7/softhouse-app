import { DisabledInput, InfoWrapper } from './styled';

const Info = ({ createdAt, username, email }) => (
  <InfoWrapper>
    <h1>Profile Details</h1>
    <DisabledInput>
      <span>Registration Date</span>
      <p>{new Date(createdAt).toLocaleDateString()}</p>
    </DisabledInput>
    <DisabledInput>
      <span>Github Username</span>
      <p>{username}</p>
    </DisabledInput>
    <DisabledInput>
      <span>Email</span>
      <p>{email}</p>
    </DisabledInput>
  </InfoWrapper>
);

export default Info;
