import { RARITY_DELIMITER } from "../config";

const getRarityWeight = (_str: string) => {
  let nameWithoutExtension = _str.slice(0, -4);
  var nameWithoutWeight = Number(
    nameWithoutExtension.split(RARITY_DELIMITER).pop()
  );
  if (isNaN(nameWithoutWeight)) {
    nameWithoutWeight = 0;
  }
  return nameWithoutWeight;
};

export default getRarityWeight;
