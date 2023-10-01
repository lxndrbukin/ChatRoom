import { UserData } from '../../../store';

export interface HeaderUserNavLink {
  name: string;
  icon: JSX.Element,
  path: string;
}

export interface HeaderUserNavProps {
  userData: UserData;
}