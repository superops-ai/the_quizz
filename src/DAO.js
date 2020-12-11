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
        "Content-Type": "application/json",
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
  	await this.axios.post("users", data).then((response) => {
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

  async get_instance(code) {
    let rep = {};
    await this.axios.get("instances?code=" + code).then((response) => {
      rep = response.data;
    })
    return rep;
  }
 }