export interface MulterRequest extends Request {
  file: any;
}
export enum FriendRequestAction {
  Accept = 'accept',
  Decline = 'decline',
  Send = 'send',
  Remove = 'remove',
  Cancel = 'cancel'
}