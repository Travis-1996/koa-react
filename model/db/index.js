const Mongodb = require("mongodb");
const MongoClient = Mongodb.MongoClient;
const DB_URL = "mongodb://localhost:27017/koa-admin";
const DB_NAME = "koa-admin";
class Db {
  constructor() {
    this.dbClient = null;
    // this.connect()
  }
  static getInstance() {
    /**
     * 单例 数据库多少实例共享
     */
    if (!Db.instance) {
      Db.instance = new Db();
    }
    return Db.instance;
  }
  connect() {
    return new Promise((resolve, reject) => {
      if (!this.dbClient) {
        MongoClient.connect(DB_URL, (err, db) => {
          if (err) {reject(err);return};
          console.log("数据库已连接");
          this.dbClient = db.db(DB_NAME);
          resolve(this.dbClient);
        });
      } else {
        resolve(this.dbClient);
      }
    });
  }
  find(name, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(name).find(json).toArray((err,data)=>{
            if(err){reject(err);return}
            resolve(data)
        });
      });
    });
  }
  findOne(name, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(name).findOne(json,((err,data)=>{
          if(err){reject(err);return}
          resolve(data)
      }));
      });
    });
  }
  insert(name, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(name).insert(json, (err, data) => {
          if (err) reject(err);
          resolve(data);
        });
      });
    });
  }
}
module.exports  = Db.getInstance()
// const db = Db.getInstance();
// db.find('user',{username:'travis'}).then(data=>{
//   console.log(data)
// })
