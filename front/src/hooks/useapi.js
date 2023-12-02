import axios from 'axios'

class ApiService {

    constructor(){
        this.api = axios.create({
            baseURL: process.env.URL_API || "http://localhost:3001/"
        })
    }

    async Login(user,password){
        const params = new URLSearchParams({user,password})
        const resposta = await this.api.post("/login", params)
        return resposta
    }

    async Registro(nome,sobrenome,email,telefone,cpf,senha){
        const params = new URLSearchParams({nome,sobrenome,email,telefone,cpf,senha})
        const resposta = await this.api.post("/Registro", params)
        return resposta
    }

    

}

export default ApiService
