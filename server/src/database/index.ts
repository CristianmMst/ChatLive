import "dotenv/config";
import { connect } from "mongoose";

connect(`${process.env.MONGODB_URI}`)
  .then((db) => console.log(`Connecting to ${db.connection.name}`))
  .catch((error) => console.log(error));
