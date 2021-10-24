import { rarityDelimiter } from "../config";

const cleanName = (str: string) => {
  let nameWithoutExtension = str.slice(0, -4);
  var nameWithoutWeight = nameWithoutExtension.split(rarityDelimiter).shift();
  return nameWithoutWeight;
};

export default cleanName;
