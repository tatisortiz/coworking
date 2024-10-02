const Administration = require('../models/Administration');
const Access = require('../models/Access');
const Person = require('../models/Person');
const Room = require('../models/Room');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');

exports.generateDailyReport = async (req, res) => {
  try {
    const { date } = req.body;

    // Total de accesos
    const totalAccesses = await Access.count({
      where: {
        entryTime: {
          [Op.between]: [`${date} 00:00:00`, `${date} 23:59:59`],
        },
      },
    });

    const totalPersons = await Person.count();
    const personsWithAccess = await Access.count({
      where: {
        entryTime: {
          [Op.between]: [`${date} 00:00:00`, `${date} 23:59:59`],
        },
      },
      distinct: true,
      col: 'personId',
    });
    const totalAusencias = totalPersons - personsWithAccess;

    const X = 5; // Ejemplo: más de 5 accesos

    const frequentPersons = await Access.findAll({
      attributes: ['personId', [sequelize.fn('COUNT', sequelize.col('personId')), 'count']],
      where: {
        entryTime: {
          [Op.between]: [`${date} 00:00:00`, `${date} 23:59:59`],
        },
      },
      group: ['personId'],
      having: sequelize.literal(`COUNT(personId) > ${X}`),
    });

    const infrequentPersons = await Access.findAll({
      attributes: ['personId', [sequelize.fn('COUNT', sequelize.col('personId')), 'count']],
      where: {
        entryTime: {
          [Op.between]: [`${date} 00:00:00`, `${date} 23:59:59`],
        },
      },
      group: ['personId'],
      having: sequelize.literal(`COUNT(personId) <= ${X}`),
    });

    // Crear el reporte
    const reporte = await Administration.create({
      reportDate: date,
      totalAccesses: totalAccesses,
      totalAbsences: totalAusencias,
      frequentUsers: frequentPersons.map(p => p.personId).join(','),
      infrequentUsers: infrequentPersons.map(p => p.personId).join(','),
    });

    res.status(201).json(reporte);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error al generar el reporte');
  }
};

exports.getReports = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    const reports = await Administration.findAll({
      where: {
        reportDate: {
          [Op.between]: [start_date, end_date],
        },
      },
    });

    res.json(reports);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error al obtener los reportes');
  }
};

exports.getUseRooms = async (req, res) => {
  try {
    // Estadísticas de uso de salas
    const useRooms = await Access.findAll({
      attributes: [
        'roomId',
        [sequelize.fn('COUNT', sequelize.col('roomId')), 'frequencyUse'],
      ],
      group: ['roomId'],
      include: [{ model: Room, attributes: ['roomName'] }],
    });


    res.json(useRooms);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error al obtener estadísticas de uso de salas');
  }
};