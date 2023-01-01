import { ChangeEvent, FC, ReactElement } from 'react';
import { convertFileToBase64 } from 'utils';

interface UploadFileWrapperProps {
  children: ReactElement;
  cover: string;
  setCover: (v: string) => void;
}

export const UploadFileWrapper: FC<UploadFileWrapperProps> = ({
  children,
  cover,
  setCover,
}) => {
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          setCover(file64);
        });
      } else {
        console.error('Error: ', 'Файл слишком большого размера');
      }
    }
  };

  return (
    <label>
      <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
      {children}
    </label>
  );
};
