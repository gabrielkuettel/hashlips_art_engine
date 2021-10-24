const description = "Algorilla NFT Project";
const baseUri =
  "https://res.cloudinary.com/juniorsyndicate/image/upload/algorillas_prod";

export type LayerOrder = {
  name: string;
}[];

export type LayerConfigurations = {
  growEditionSizeTo: number;
  layersOrder: LayerOrder;
}[];

const layerConfigurations: LayerConfigurations = [
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

const shuffleLayerConfigurations = true;

const debugLogs = false;

const format = {
  width: 512,
  height: 512,
};

const background = {
  generate: true,
  brightness: "80%",
};

const extraMetadata = {};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 10,
  thumbWidth: 200,
  imageRatio: format.width / format.height,
  imageName: "preview.png",
};

export {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
};
