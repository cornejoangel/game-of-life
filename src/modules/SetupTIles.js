const SetupTiles = (xLimit, yLimit) => {
  const tileArray = [];

  for (let i = 0; i < yLimit; i += 1) {
    for (let j = 0; j < xLimit; j += 1) {
      tileArray.push({ x: j, y: i, on: false });
    }
  }

  return tileArray;
};

export default SetupTiles;
