const { classes, students, Sequelize } = require('../models');

const { Op } = Sequelize;
const self = {};

self.getAll = async (req, res) => {
  try {
    let { text } = req.query;

    if (text === undefined) {
      text = '';
    }

    const data = await classes.findAll({
      include: [
        {
          model: students,
          as: 'students',
          attributes: ['id', 'name', 'email', 'nim', 'class_id']
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
    const data = await classes.findOne({
      include: [
        {
          model: students,
          as: 'students',
          attributes: ['id', 'name', 'email', 'nim', 'class_id']
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
    const data = await classes.create(body);

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

    await classes.update(body, {
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
    const data = await classes.destroy({
      where: { id }
    });

    return res.json({ status: 'ok', data });
  }
  catch (error) {
    res.status(500).json({ status: 'error', data: error });
  }
};

module.exports = self;
