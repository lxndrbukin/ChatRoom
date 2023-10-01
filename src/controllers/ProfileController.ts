import { Request, Response } from 'express';
import { controller, use, get, post } from './decorators';
import { MulterRequest } from './types';
import Multer from 'multer';
import Profile from '../models/Profile';
import User from '../models/User';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dpjgiuxf2',
  api_key: '469618289571349',
  api_secret: '0PUkvOQmZmpYQYPN3Ljx94gVFVQ'
});

const storage = Multer.memoryStorage();
const upload = Multer({ storage });

@controller('/_api')
class ProfileController {
  @get('/profile')
  async getProfile(req: Request, res: Response) {
    const profile = await Profile.findOne({ userId: req.body.userId });
    return res.send(profile);
  }


  @post('/profile/edit')
  @use(upload.single('my_file'))
  async postUpdateProfile(req: Request, res: Response) {
    const b64 = Buffer.from(req.file!.buffer).toString('base64');
    const dataURI = 'data:' + req.file!.mimetype + ';base64,' + b64;
    const response = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'auto',
    });
    const user = await User.findOneAndUpdate({ userId: req.session!.userId }, { mainPhoto: response.url }, { new: true }).select('-_id -password -__v');
    const profile = await Profile.findOneAndUpdate({ userId: req.session!.userId }, { mainPhoto: response.url }, { new: true }).select('-_id -__v');
    req.session = user;
    return res.send({ user, profile });
  }
}