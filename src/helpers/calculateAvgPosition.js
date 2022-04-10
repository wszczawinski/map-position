export const calculateAvgPosition = (mapObjects, direction) => {
  return (
    mapObjects?.reduce((a, b) => {
      return a + b?.location[`${direction}`];
    }, 0) / mapObjects.length
  );
};
