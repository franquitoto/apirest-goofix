// Creamos el esquema para los roles
import { Schema, model } from "mongoose";

const roleSchema = new Schema(
  {
    name: String
  },
  {
    versionKey: false
  }
)

export default model('Role', roleSchema);