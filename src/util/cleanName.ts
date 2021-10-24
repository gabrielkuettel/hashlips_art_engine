import { rarityDelimiter } from "../config";

const cleanName = (_str: string) => {
  let nameWithoutExtension = _str.slice(0, -4);
  var nameWithoutWeight = nameWithoutExtension.split(rarityDelimiter).shift();
  return nameWithoutWeight;
};

export default cleanName;
