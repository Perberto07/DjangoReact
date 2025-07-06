// utils/sortUtils.js

export const sortData = (data, key, direction = 'asc', isDate = false) => {
  const sorted = [...data].sort((a, b) => {
    let valA = a[key];
    let valB = b[key];

    if (isDate) {
      valA = new Date(valA);
      valB = new Date(valB);
    } else {
      valA = typeof valA === 'string' ? valA.toLowerCase() : valA;
      valB = typeof valB === 'string' ? valB.toLowerCase() : valB;
    }

    if (valA < valB) return direction === 'asc' ? -1 : 1;
    if (valA > valB) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
};
