export interface ProfileHeaderButtonsProps {
  profileUserData: {
    userId: number;
    fullName: {
      firstName: string;
      lastName: string;
    };
  };
}

export interface ProfileFriendProps {
  fullName: {
    firstName: string;
    lastName: string;
  };
  mainPhoto: string;
}
