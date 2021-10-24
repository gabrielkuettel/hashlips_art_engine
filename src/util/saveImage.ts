import { buildDir, canvas } from "../main";
import fs from "fs";

const saveImage = (_editionCount: number) => {
  fs.writeFileSync(
    `${buildDir}/images/${_editionCount}.png`,
    canvas.toBuffer("image/png")
  );
};

export default saveImage;
