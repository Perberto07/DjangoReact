// src/utils/searchUtils.js

export const searchData = (dataList, searchTerm, keys = []) => {
  if (!Array.isArray(dataList) || !searchTerm || keys.length === 0) return dataList;

  const lowerSearch = searchTerm.toLowerCase();

  return dataList.filter((item) =>
    keys.some((key) => {
      const value = item[key];
      return typeof value === 'string' && value.toLowerCase().includes(lowerSearch);
    })
  );
};
