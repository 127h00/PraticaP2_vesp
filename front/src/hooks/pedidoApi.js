import BaseConnect from "./baseConnection"

export default class PedidoApi extends BaseConnect {

    static base_path = "/order"

    static async makeOrder(info) {
        return await super._post(`${this.base_path}/createOrder`, info)
            .then(async res => 
                res.status === 201 ? true : await res.json()
            )
            .catch(err => err)
    }
}