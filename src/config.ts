import type { LayerConfigurations } from "@types";

const DESCRIPTION = "Algorilla NFT Project";
const BASE_URI =
  "https://res.cloudinary.com/juniorsyndicate/image/upload/algorillas_prod";

const LAYER_CONFIGURATIONS: LayerConfigurations = [
  // // AD (Arm Down)
  {
    growEditionSizeTo: 10,
    layersOrder: [
      { name: "01_Background" },
      { name: "02_Fur_AD" },
      { name: "03_Skin_AD" },
      { name: "04_Eyes" },
      { name: "05_Outline_AD" },
      { name: "06_Clothes_AD" },
      { name: "08_Accessories" },
      { name: "09_Hats" },
      { name: "10_Logos" },
    ],
  },
  // AU (Arm Up)
  // {
  //   growEditionSizeTo: 5000,
  //   layersOrder: [
  //     { name: "01_Background" },
  //     { name: "02_Fur_AU" },
  //     { name: "03_Skin_AU" },
  //     { name: "04_Eyes" },
  //     { name: "05_Outline_AU" },
  //     { name: "06_Clothes_AU" },
  //     { name: "07_Item_AU_AUS" },
  //     { name: "08_Accessories" },
  //     { name: "09_Hats" },
  //     { name: "10_Logos" },
  //   ],
  // },
  // // // ADS (Arm Down Smile)
  // {
  //   growEditionSizeTo: 7500,
  //   layersOrder: [
  //     { name: "01_Background" },
  //     { name: "02_Fur_AD" },
  //     { name: "03_Skin_ADS" },
  //     { name: "04_Eyes" },
  //     { name: "05_Outline_ADS" },
  //     { name: "06_Clothes_AD" },
  //     { name: "08_Accessories" },
  //     { name: "09_Hats" },
  //     { name: "10_Logos" },
  //   ],
  // },
  // // // AUS (Arm Up Smile)
  // {
  //   growEditionSizeTo: 10000,
  //   layersOrder: [
  //     { name: "01_Background" },
  //     { name: "02_Fur_AU" },
  //     { name: "03_Skin_AUS" },
  //     { name: "04_Eyes" },
  //     { name: "05_Outline_AUS" },
  //     { name: "06_Clothes_AU" },
  //     { name: "07_Item_AU_AUS" },
  //     { name: "08_Accessories" },
  //     { name: "09_Hats" },
  //     { name: "10_Logos" },
  //   ],
  // },
];

const SHUFFLE_LAYER_CONFIGURATIONS = true;

const DEBUG_LOGS = false;

const FORMAT = {
  width: 512,
  height: 512,
};

const BACKGROUND = {
  generate: true,
  brightness: "80%",
};

const EXTRA_METADATA = {};

const RARITY_DELIMITER = "#";

const UNIQUE_DNA_TOLERANCE = 10000;

const PREVIEW = {
  thumbPerRow: 10,
  thumbWidth: 200,
  imageRatio: FORMAT.width / FORMAT.height,
  imageName: "preview.png",
};

export {
  FORMAT,
  BASE_URI,
  DESCRIPTION,
  BACKGROUND,
  UNIQUE_DNA_TOLERANCE,
  LAYER_CONFIGURATIONS,
  RARITY_DELIMITER,
  PREVIEW,
  SHUFFLE_LAYER_CONFIGURATIONS,
  DEBUG_LOGS,
  EXTRA_METADATA,
};
