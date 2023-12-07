import BaseConnect from "./baseConnection";

export default class ProductApi extends BaseConnect {

    static base_path = "/product"

    static async findAll() {
      return await super._get(`${this.base_path}/find`)
        .then(async res => res.status === 200 ? await res.json() : false
        )
        .catch(err => false)
    }

    static async findById(id) {
      return await super._get(`${this.base_path}/find/:id_product`, { params: { id_product: id } })
        .then(async res => 
            res.status === 200 ? await res.json() : false
        )
        .catch(err => false)
    }
}