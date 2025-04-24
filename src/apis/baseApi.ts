import { createHttp } from './http'

class baseApi {
  private readonly client
  constructor (baseUrl: string) {
    this.client = createHttp(baseUrl)
  }

  async get (url: string, conf = {}) {
    return await this.client
      .get(url, conf)
      .then(async (response: any) => await Promise.resolve(response))
      .catch(async (error: any) => await Promise.reject(error))
  }

  async delete (url: string, conf = {}) {
    return await this.client
      .delete(url, conf)
      .then(async (response: any) => await Promise.resolve(response))
      .catch(async (error: any) => await Promise.reject(error))
  }

  async head (url: string, conf = {}) {
    return await this.client
      .head(url, conf)
      .then(async (response: any) => await Promise.resolve(response))
      .catch(async (error: any) => await Promise.reject(error))
  }

  async options (url: string, conf = {}) {
    return await this.client
      .options(url, conf)
      .then(async (response: any) => await Promise.resolve(response))
      .catch(async (error: any) => await Promise.reject(error))
  }

  async post (url: string, data = {}, conf = {}) {
    return await this.client
      .post(url, data, conf)
      .then(async (response: any) => await Promise.resolve(response))
      .catch(async (error: any) => await Promise.reject(error))
  }

  async put (url: string, data = {}, conf = {}) {
    return await this.client
      .put(url, data, conf)
      .then(async (response: any) => await Promise.resolve(response))
      .catch(async (error: any) => await Promise.reject(error))
  }

  async patch (url: string, data = {}, conf = {}) {
    return await this.client
      .patch(url, data, conf)
      .then(async (response: any) => await Promise.resolve(response))
      .catch(async (error: any) => await Promise.reject(error))
  }
}

export { baseApi }
