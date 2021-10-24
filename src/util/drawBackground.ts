import { format } from "../config";
import { ctx } from "../main";
import { genColor } from ".";

const drawBackground = () => {
  ctx.fillStyle = genColor();
  ctx.fillRect(0, 0, format.width, format.height);
};

export default drawBackground;
