import { HeaderNav } from './HeaderNav';

export const Header = (): JSX.Element => {
  return (
    <header className='header'>
      <div className='header-logo'>ChatRoom</div>
      <HeaderNav />
    </header>
  );
};
