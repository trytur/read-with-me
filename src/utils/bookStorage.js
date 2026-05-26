import { STORAGE_KEY } from "../constants/storageKey";
import { getStorageData, setStorageData } from "./localStorage";

export function getBooksFromStorage() {
  return getStorageData(STORAGE_KEY.BOOKS, []);
}

export function saveBooksToStorage(books) {
  setStorageData(STORAGE_KEY.BOOKS, books);
}
