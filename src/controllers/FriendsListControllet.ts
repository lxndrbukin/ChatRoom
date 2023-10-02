import { Request, Response } from 'express';
import { controller, get, post, bodyValidator, use } from './decorators';
import FriendsList from '../models/FriendsList';

@controller('/_api')
class FriendsListController {
  @post('/friend_requests')
  async postFriendRequest(req: Request, res: Response) {
    if (req.session) {
      const currentUserReqs = await FriendsList.findOne({
        userId: req.session.userId,
      });
      const otherUserReqs = await FriendsList.findOne({
        userId: req.body.userId,
      });
      const sessionUser = {
        userId: req.session.userId,
        fullName: {
          firstName: req.session.fullName.firstName,
          lastName: req.session.fullName.lastName,
        },
      };
      const otherUser = {
        userId: req.body.userId,
        fullName: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        },
      };
      if (req.body.requestAction === 'Send') {
        if (currentUserReqs) {
          await currentUserReqs.updateOne({ $push: { sentRequests: otherUser } });
        } else {
          await FriendsList.create({
            userId: req.session.userId,
            sent: [otherUser],
          });
        }
        if (otherUserReqs) {
          await otherUserReqs.updateOne({ $push: { requestsList: sessionUser } });
        } else {
          await FriendsList.create({
            userId: req.body.userId,
            received: [sessionUser],
          });
        }
      } else if (
        req.body.requestAction === 'Accept' ||
        req.body.requestAction === 'Decline'
      ) {
        await currentUserReqs?.updateOne({ $pull: { received: otherUser } });
        await otherUserReqs?.updateOne({ $pull: { sent: sessionUser } });
      } else if (req.body.requestAction === 'Cancel') {
        await currentUserReqs?.updateOne({ $pull: { sent: otherUser } });
        await otherUserReqs?.updateOne({ $pull: { received: sessionUser } });
      }
      return res.send({ ...otherUser, requestAction: req.body.requestAction });
    }
  }
}
