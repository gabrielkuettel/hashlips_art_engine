import { buildDir, canvas } from "../main";
import fs from "fs";

const saveImage = (editionCount: number) => {
  fs.writeFileSync(
    `${buildDir}/images/${editionCount}.png`,
    canvas.toBuffer("image/png")
  );
};

export default saveImage;
