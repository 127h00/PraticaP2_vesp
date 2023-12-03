class ApiService {

    static baseURL = "http://localhost:3030"

    static async Login(user,password) {
        fetch(this.baseURL+"/login", {
            "body": JSON.stringify({
                "username": user,
                "password": password
            }),

            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            }
        })
    }
}

export default ApiService