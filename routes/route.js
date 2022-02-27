const classes = require('../controllers/classController');
const students = require('../controllers/studentController');

module.exports = (express) => {
  const route = express.Router();

  // classes route
  route.get('/class', classes.getAll);
  route.get('/class/:id', classes.getByID);
  route.post('/class', classes.save);
  route.put('/class/:id', classes.update);
  route.delete('/class/:id', classes.delete);

  // students route
  route.get('/student', students.getAll);
  route.get('/student/:id', students.getByID);
  route.post('/student', students.save);
  route.put('/student/:id', students.update);
  route.delete('/student/:id', students.delete);

  return route;
};
