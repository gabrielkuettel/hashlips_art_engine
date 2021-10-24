import { loadImage } from "canvas";
import {} from "./mapDNAToLayers";
import type { MappedLayer, LoadedImage } from "@types";

const loadLayerImg = async (layer: MappedLayer): Promise<LoadedImage> => {
  return new Promise<LoadedImage>(async (resolve) => {
    const loadedImage = await loadImage(`${layer?.selectedElement?.path}`);
    resolve({ layer, loadedImage });
  });
};

export default loadLayerImg;
