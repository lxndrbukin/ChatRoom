import React from 'react';
import { ProfileEditModalProps } from '../types';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';

Modal.setAppElement('#root');

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  handleClose,
  handleSetFile,
}): JSX.Element => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.72)',
    },
  };

  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={handleClose}>
      <div className='profile-edit-avatar-modal'>
        <IoClose onClick={handleClose} size={23} />
        <div className='avatar-modal-text'>
          Please upload a real photo of yourself so your friends can recognize
          you. We support JPG, GIF or PNG files.
        </div>
        <label htmlFor='upload-photo' className='ui-form-button'>
          Select a file
        </label>
        <input id='upload-photo' type='file' onChange={handleSetFile} />
      </div>
    </Modal>
  );
};
