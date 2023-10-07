import { Request, Response } from 'express';
import { controller, get, post, bodyValidator, use } from './decorators';
import FriendsList from '../models/FriendsList';

@controller('/_api')
class FriendsListController {
  @get('/friends_list')
  async getFriendsList(req: Request, res: Response) {

  }

  @post('/friend_requests')
  async postFriendRequest(req: Request, res: Response) {
    if (req.session) {
      const currentUserReqs = await FriendsList.findOne({
        userId: req.session.userId,
      });
      const otherUserReqs = await FriendsList.findOne({
        userId: req.body.userId,
      });
      const sessionUser = req.session.userId;
      const otherUser = req.body.userId;
      if (req.body.requestAction === 'send') {
        if (currentUserReqs) {
          await currentUserReqs.updateOne({ $push: { sentRequests: { userId: otherUser } } });
        } else {
          await FriendsList.create({
            userId: req.session.userId,
            sentRequests: [{ userId: otherUser }],
          });
        }
        if (otherUserReqs) {
          await otherUserReqs.updateOne({ $push: { requestsList: { userId: sessionUser, checked: false } } });
        } else {
          await FriendsList.create({
            userId: req.body.userId,
            requestsList: [{ userId: sessionUser, checked: false }],
          });
        }
      } else if (
        req.body.requestAction === 'accept' ||
        req.body.requestAction === 'decline'
      ) {
        await currentUserReqs?.updateOne({ $pull: { 'requestsList.userId': otherUser } });
        await otherUserReqs?.updateOne({ $pull: { 'sentRequests.userId': sessionUser } });
      } else if (req.body.requestAction === 'cancel') {
        await currentUserReqs?.updateOne({ $pull: { 'sentRequests.userId': otherUser } });
        await otherUserReqs?.updateOne({ $pull: { 'requestsList.userId': sessionUser } });
      }
      return res.send({ ...otherUser, requestAction: req.body.requestAction });
    }
  }
}
