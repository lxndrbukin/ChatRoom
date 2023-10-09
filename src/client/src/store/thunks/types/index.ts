export interface AuthFormValues {
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
}

export enum FriendRequestAction {
  Accept = 'accept',
  Decline = 'decline',
  Send = 'send',
  Remove = 'remove'
}

export interface FriendRequestData {
  userId: number;
  fullName: {
    firstName: string;
    lastName: string;
  };
  requestAction: FriendRequestAction;
}