export const getDate = ({ date = '' }: { date: string }) => {
  const dateFormat = new Date(date);

  const result = dateFormat.toLocaleString('en', {
    year: 'numeric',
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
  });
  return result;
};

export const getSmallDate = ({ date = '' }: { date: string }) => {
  const dateFormat = new Date(date);

  const result = dateFormat.toLocaleString('en', {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
  });
  return result;
};
