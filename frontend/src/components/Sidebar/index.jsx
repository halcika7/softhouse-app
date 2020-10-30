import styled from 'styled-components';
import Item from './item';
import { BaseButton, setHeightWidth } from '@styled/components';

// hooks
import { useDispatch } from 'react-redux';
import { logout } from '@actions';

import { ReactComponent as User } from '@assets/images/user.svg';
import { ReactComponent as Stack } from '@assets/images/stack.svg';
import { ReactComponent as Loupe } from '@assets/images/loupe.svg';
import { ReactComponent as File } from '@assets/images/file.svg';

const Wrapper = styled.aside`
  ${setHeightWidth('100%')}
  max-width: 150px;
  background: ${props => props.theme.bg.sidebar};
  position: sticky;
  top: 1rem;
  box-shadow: ${props => props.theme.boxShadow};
  border-radius: 10px;
  z-index: 20;
  overflow: hidden;

  @media (max-width: 992px) {
    display: flex;
    width: 100%;
    max-width: 100%;
    margin-bottom: 2rem;
  }
`;

const Button = styled(BaseButton)`
  background: tomato;
  color: ${props => props.theme.colors.white};
  width: 100%;
  padding: 16px 0;
  font-weight: 500;
  letter-spacing: 1px;

  @media (max-width: 992px) {
    display: none;
  }
`;

const items = [
  {
    to: '/dashboard',
    title: 'Search',
    Icon: Loupe,
  },
  {
    to: '/data',
    title: 'Data',
    Icon: Stack,
  },
  {
    to: '/files',
    title: 'Files',
    Icon: File,
  },
  {
    to: '/profile',
    title: 'Profile',
    Icon: User,
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();

  const onLogout = () => dispatch(logout);

  return (
    <Wrapper>
      {items.map(item => (
        <Item key={item.to} {...item} />
      ))}
      <Button type="button" onClick={onLogout}>
        Logout
      </Button>
    </Wrapper>
  );
};

export default Sidebar;
