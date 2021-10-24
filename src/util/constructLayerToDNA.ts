import { cleanDNA } from ".";
import { Layer } from "./setupLayers";

const constructLayerToDNA = (dna: string[] = [], layers: Layer[] = []) => {
  let mappedDnaToLayers = layers.map((layer, index) => {
    let selectedElement = layer.elements.find(
      (element) => element.id == cleanDNA(dna[index])
    );

    return {
      name: layer.name,
      blendMode: layer.blendMode,
      opacity: layer.opacity,
      selectedElement: selectedElement,
    };
  });

  return mappedDnaToLayers;
};

export default constructLayerToDNA;
