const { students, classes, Sequelize } = require('../models');

const { Op } = Sequelize;
const self = {};

self.getAll = async (req, res) => {
  try {
    let { text } = req.query;

    if (text === undefined) {
      text = '';
    }

    const data = await students.findAll({
      include: [
        {
          model: classes,
          as: 'classes',
          attributes: ['id', 'name', 'batch']
        }
      ],
      where: {
        name: {
          [Op.like]: `%${text}%`
        }
      }
    });

    return res.json({ status: 'ok', data });
  }
  catch (error) {
    res.status(500).json({ status: 'error', data: error });
  }
};

self.getByID = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await students.findOne({
      include: [
        {
          model: classes,
          as: 'classes',
          attributes: ['id', 'name', 'batch']
        }
      ],
      where: { id }
    });

    return res.json({ status: 'ok', data });
  }
  catch (error) {
    res.status(500).json({ status: 'error', data: error });
  }
};

self.save = async (req, res) => {
  try {
    const { body } = req;
    const data = await students.create(body);

    return res.json({ status: 'ok', data });
  }
  catch (error) {
    res.status(500).json({ status: 'error', data: error });
  }
};

self.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    await students.update(body, {
      where: { id }
    });

    return res.json({ status: 'ok', data: body });
  }
  catch (error) {
    res.status(500).json({ status: 'error', data: error });
  }
};

self.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await students.destroy({
      where: { id }
    });

    return res.json({ status: 'ok', data });
  }
  catch (error) {
    res.status(500).json({ status: 'error', data: error });
  }
};

module.exports = self;
