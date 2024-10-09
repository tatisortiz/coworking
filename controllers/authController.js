const Person = require('../models/Person');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, startUp, email, dni, phone, password } = req.body;

    // Verificar si el usuario ya existe
    let person = await Person.findOne({ where: { email } });
    if (person) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    // Crear nueva persona
    person = await Person.create({
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
    person.password = await bcrypt.hash(password, salt);
    await person.save();

    // Generar JWT
    const payload = {
      person: {
        id: person.id,
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
    const person = await Person.findOne({ where: { email } });
    if (!person) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, person.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    // Generar JWT
    const payload = {
      person: {
        id: person.id,
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