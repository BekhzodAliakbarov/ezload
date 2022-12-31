import Avatar from 'components/avatar';
import React from 'react';
import {
  AvatarWrapper,
  DriverMainInfoContactWrapper,
  DriverMainInfosWrapper,
  DriversMainInfoDataWrapper,
  DriversMainInfoLocationsWrapper,
} from './driver-main-infos.styles';
import RatingComponent from 'components/rating/rating';
import Text from 'components/typography/text';
import Button from 'components/button/button';
import { SingleDriverResponse } from 'server-state/queries/use-driver';
import { useTranslation } from 'react-i18next';
import AcceptBidModal from 'components/modals/accept-bid-modal';
import DriverInfoCardSkeloton from 'components/skelotons/driver-info-card';
import { useNavigate } from 'react-router';

const DriverMainInfos: React.FC<{
  data?: SingleDriverResponse;
  bid_id?: string;
  bidded_price?: number;
  currency?: string;
  bidded_load_Id?: string;
}> = ({
  data,
  bid_id,
  bidded_price = 0,
  currency = '-',
  bidded_load_Id = 'nononono',
}) => {
  const { t } = useTranslation();
  const biddedDriver = Boolean(bid_id);
  const navigate = useNavigate();

  return (
    <>
      {data ? (
        <DriverMainInfosWrapper>
          <AvatarWrapper>
            <Avatar sizes="196px" src={data?.profile_picture?.file} />
            <RatingComponent value={data?.average_rate ?? 1} iconSize="20" />
          </AvatarWrapper>
          <DriversMainInfoDataWrapper>
            <Text className="name">{data?.first_name}</Text>
            <Text className="weight_loads">
              {data?.vehicle?.title.toLocaleUpperCase()} (
              {data?.vehicle?.capacity} Ton)
            </Text>
            <Text className="number_loads" weight="700">
              1K+ {t('LOADS')}
            </Text>
            <Text className="label_number">{t('Plate number')}</Text>
            <Text className="car_number" weight="700">
              {data?.vehicle?.licence_plate}
            </Text>
          </DriversMainInfoDataWrapper>
          <DriversMainInfoLocationsWrapper>
            <Text className="label">{t('Locations')}</Text>
            <div>
              {data.routes && data.routes.length > 0 ? (
                data.routes.map((location, index) => (
                  <Text key={index} weight="700">
                    {location.country.title}, {location.region.title}
                  </Text>
                ))
              ) : (
                <Text weight="700">{t('No routes yet')}</Text>
              )}
            </div>
          </DriversMainInfoLocationsWrapper>
          <DriverMainInfoContactWrapper>
            <Text className="label">{t('Driver сontact')}</Text>
            <h2 className="number">
              +{data?.phone_number ?? 'backend donot send number'}
            </h2>
            {bidded_price && (
              <>
                <Text className="label">{t('Offered price')}</Text>
                <h2 className="number">
                  {bidded_price} {currency}
                </h2>
              </>
            )}
          </DriverMainInfoContactWrapper>
          {biddedDriver && (
            <Button
              style={{ marginBottom: '20px', marginTop: '0px' }}
              fullWidth
              buttonType="secondary_dark"
              onClick={() => navigate(`/load/${bidded_load_Id}`)}
            >
              {t('Load info')}
            </Button>
          )}
          {biddedDriver && (
            <AcceptBidModal
              bid_id={bid_id}
              currency={currency}
              bidded_price={bidded_price}
              driver_name={data?.first_name}
            >
              <Button aria-label="accept bid" fullWidth buttonType="warning">
                {t('Accept bid')}
              </Button>
            </AcceptBidModal>
          )}
        </DriverMainInfosWrapper>
      ) : (
        <DriverInfoCardSkeloton />
      )}
    </>
  );
};

export default DriverMainInfos;
