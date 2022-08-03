import Avatar from 'components/avatar';
import Button from 'components/button/button';
import GaleryIcon from 'components/icons/galery.icon';
import InfoIcon from 'components/icons/info.icon';
import FileInput from 'components/input/file-input';
import Input from 'components/input/input';
import Text from 'components/typography/text';
import { useSteps } from 'global-state/step/step-context';
import React, { useState } from 'react';
import { useCreateDriverProfile } from 'server-state/mutations/use-create-profile';
import { useUpload } from 'server-state/mutations/use-upload';
import {
  DriverSignInThirdStepWrapper,
  ErrorMessageData,
  ErrorMessageWrapper,
  NameInputWrapper,
  PictureAndNameWrapper,
  ProfilePhotoUploaderWrapper,
  SignInStepShowInfoWrapper,
  ThirdStepDataWrapper,
  TruckInputsWrapper,
} from './third-step.styles';

const ThirdStepDriver: React.FC<{
  token: string;
}> = ({ token }) => {
  const [hasError, setHasError] = useState(false);
  const [data, setData] = useState<{
    picture_url?: string;
    picture_id?: number;
    first_name: string;
    vehicle_title: string;
    licence_plate: string;
    capacity: string;
  }>({
    first_name: '',
    capacity: '',
    licence_plate: '',
    vehicle_title: '',
  });
  const createProfileRequest = useCreateDriverProfile();
  const { nextStep } = useSteps();
  const uploadImageRequest = useUpload();

  const uploadFileHandler = (val: Blob | File) => {
    if (val) {
      uploadImageRequest.mutate(
        { token, file: val },
        {
          onSuccess(res) {
            setData((initialValue) => {
              return {
                ...initialValue,
                picture_id: res.id,
                picture_url: res.file,
              };
            });
          },
        }
      );
    }
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    createProfileRequest.mutate(
      {
        token,
        user: {
          first_name: data.first_name,
          last_name: data.first_name,
          profile_picture: data.picture_id ?? 0,
        },
        vehicle: {
          capacity: data.capacity,
          licence_plate: data.licence_plate,
          title: data.vehicle_title,
        },
        routes: [
          {
            country: 2,
            region: 2,
          },
        ],
      },
      {
        onSuccess() {
          nextStep();
        },
      }
    );
  };

  return (
    <DriverSignInThirdStepWrapper onSubmit={submitHandler}>
      {hasError && (
        <ErrorMessageWrapper>
          <ErrorMessageData>
            <InfoIcon />
            <p>Sorry, this mobile not registered</p>
          </ErrorMessageData>
        </ErrorMessageWrapper>
      )}
      <ThirdStepDataWrapper>
        <Text size="lg" weight="800">
          Personal and truck info
        </Text>
        <SignInStepShowInfoWrapper>
          <Text color="main_90" size="lg" weight="800">
            Step 1/2
          </Text>
        </SignInStepShowInfoWrapper>
        <PictureAndNameWrapper>
          <label htmlFor="profile_photo">
            <ProfilePhotoUploaderWrapper>
              {data.picture_url ? (
                <Avatar sizes="120px" src={data.picture_url} />
              ) : (
                <GaleryIcon />
              )}
              <FileInput
                onChange={(e) =>
                  e.target.files && uploadFileHandler(e.target.files[0])
                }
                id="profile_photo"
                accept="image/*"
              />
            </ProfilePhotoUploaderWrapper>
          </label>
          <NameInputWrapper>
            <label htmlFor="name">Your displayed name</label>
            <Input
              value={data.first_name}
              onChange={(e) => setData({ ...data, first_name: e.target.value })}
              placeholder="Write your name"
              id="name"
            />
          </NameInputWrapper>
        </PictureAndNameWrapper>
        <TruckInputsWrapper>
          <Text>Truck info</Text>
          <Input
            value={data.vehicle_title}
            onChange={(e) =>
              setData({ ...data, vehicle_title: e.target.value })
            }
            placeholder="Truck model"
            required
          />
          <Input
            value={data.licence_plate}
            onChange={(e) =>
              setData({ ...data, licence_plate: e.target.value })
            }
            placeholder="Plate number"
            required
          />
          <Input
            value={data.capacity}
            onChange={(e) => setData({ ...data, capacity: e.target.value })}
            placeholder="Truck capacity (in tonnes)"
            required
          />
        </TruckInputsWrapper>
        <Button fullWidth type="submit">
          Next
        </Button>
      </ThirdStepDataWrapper>
    </DriverSignInThirdStepWrapper>
  );
};

export default ThirdStepDriver;
