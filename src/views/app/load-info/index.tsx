import { Modal } from '@mui/material';
import Button from 'components/button/button';
import LoadInfoCard from 'components/cards/load-info-card';
import LoadCard from 'components/cards/single-load/load-card';
import BidIcon from 'components/icons/bid.icon';
import Input from 'components/input/input';
import Text from 'components/typography/text';
import { useDriver } from 'hooks/use-driver';
import { useModal } from 'hooks/use-modal';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useCreateBid } from 'server-state/mutations/use-create-bid';
import { useLoad } from 'server-state/queries/use-load';
import LoadBids from './load-bids';
import LoadCreator from './load-creator';
import {
  LoadInfoDataWrapperBox,
  LoadInfoViewWrapper,
  LoadInfowViewHeader,
  MakeBidModalWrapper,
  ModalButtonsWrapper,
} from './load-info.styles';

const LoadInfoView = () => {
  const { load_id } = useParams<{
    load_id: string;
  }>();

  const { close, isOpen, open } = useModal();
  const { isDriver } = useDriver();
  const singleLoadRequest = useLoad({ load_id });
  const createBidRequest = useCreateBid();

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      price: { value: string };
    };
    createBidRequest.mutate(
      {
        load: load_id,
        price: target.price.value,
      },
      {
        onSuccess() {
          close();
        },
      }
    );

    // close();
  };

  return (
    <>
      <LoadInfoViewWrapper>
        <LoadInfowViewHeader>
          <Text weight="700">Load Details</Text>
          {isDriver && (
            <>
              {singleLoadRequest.data?.status === 1 ? (
                <Button onClick={open}>Bid to the load</Button>
              ) : (
                singleLoadRequest.data?.status === 2 && (
                  <Button
                    startIcon={<BidIcon />}
                    variant="outlined"
                    disabled
                    buttonType="disabled"
                  >
                    Bid to the load
                  </Button>
                )
              )}
            </>
          )}
        </LoadInfowViewHeader>
        <LoadInfoDataWrapperBox>
          {singleLoadRequest.data && (
            <LoadCard
              clickable={false}
              load={singleLoadRequest.data}
              withButtons
            />
          )}
          {singleLoadRequest.data && (
            <LoadInfoCard data={singleLoadRequest.data} />
          )}
        </LoadInfoDataWrapperBox>
        {isDriver ? (
          <LoadCreator data={singleLoadRequest.data} />
        ) : (
          <LoadBids data={singleLoadRequest.data} />
        )}
      </LoadInfoViewWrapper>
      {/* Bid Modal */}
      <Modal open={isOpen} onClose={close}>
        <MakeBidModalWrapper onSubmit={submitHandler}>
          <Text className="header">Make a bid</Text>
          <Text className="cost">
            Customer’s suggestion {singleLoadRequest.data?.price} USD
          </Text>
          <Input name="price" placeholder="Your bid (USD)" />
          <ModalButtonsWrapper>
            <Button>Submit</Button>
            <Button type="button" onClick={close} buttonType="white">
              Cancel
            </Button>
          </ModalButtonsWrapper>
        </MakeBidModalWrapper>
      </Modal>
    </>
  );
};

export default LoadInfoView;
