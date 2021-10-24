import crypto from "crypto";
import fs from "fs";

const getChecksum = (filepath: string) => {
  const file_buffer = fs.readFileSync(filepath);
  const sum = crypto.createHash("md5").update(file_buffer).digest("hex");

  return sum;
};

export default getChecksum;
