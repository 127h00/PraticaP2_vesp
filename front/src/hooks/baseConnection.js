export default class BaseConnect {
  static url = 'http://localhost:3030';
  static base_path = '/';

  static __handleParamsInPath(path, params) {
    if(!params) return path;
    return Object.keys(params).reduce((acc, key) => acc.replace(`:${key}`, params[key]), path);
  }

  static __handleData(value) { 
    if(!value) return null;
    return JSON.stringify(value);
  }

  static __handleQuery(value) {
    if(!value) return '';
    return "?"+Object.keys(value).map(key => `${key}=${value[key]}`).join('&');
  }

  static __handleHeaders(value) {
      return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...value,
      }
  }

  static async _get(path, config) {
    const response = await fetch(`${this.url}${this.__handleParamsInPath(path, config?.params)}${this.__handleQuery(config?.query)}`, {
      method: 'GET',
      body: this.__handleData(config?.data),
      headers: this.__handleHeaders(config?.headers),
    });
    return response;
  }

  static async _post(path, data, config) {
    const response = await fetch(`${this.url}${this.__handleParamsInPath(path, config?.params)}${this.__handleQuery(config?.query)}`, {
      method: 'POST',
      body: this.__handleData(data),
      headers: this.__handleHeaders(config?.headers),
    });
    return response;
  }

    static async _put(path, data, config) {
    const response = await fetch(`${this.url}${this.__handleParamsInPath(path, config?.params)}${this.__handleQuery(config?.query)}`, {
      method: 'PUT',
      body: this.__handleData(data),
      headers: this.__handleHeaders(config?.headers),
    });
    return response;
  }

    static async _delete(path, config) {
    const response = await fetch(`${this.url}${this.__handleParamsInPath(path, config?.params)}${this.__handleQuery(config?.query)}`, {
      method: 'DELETE',
      body: this.__handleData(config?.data),
      headers: this.__handleHeaders(config?.headers),
    });
    return response;
  }
}