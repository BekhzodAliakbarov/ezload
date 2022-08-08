import InfiniteLoader from 'components/loaders/infinite-loader';
import Spinner from 'components/loaders/spinner';
import Popper from 'components/popper/popper';
import Text from 'components/typography/text';
import { bindPopper, bindToggle, usePopper } from 'hooks/use-popper';
import { debounce } from 'lodash';
import React, { useState, useCallback, useEffect } from 'react';
import { useCountry } from 'server-state/queries/use-country';
import { SearchInput } from '../search-input';
import { Div, List, popperStyles, Rows } from '../input.styles';

const CountryInput: React.FC<{
  value: string;
  selectHanlder: ({ id, title }: { title: string; id: string }) => void;
}> = ({ value, selectHanlder }) => {
  const popperState = usePopper();
  const [country, setCountry] = useState(value);
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    data,
  } = useCountry({ search: country });

  useEffect(() => {
    refetch();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = useCallback(
    debounce(() => {
      refetch();
    }, 500),
    [country.length]
  );

  const handleSelect = ({ id, title }: { title: string; id: string }) => {
    setCountry(title);
    selectHanlder({ id, title });
  };

  return (
    <Popper
      {...bindPopper(popperState)}
      offset={{
        away: 20,
      }}
      paperstyles={popperStyles}
      placement="bottom"
      style={{ zIndex: 6 }}
      content={
        <List>
          <InfiniteLoader
            loadMore={fetchNextPage}
            hasMore={!!hasNextPage}
            loading={isFetchingNextPage}
          >
            <Spinner loading={isLoading} height="100%">
              {data?.pages.map((page, index) =>
                page?.count > 0 ? (
                  page.results.map((item) => (
                    <Rows
                      key={item.id}
                      onClick={() => {
                        handleSelect({
                          id: String(item.id),
                          title: item.title,
                        });
                        popperState.close();
                      }}
                    >
                      {item.title}
                    </Rows>
                  ))
                ) : (
                  <Div key={index}>
                    <Text>Country not found</Text>
                  </Div>
                )
              )}
            </Spinner>
          </InfiniteLoader>
        </List>
      }
    >
      <SearchInput
        required
        {...bindToggle(popperState)}
        placeholder="Country"
        onChange={(e) => {
          setCountry(e.target.value);
          handleSearch();
        }}
        value={country}
      />
    </Popper>
  );
};

export default CountryInput;
