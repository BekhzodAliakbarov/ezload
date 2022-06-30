import LoadsContainer from 'components/loads-container/loads-container';
import Text from 'components/typography/text';
import React, { useState, useEffect } from 'react';
import { useLoads } from 'server-state/queries/use-load';
import {
  ProfileLoadsWrapper,
  SectionControllerWrapper,
  SingleController,
} from './profile-loads.styles';

const ProfileLoads = () => {
  const [sectionType, setSectionType] = useState<'NEW' | 'PENDING' | 'DONE'>(
    'NEW'
  );
  const newLoadsRequest = useLoads('new');
  const onTheWayLoadsRequest = useLoads('on_the_way');
  const deliveredLoadsRequest = useLoads('delivered');

  useEffect(() => {
    switch (sectionType) {
      case 'NEW':
        newLoadsRequest.refetch();
        break;
      case 'PENDING':
        onTheWayLoadsRequest.refetch();
        break;
      case 'DONE':
        deliveredLoadsRequest.refetch();
        break;
      default:
        console.log('ERROR');
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionType]);
  const onClickHandler = (type: 'NEW' | 'PENDING' | 'DONE') => {
    setSectionType(type);
  };

  return (
    <ProfileLoadsWrapper>
      <SectionControllerWrapper>
        <SingleController
          onClick={() => onClickHandler('NEW')}
          active={sectionType === 'NEW'}
        >
          <Text weight="700">New</Text>
        </SingleController>
        <SingleController
          onClick={() => onClickHandler('PENDING')}
          active={sectionType === 'PENDING'}
        >
          <Text weight="700">On the way</Text>
        </SingleController>
        <SingleController
          onClick={() => onClickHandler('DONE')}
          active={sectionType === 'DONE'}
        >
          <Text weight="700">Delivered</Text>
        </SingleController>
      </SectionControllerWrapper>
      {sectionType === 'NEW' &&
        newLoadsRequest.data?.pages &&
        newLoadsRequest.data.pages.map((page, index) => (
          <LoadsContainer
            hasNextPage={newLoadsRequest.hasNextPage}
            key={index}
            loads={page.results}
            loadType="new"
          />
        ))}
      {sectionType === 'PENDING' &&
        onTheWayLoadsRequest.data?.pages &&
        onTheWayLoadsRequest.data.pages.map((page, index) => (
          <LoadsContainer
            hasNextPage={onTheWayLoadsRequest.hasNextPage}
            key={index}
            loads={page.results}
            loadType="on_the_way"
          />
        ))}
      {sectionType === 'DONE' &&
        deliveredLoadsRequest.data?.pages &&
        deliveredLoadsRequest.data.pages.map((page, index) => (
          <LoadsContainer
            hasNextPage={deliveredLoadsRequest.hasNextPage}
            key={index}
            loads={page.results}
            loadType="delivered"
          />
        ))}
    </ProfileLoadsWrapper>
  );
};

export default ProfileLoads;
