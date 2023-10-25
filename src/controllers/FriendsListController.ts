import { Request, Response } from 'express';
import { controller, get, post } from './decorators';
import { FriendRequestAction } from './types';
import { UserId } from '../models/types';
import FriendsList from '../models/FriendsList';
import User from '../models/User';

@controller('/_api')
class FriendsListController {
  @get('/friends_list')
  async getUserFriendsList(req: Request, res: Response) {
    const lists = await FriendsList.findOne({
      userId: req.query.userId,
    }).select('-_id -__v');
    return res.send(lists);
  }

  @get('/profile_friends_list')
  async getProfileFriendsList(req: Request, res: Response) {
    let friendsList: any[] = [];
    const listRes = await FriendsList.findOne({
      userId: req.query.userId,
    }).select('-_id -__v -sentRequests -requestsList');
    listRes?.friendsList.map(async (user: any) => {
      const userRes = await User.findOne({ userId: user.userId }).select(
        '-_id -__v -password'
      );
      friendsList.push(userRes);
    });
    return res.send(friendsList);
  }

  @get('/friend_requests')
  async getFriendRequest(req: Request, res: Response) {
    const listRes = await FriendsList.findOne({
      userId: req.query.userId,
    }).select('-friendsList -sentRequests');
    const requestsList = listRes!.requestsList.map(async (request: UserId) => {
      const { userId } = request;
      return await User.findOne({ userId }).select('-_id -__v -password');
    });
    console.log(requestsList.length);
    return res.send(requestsList);
  }

  @post('/friend_requests')
  async postFriendRequest(req: Request, res: Response) {
    if (req.session) {
      let currentUserReqs = await FriendsList.findOne({
        userId: req.session.userId,
      });
      let otherUserReqs = await FriendsList.findOne({
        userId: req.body.userId,
      });
      const sessionUserId = req.session.userId;
      const otherUserId = req.body.userId;

      switch (req.body.requestAction) {
        case FriendRequestAction.Send:
          if (currentUserReqs) {
            currentUserReqs = await FriendsList.findOneAndUpdate(
              { userId: sessionUserId },
              { $push: { sentRequests: { userId: otherUserId } } },
              { new: true }
            );
          }
          currentUserReqs = await FriendsList.create({
            userId: req.session.userId,
            sentRequests: [{ userId: otherUserId }],
          });
          if (otherUserReqs) {
            otherUserReqs = await FriendsList.findOneAndUpdate(
              { userId: otherUserId },
              {
                $push: { requestsList: { userId: sessionUserId, checked: false } },
              },
              { new: true }
            );
          }
          otherUserReqs = await FriendsList.create({
            userId: req.body.userId,
            requestsList: [{ userId: sessionUserId, checked: false }],
          });
          break;
        case FriendRequestAction.Accept || FriendRequestAction.Decline:
          currentUserReqs = await FriendsList.findOneAndUpdate(
            { userId: sessionUserId },
            { $pull: { requestsList: { userId: otherUserId } } },
            { new: true }
          );
          otherUserReqs = await FriendsList.findOneAndUpdate(
            { userId: otherUserId },
            { $pull: { sentRequests: { userId: sessionUserId } } },
            { new: true }
          );
          break;
        case FriendRequestAction.Cancel:
          currentUserReqs = await FriendsList.findOneAndUpdate(
            { userId: sessionUserId },
            { $pull: { sentRequests: { userId: otherUserId } } },
            { new: true }
          );
          otherUserReqs = await FriendsList.findOneAndUpdate(
            { userId: otherUserId },
            { $pull: { requestsList: { userId: sessionUserId } } },
            { new: true }
          );
          break;
      }
      return res.send(currentUserReqs);
    }
  }
}
