const cleanDNA = (_str: string) => {
  var dna = Number(_str.split(":").shift());
  return dna;
};

export default cleanDNA;
