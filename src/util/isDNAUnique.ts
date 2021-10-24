import { DNAList } from "../main";

const isDNAUnique = (_DnaList: DNAList = [], _dna: string[] = []) => {
  let foundDna = _DnaList.find((i) => i.join("") === _dna.join(""));
  return foundDna == undefined ? true : false;
};

export default isDNAUnique;
