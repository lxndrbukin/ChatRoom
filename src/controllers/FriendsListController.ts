import { Request, Response } from 'express';
import { controller, get, post, bodyValidator, use } from './decorators';
import { IUser } from '../models/types';
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
    let requestsList: any = [];
    const response = await FriendsList.findOne({
      userId: req.query.userId,
    }).select('-friendsList -sentRequests');
    response?.requestsList.map(async (request) => {
      const { userId } = request;
      const user = await User.findOne({ userId }).select('-_id -__v -password');
      requestsList.push(user);
    });
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
      const sessionUser = req.session.userId;
      const otherUser = req.body.userId;
      if (req.body.requestAction === 'send') {
        if (currentUserReqs) {
          currentUserReqs = await FriendsList.findOneAndUpdate(
            { userId: sessionUser },
            { $push: { sentRequests: { userId: otherUser } } },
            { new: true }
          );
        } else {
          currentUserReqs = await FriendsList.create({
            userId: req.session.userId,
            sentRequests: [{ userId: otherUser }],
          });
        }
        if (otherUserReqs) {
          otherUserReqs = await FriendsList.findOneAndUpdate(
            { userId: otherUser },
            {
              $push: { requestsList: { userId: sessionUser, checked: false } },
            },
            { new: true }
          );
        } else {
          otherUserReqs = await FriendsList.create({
            userId: req.body.userId,
            requestsList: [{ userId: sessionUser, checked: false }],
          });
        }
      } else if (
        req.body.requestAction === 'accept' ||
        req.body.requestAction === 'decline'
      ) {
        currentUserReqs = await FriendsList.findOneAndUpdate(
          { userId: sessionUser },
          { $pull: { requestsList: { userId: otherUser } } },
          { new: true }
        );
        otherUserReqs = await FriendsList.findOneAndUpdate(
          { userId: otherUser },
          { $pull: { sentRequests: { userId: sessionUser } } },
          { new: true }
        );
      } else if (req.body.requestAction === 'cancel') {
        currentUserReqs = await FriendsList.findOneAndUpdate(
          { userId: sessionUser },
          { $pull: { sentRequests: { userId: otherUser } } },
          { new: true }
        );
        otherUserReqs = await FriendsList.findOneAndUpdate(
          { userId: otherUser },
          { $pull: { requestsList: { userId: sessionUser } } },
          { new: true }
        );
      }
      return res.send(currentUserReqs);
    }
  }
}
