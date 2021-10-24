import type { Layer } from "./setupLayers";

/**
 * @description String of the element including the id, name and the filename.
 * @example `"14:Yellow Sunglasses#30.png"`
 */
export type ElementString = string;

/**
 * @description An array of element strings.
 * @example `["14:Yellow Sunglasses#30.png", "7:Green Eyes#50.png"]`
 */
export type DNA = ElementString[];

/**
 * @description Chooses an element for each layer based on its weight and returns them as an array of strings.
 * @example `[0:green background#10.png, 13:blue eyes#10.png, 2:yello jacket#30.png]`
 */
const createWeightedDNA = (layers: Layer[]) => {
  let weightedLayers: DNA = [];

  layers.forEach((layer) => {
    var totalWeight = 0;

    layer.elements.forEach((element) => {
      totalWeight += element.weight;
    });

    // number between 0 - totalWeight
    let random = Math.floor(Math.random() * totalWeight);

    for (var i = 0; i < layer.elements.length; i++) {
      // subtract the current weight from the random weight until we reach a sub zero value.
      random -= layer.elements[i].weight;
      if (random < 0) {
        return weightedLayers.push(
          `${layer.elements[i].id}:${layer.elements[i].filename}`
        );
      }
    }
  });

  return weightedLayers;
};

export default createWeightedDNA;