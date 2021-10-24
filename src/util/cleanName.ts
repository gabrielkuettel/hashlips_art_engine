import { RARITY_DELIMITER } from "../config";

const cleanName = (str: string) => {
  let nameWithoutExtension = str.slice(0, -4);
  var nameWithoutWeight = nameWithoutExtension.split(RARITY_DELIMITER).shift();
  return nameWithoutWeight;
};

export default cleanName;
