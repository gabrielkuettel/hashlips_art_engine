import { getElements } from ".";
import { layersDir } from "../main";
import { LayerOrder } from "../config";

/**
 * @description this is a type.
 */
export type Layer = {
  id: number;
  name: string;
  elements: Element[];
  blendMode: any;
  opacity: any;
};

export type Element = {
  id: number;
  name: string | undefined;
  filename: string;
  path: string;
  weight: number;
};

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
