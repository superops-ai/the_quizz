import axios from "axios";
import Helper from "./Helper";

const help = new Helper();


export default class DAO {
  constructor() {
    this.axios = axios.create({
      baseURL: "https://localhost:8000/api/",
      timeout: 1000,
      headers: {
      	"Authorization": "Bearer " + help.get_cookie("auth_token"),
        "Content-Type": "application/json"
      },
    });

    this.axiosRegister = axios.create({
      baseURL: "https://localhost:8000/api/",
      timeout: 1000,
      headers: {
        "Content-Type": "application/json"
      },
    });
  }

  async get_auth() {
  	let rep = {};
  	await this.axios.get("get_auth").then((response) => {
  		rep = response.data;
  	});
  	return rep;
  }

  async post_users(data) {
  	let rep = {};
  	await this.axiosRegister.post("users", data).then((response) => {
  		rep = response.data;
  	});
  	return rep;
  }

  async login(data) {
  	let rep = {};
  	await this.axios.post("login", data).then((response) => {
  		rep = response.data;
  	});
  	return rep;
  }

  async post_instance(data) {
    let rep = {};
    await this.axios.post("instances", {}).then((response) => {
      rep = response.data;
    });
    return rep;
  }

  async put_instance(data) {
    let rep = {};
    await this.axios.put("instances", data).then((response) => {
      rep = response.data;
    });
    return rep;
  }

  async get_instances() {
    let rep = {};
    await this.axios.get("instances").then((response) => {
      rep = response.data;
    })
    return rep;
  }

  async get_instance(code) {
    let rep = {};
    await this.axios.get("instances?code=" + code).then((response) => {
      rep = response.data;
    })
    return rep;
  }

  async delete_instance(id) {
    let rep = {};
    await this.axios.delete("delete_instance/" + id).then((response) => {
      rep = response.data;
    })
    return rep;
  }

  async join_instance(id) {
    let rep = {};
    await this.axios.post("join_instance", id).then((response) => {
      rep = response.data;
    })
    return rep;
  }

  async leave_instance(id) {
    let rep = {};
    await this.axios.post("leave_instance", id).then((response) => {
      rep = response.data;
    })
    return rep;
  }
 }