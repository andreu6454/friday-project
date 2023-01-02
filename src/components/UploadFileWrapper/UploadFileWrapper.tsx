import { ChangeEvent, FC, ReactElement } from 'react';
import { convertFileToBase64 } from 'utils';

interface UploadFileWrapperProps {
  children: ReactElement;
  callback: (base64url: string) => void;
}

export const UploadFileWrapper: FC<UploadFileWrapperProps> = ({ children, callback }) => {
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64Url: string) => {
          callback(file64Url);
        });
      } else {
        console.error('Error: ', 'Файл слишком большого размера');
      }
    }
  };

  return (
    <label>
      <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
      {/* important!!! children should be with component type "span"*/}
      {children}
    </label>
  );
};
