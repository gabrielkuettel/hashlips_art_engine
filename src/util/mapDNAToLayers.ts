import { cleanDNA } from ".";
import type { MappedLayer, Layer } from "@types";

const mapDNAToLayers = (dna: string[] = [], layers: Layer[] = []) => {
  let mappedDNAToLayers: MappedLayer[] = layers.map((layer, index) => {
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

  return mappedDNAToLayers;
};

export default mapDNAToLayers;
