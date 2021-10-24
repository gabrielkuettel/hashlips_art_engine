import { cleanDNA } from ".";

const constructLayerToDNA = (_dna: any = [], _layers: any = []) => {
  let mappedDnaToLayers = _layers.map((layer: any, index) => {
    let selectedElement = layer.elements.find(
      (e) => e.id == cleanDNA(_dna[index])
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
