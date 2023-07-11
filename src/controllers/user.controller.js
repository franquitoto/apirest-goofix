import { json } from "express";
import User from "../models/user";

export const createUser = (req, res)=>{
  res.json('Usuario creado');
}

export const obtenerUsuarios = async (req, res) =>{
  try {
    const users = await User.find()
    console.log(users)
    res.json(users)
  } catch (error) {
    res.status(500).json({
      Mensaje: "Hubo un error al obtener los usuarios",
      error,
    });
  }
}