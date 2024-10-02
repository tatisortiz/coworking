const Persona = require('../models/Person');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, startUp, email, dni, phone, password } = req.body;

    // Verificar si el usuario ya existe
    let persona = await Persona.findOne({ where: { email } });
    if (persona) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    // Crear nueva persona
    persona = await Persona.create({
      firstName,
      lastName,
      startUp,
      email,
      dni,
      phone,
      password,
    });

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    persona.password = await bcrypt.hash(password, salt);
    await persona.save();

    // Generar JWT
    const payload = {
      persona: {
        id: persona.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token });
      }
    );

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

exports.authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const persona = await Persona.findOne({ where: { email } });
    if (!persona) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, persona.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    // Generar JWT
    const payload = {
      persona: {
        id: persona.ID_Persona,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};