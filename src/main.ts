import path from "path";
import sha1 from "sha1";
import fs from "fs";
import { createCanvas } from "canvas";

import type { DNA } from "./util/createWeightedDNA";

import {
  setupLayers,
  shuffle,
  saveImage,
  drawBackground,
  getChecksum,
  loadLayerImg,
  constructLayerToDNA,
  isDNAUnique,
  createWeightedDNA,
} from "./util";

export const basePath = process.cwd();
export const buildDir = path.join(basePath, "/build");
export const layersDir = path.join(basePath, "/layers");

import {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
} from "./config";

export const canvas = createCanvas(format.width, format.height);
export const ctx = canvas.getContext("2d");

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

export type DNAList = Array<DNA>;

let attributesList: AttributesList[] = [];
const metadataList: MetadataList[] = [];
const dnaList: DNAList = [];

const buildSetup = () => {
  if (fs.existsSync(buildDir)) {
    fs.rmdirSync(buildDir, { recursive: true });
  }
  fs.mkdirSync(buildDir);
  fs.mkdirSync(path.join(buildDir, "/json"));
  fs.mkdirSync(path.join(buildDir, "/images"));
};

const addMetadata = (_dna: string[], _edition: number) => {
  let tempMetadata = {
    edition: _edition,
    dna: sha1(_dna.join("")),
    name: `Algorilla #${_edition}`,
    description: description,
    image: `${baseUri}/${_edition}.png`,
    imageChecksum: getChecksum(`${basePath}/build/images/${_edition}.png`),
    assetId: null,
    dateGenerated: new Date(Date.now()).toLocaleDateString("en-US"),
    dateMinted: null,
    attributes: attributesList,
    compiler: "v1.0",
    ...extraMetadata,
  };
  metadataList.push(tempMetadata);
  attributesList = [];
};

const addAttributes = (_element) => {
  let selectedElement = _element.layer.selectedElement;
  attributesList.push({
    trait_type: _element.layer.name,
    value: selectedElement.name,
  });
};

const drawElement = (_renderObject) => {
  ctx.globalAlpha = _renderObject.layer.opacity;
  ctx.globalCompositeOperation = _renderObject.layer.blendMode;
  ctx.drawImage(_renderObject.loadedImage, 0, 0, format.width, format.height);
  addAttributes(_renderObject);
};

const writeMetaData = (_data) => {
  fs.writeFileSync(`${buildDir}/json/_metadata.json`, _data);
};

const saveMetaDataSingleFile = (_editionCount) => {
  let metadata = metadataList.find((meta) => meta.edition == _editionCount);
  debugLogs
    ? console.log(
        `Writing metadata for ${_editionCount}: ${JSON.stringify(metadata)}`
      )
    : null;
  fs.writeFileSync(
    `${buildDir}/json/${_editionCount}.json`,
    JSON.stringify(metadata, null, 2)
  );
};

const startCreating = async () => {
  let layerConfigIndex = 0;
  let editionCount = 1;
  let failedCount = 0;
  let abstractedIndexes: number[] = [];

  for (
    let i = 1;
    i <= layerConfigurations[layerConfigurations.length - 1].growEditionSizeTo;
    i++
  ) {
    abstractedIndexes.push(i);
  }

  if (shuffleLayerConfigurations) {
    abstractedIndexes = shuffle(abstractedIndexes);
  }

  debugLogs
    ? console.log("Editions left to create: ", abstractedIndexes)
    : null;

  while (layerConfigIndex < layerConfigurations.length) {
    const layers = setupLayers(
      layerConfigurations[layerConfigIndex].layersOrder
    );

    while (
      editionCount <= layerConfigurations[layerConfigIndex].growEditionSizeTo
    ) {
      const newDNA: DNA = createWeightedDNA(layers);

      if (isDNAUnique(dnaList, newDNA)) {
        let results = constructLayerToDNA(newDNA, layers);
        let loadedElements: any = [];

        results.forEach((layer) => {
          loadedElements.push(loadLayerImg(layer));
        });

        await Promise.all(loadedElements).then((renderObjectArray) => {
          debugLogs ? console.log("Clearing canvas") : null;
          ctx.clearRect(0, 0, format.width, format.height);
          if (background.generate) {
            drawBackground();
          }
          renderObjectArray.forEach((renderObject) => {
            drawElement(renderObject);
          });
          debugLogs
            ? console.log("Editions left to create: ", abstractedIndexes)
            : null;
          saveImage(abstractedIndexes[0]);
          addMetadata(newDNA, abstractedIndexes[0]);
          saveMetaDataSingleFile(abstractedIndexes[0]);
          console.log(
            `Created edition: ${abstractedIndexes[0]}, with DNA: ${sha1(
              newDNA.join("")
            )}`
          );
        });
        dnaList.push(newDNA);
        editionCount++;
        abstractedIndexes.shift();
      } else {
        console.log("DNA exists!");
        failedCount++;
        if (failedCount >= uniqueDnaTorrance) {
          console.log(
            `You need more layers or elements to grow your edition to ${layerConfigurations[layerConfigIndex].growEditionSizeTo} artworks!`
          );
          process.exit();
        }
      }
    }

    layerConfigIndex++;
  }
  writeMetaData(JSON.stringify(metadataList, null, 2));
};

export { startCreating, buildSetup };
