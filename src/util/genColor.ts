import { BACKGROUND } from "../config";

const genColor = () => {
  let hue = Math.floor(Math.random() * 360);
  let pastel = `hsl(${hue}, 100%, ${BACKGROUND.brightness})`;
  return pastel;
};

export default genColor;
