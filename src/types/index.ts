import type { Image } from "canvas";

export type AttributesList = {
  trait_type: string;
  value: string;
};

export type MetadataList = {
  edition: number;
  dna: any;
  name: string;
  description: string;
  image: string;
  imageChecksum: string;
  assetId: null;
  dateGenerated: string;
  dateMinted: null;
  attributes: any;
  compiler: string;
};

/**
 * @description An array of all the created DNA (DNA is an array of element strings)
 * @example `[["14:Yellow Sunglasses#30.png", "7:Green Eyes#50.png"]]`
 */
export type DNAList = DNA[];

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
 * @description this is a layer.
 */
export type Layer = {
  id: number;
  name: string;
  elements: LayerElement[];
  blendMode: any;
  opacity: any;
};

export type LayerElement = {
  id: number;
  name: string | undefined;
  filename: string;
  path: string;
  weight: number;
};

export type LayerOrder = {
  name: string;
  blend?: string;
  opacity?: number;
}[];

export type LayerConfigurations = {
  growEditionSizeTo: number;
  layersOrder: LayerOrder;
}[];

export type LoadedImage = {
  layer: MappedLayer;
  loadedImage: Image;
};

export type MappedLayer = {
  name: string;
  blendMode: any;
  opacity: any;
  selectedElement: LayerElement | undefined;
};
