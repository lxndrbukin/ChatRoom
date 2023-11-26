import React, { ChangeEvent, MouseEvent } from 'react';
import { ProfileEditModalProps } from '../types';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';

Modal.setAppElement('#root');

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  handleClose,
  avatar,
  handleSetAvatar,
}): JSX.Element => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      height: 'fit-content',
      padding: '15px',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.72)',
    },
  };

  const handleUploadFile = async (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const data = new FormData();
    if (file) {
      data.append('photo', file as File);
    }
    const res = await axios.post('/_api/profile/upload_img', data);
    handleSetAvatar(res.data);
  };

  const handleDeleteFile = async (e: MouseEvent) => {
    if (avatar) {
      await axios.post('/_api/profile/delete_img', { img: avatar });
    }
    handleSetAvatar(null);
    handleClose(e);
  };

  const renderAvatarSelected = () => {
    return (
      <React.Fragment>
        <img
          src={avatar!}
          style={{ width: '200px', height: '200px', objectFit: 'cover' }}
          alt=''
        />
        <div className='avatar-modal-buttons'>
          <button onClick={handleClose} className='ui-form-button'>
            Confirm
          </button>
          <button onClick={handleDeleteFile} className='ui-form-button'>
            Cancel
          </button>
        </div>
      </React.Fragment>
    );
  };

  const renderSelectFile = () => {
    return (
      <React.Fragment>
        <div className='avatar-modal-text'>
          Please upload a real photo of yourself so your friends can recognize
          you. We support JPG, GIF or PNG files.
        </div>
        <label htmlFor='upload-photo' className='ui-form-button'>
          Select a file
        </label>
        <input id='upload-photo' type='file' onChange={handleUploadFile} />
      </React.Fragment>
    );
  };

  return (
    <Modal
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={handleDeleteFile}
    >
      <div className='profile-edit-avatar-modal'>
        <div className='avatar-modal-header'>
          <span>You profile photo</span>
          <IoClose onClick={handleDeleteFile} size={23} />
        </div>
        {!avatar && renderSelectFile()}
        {avatar && renderAvatarSelected()}
      </div>
    </Modal>
  );
};
