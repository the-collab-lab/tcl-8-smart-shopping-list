const secondsToDays = seconds => {
  const days = Math.floor(Number(seconds) / (3600 * 24));
  return days;
};

export default secondsToDays;
