export function getStorageData(key, defaultValue = []) {
  try {
    const savedData = localStorage.getItem(key);

    if (!savedData) {
      return defaultValue;
    }

    return JSON.parse(savedData);
  } catch (error) {
    console.error("localStorage 데이터를 불러오는 중 오류가 발생했습니다.", error);
    return defaultValue;
  }
}

export function setStorageData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("localStorage에 데이터를 저장하는 중 오류가 발생했습니다.", error);
  }
}
