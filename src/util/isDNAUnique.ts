import type { DNAList } from "@types";

/**
 * @description Determines if the DNA has already been created by comparing the current configuration with the DnaList
 * */
const isDNAUnique = (DnaList: DNAList = [], dna: string[] = []) => {
  let foundDna = DnaList.find((i) => i.join("") === dna.join(""));

  return foundDna == undefined ? true : false;
};

export default isDNAUnique;
