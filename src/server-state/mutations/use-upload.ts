import { useMutation } from 'react-query';
import { useState } from 'react';
import { request } from '../api';
import { useSnackbar } from 'notistack';

interface UploadRequest {
  file?: Blob | File;
  token: string;
}

interface UploadResponse {
  file: string;
  format: string;
  id: number;
  title: string;
}

export const useUpload = () => {
  const [progress, setProgress] = useState<number>(0);
  const { enqueueSnackbar } = useSnackbar();
  const mutationObject = useMutation(
    (data: UploadRequest) => {
      const fd = new FormData();
      fd.append('file', data.file ?? '');
      return request
        .post<UploadResponse>('/media/create/', fd, {
          headers: {
            Authorization: `Token ${data.token}`,
          },
          onUploadProgress: (progressEvent) => {
            const progressAmount = Math.floor(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(progressAmount);
          },
        })
        .then((res) => res.data);
    },
    {
      retry: false,
      onSuccess() {
        enqueueSnackbar('Media uploaded succesfully!', { variant: 'success' });
      },
      onError(err) {
        enqueueSnackbar('Something went wrong!', { variant: 'error' });
        console.log('ERROR', err);
      },
    }
  );
  return { progress, ...mutationObject };
};
