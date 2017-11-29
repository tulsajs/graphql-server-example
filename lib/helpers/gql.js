export default (highlight, ...vars) => {
  return highlight.map(
    (string, index) => `${string} ${vars[index] ? vars[index] : ''}`
  );
};
