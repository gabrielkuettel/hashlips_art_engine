import { FORMAT } from "../config";
import { ctx } from "../main";
import { genColor } from ".";

const drawBackground = () => {
  ctx.fillStyle = genColor();
  ctx.fillRect(0, 0, FORMAT.width, FORMAT.height);
};

export default drawBackground;
