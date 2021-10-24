/**
 * @description Returns the index of the element in the layer.
 *
 * @example `"11:Green Backwards Cap#15.png"` turns into `11`
 */
const cleanDNA = (str: string) => {
  var dna = Number(str.split(":").shift());
  return dna;
};

export default cleanDNA;
