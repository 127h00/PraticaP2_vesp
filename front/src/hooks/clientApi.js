import BaseConnect from "./baseConnection"

export default class ClientApi extends BaseConnect {

    static base_path = "/client"

    static async singIn(info) {
        return await super._post(`${this.base_path}/login`, info)
            .then(async res => 
                res.status === 200 ? await res.json() : false
            )
            .catch(err => err)
    }

    static async singUp(info) {
        return await super._post(`${this.base_path}/create`, info)
            .then(async res => 
                res.status === 201 ? true : await res.json()
            )
            .catch(err => err)
    }
}