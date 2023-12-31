import { Request, Response } from 'express';
import { controller, use, get, post } from './decorators';
import Multer from 'multer';
import Profile from '../models/Profile';
import { v2 as cloudinary } from 'cloudinary';

const storage = Multer.memoryStorage();
const upload = Multer({ storage });

@controller('/_api')
class ProfileController {
  @get('/profile')
  async getProfile(req: Request, res: Response) {
    const profile = await Profile.findOne({ userId: req.query.userId }).select('-_id -__v');
    return res.send(profile);
  }

  @post('/profile/upload_img')
  @use(upload.single('photo'))
  async postUploadImg(req: Request, res: Response) {
    let img;
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = 'data:' + req.file!.mimetype + ';base64,' + b64;
      const response = await cloudinary.uploader.upload(dataURI, {
        resource_type: 'auto',
      });
      img = response.url;
    }
    return res.send(img);
  }

  @post('/profile/delete_img')
  async postDeleteImg(req: Request, res: Response) {
    const { img } = req.body;
    const arr = img.split('/');
    const id = arr[arr.length - 1].split('.')[0];
    await cloudinary.uploader.destroy(id);
    return res.send({});
  }

  @post('/profile/edit')
  @use(upload.fields([]))
  async postUpdateProfile(req: Request, res: Response) {
    console.log(req.body);
    for (let key in req.body) {
      try {
        if (typeof req.body[key] === 'string') {
          req.body = { ...req.body, [key]: JSON.parse(req.body[key]) };
        }
      } catch (err) {
        req.body = { ...req.body, [key]: req.body[key] };
      }
    }
    const profile = await Profile.findOneAndUpdate(
      { userId: req.session!.userId },
      { ...req.body },
      { new: true }
    ).select('-_id -__v');
    return res.send(profile);
  }
}