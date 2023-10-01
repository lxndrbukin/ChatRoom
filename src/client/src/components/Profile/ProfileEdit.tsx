import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState, updateProfile } from '../../store';

export const ProfileEdit: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootState) => state.session);
  const [file, setFile] = useState<File | null>(null);

  const handleSetFile = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setFile(file);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.append('my_file', file as File);
    dispatch(updateProfile(data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='file' onChange={handleSetFile} />
      <button>Submit</button>
    </form>
  );
};
