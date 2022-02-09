class APIHandler {
  // constructor (baseUrl) {
  //   this.axiosApp = axios.create({
  //     BASE_URL: baseUrl
  //   })
    
  // }

  constructor() {
    this.axiosApp = axios.create({
      baseURL: "https://minions-api.herokuapp.com/characters"
    })
  }

  getFullList () {
    return this.axiosApp.get("/")
  }

  getOneRegister (id) {
    return this.axiosApp.get(`/${id}`)
  }

  createOneRegister(characterData) {
    return this.axiosApp.post("/", characterData)
  }

  updateOneRegister(id, characterData) {
    return this.axiosApp.put(`/${id}`, characterData)
  }

  deleteOneRegister (id) {
    return this.axiosApp.delete(`/${id}`)
  }
}
