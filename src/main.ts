import path from "path";
import sha1 from "sha1";
import fs from "fs";
import { createCanvas } from "canvas";

import {
  FORMAT,
  BASE_URI,
  DESCRIPTION,
  BACKGROUND,
  UNIQUE_DNA_TOLERANCE,
  LAYER_CONFIGURATIONS,
  SHUFFLE_LAYER_CONFIGURATIONS,
  DEBUG_LOGS,
  EXTRA_METADATA,
} from "./config";

import {
  setupLayers,
  shuffle,
  saveImage,
  drawBackground,
  getChecksum,
  loadLayerImg,
  mapDNAToLayers,
  isDNAUnique,
  createWeightedDNA,
} from "./util";

import type {
  MetadataList,
  AttributesList,
  DNA,
  DNAList,
  Layer,
  LoadedImage,
} from "@types";

export const basePath = process.cwd();
export const buildDir = path.join(basePath, "/build");
export const layersDir = path.join(basePath, "/layers");

export const canvas = createCanvas(FORMAT.width, FORMAT.height);
export const ctx = canvas.getContext("2d");

let attributesList: AttributesList[] = [];
const metadataList: MetadataList[] = [];
const dnaList: DNAList = [];

const buildSetup = () => {
  if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true });
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
    description: DESCRIPTION,
    image: `${BASE_URI}/${_edition}.png`,
    imageChecksum: getChecksum(`${basePath}/build/images/${_edition}.png`),
    assetId: null,
    dateGenerated: new Date(Date.now()).toLocaleDateString("en-US"),
    dateMinted: null,
    attributes: attributesList,
    compiler: "v1.0",
    ...EXTRA_METADATA,
  };

  metadataList.push(tempMetadata);
  attributesList = [];
};

const addAttributes = (element: LoadedImage) => {
  let selectedElement = element.layer.selectedElement;

  attributesList.push({
    trait_type: element.layer.name,
    value: selectedElement?.name as string,
  });
};

const drawElement = (renderObject: LoadedImage) => {
  ctx.globalAlpha = renderObject.layer.opacity;
  ctx.globalCompositeOperation = renderObject.layer.blendMode;
  ctx.drawImage(renderObject.loadedImage, 0, 0, FORMAT.width, FORMAT.height);
};

const writeMetadata = (data: string) => {
  fs.writeFileSync(`${buildDir}/json/_metadata.json`, data);
};

const saveMetadataSingleFile = (editionCount: number) => {
  let metadata = metadataList.find((meta) => meta.edition == editionCount);

  DEBUG_LOGS
    ? console.log(
        `Writing metadata for ${editionCount}: ${JSON.stringify(metadata)}`
      )
    : null;

  fs.writeFileSync(
    `${buildDir}/json/${editionCount}.json`,
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
    i <=
    LAYER_CONFIGURATIONS[LAYER_CONFIGURATIONS.length - 1].growEditionSizeTo;
    i++
  ) {
    abstractedIndexes.push(i);
  }

  if (SHUFFLE_LAYER_CONFIGURATIONS) {
    abstractedIndexes = shuffle(abstractedIndexes);
  }

  DEBUG_LOGS
    ? console.log("Editions left to create: ", abstractedIndexes)
    : null;

  while (layerConfigIndex < LAYER_CONFIGURATIONS.length) {
    const layers: Layer[] = setupLayers(
      LAYER_CONFIGURATIONS[layerConfigIndex].layersOrder
    );

    while (
      editionCount <= LAYER_CONFIGURATIONS[layerConfigIndex].growEditionSizeTo
    ) {
      const newDNA: DNA = createWeightedDNA(layers);

      if (isDNAUnique(dnaList, newDNA)) {
        let results = mapDNAToLayers(newDNA, layers);

        let loadedElements: Promise<LoadedImage>[] = results.map((result) => {
          return loadLayerImg(result);
        });

        await Promise.all(loadedElements).then((renderObjectArray) => {
          DEBUG_LOGS ? console.log("Clearing canvas") : null;

          ctx.clearRect(0, 0, FORMAT.width, FORMAT.height);

          if (BACKGROUND.generate) {
            drawBackground();
          }

          renderObjectArray.forEach((renderObject) => {
            drawElement(renderObject);
            addAttributes(renderObject);
          });

          DEBUG_LOGS
            ? console.log("Editions left to create: ", abstractedIndexes)
            : null;

          saveImage(abstractedIndexes[0]);
          addMetadata(newDNA, abstractedIndexes[0]);
          saveMetadataSingleFile(abstractedIndexes[0]);

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
        if (failedCount >= UNIQUE_DNA_TOLERANCE) {
          console.log(
            `You need more layers or elements to grow your edition to ${LAYER_CONFIGURATIONS[layerConfigIndex].growEditionSizeTo} artworks!`
          );
          process.exit();
        }
      }
    }

    layerConfigIndex++;
  }
  writeMetadata(JSON.stringify(metadataList, null, 2));
};

export { startCreating, buildSetup };
