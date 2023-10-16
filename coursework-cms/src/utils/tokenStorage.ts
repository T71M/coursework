export type StorageKeys = "admin" | "superadmin" | "bookkeeper";

class TokenStorage {
  // На момент разработки будем хранить токен в local storage браузера
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  getToken() {
    return this.storage.getItem("token");
  }

  setToken(token: string) {
    this.storage.setItem("token", token);
  }

  removeToken() {
    this.storage.removeItem("token");
  }
}

export default new TokenStorage();
