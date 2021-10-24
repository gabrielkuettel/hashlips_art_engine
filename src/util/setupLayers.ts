import { getElements } from ".";
import { layersDir } from "../main";
import type { Layer, LayerOrder } from "@types";

const setupLayers = (layersOrder: LayerOrder): Layer[] => {
  const layers = layersOrder.map((layerObj, index) => ({
    id: index,
    name: layerObj.name,
    elements: getElements(`${layersDir}/${layerObj.name}/`),
    blendMode:
      layerObj["blend"] != undefined ? layerObj["blend"] : "source-over",
    opacity: layerObj["opacity"] != undefined ? layerObj["opacity"] : 1,
  }));

  return layers;
};

export default setupLayers;
