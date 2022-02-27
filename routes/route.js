const classes_ctrl = require("./../controllers/classes_ctrl");
const students_ctrl = require("./../controllers/students_ctrl");
module.exports = function(express) {
 const route = express.Router();
//classes route
 route.get("/classes",classes_ctrl.getAll);
 route.get("/classes/:id",classes_ctrl.get);
 route.get("/classes_search",classes_ctrl.search);
 route.post("/classes",classes_ctrl.save);
 route.put("/classes/:id",classes_ctrl.update);
 route.delete("/classes/:id",classes_ctrl.delete);
 route.get("/classes_with_students",classes_ctrl.getWithItems);
//students route
 route.get("/students",students_ctrl.getAll);
 route.get("/students/:id",students_ctrl.get);
 route.get("/students_search",students_ctrl.search);
 route.post("/students",students_ctrl.save);
 route.put("/students/:id",students_ctrl.update);
 route.delete("/students/:id",students_ctrl.delete);
 return route;
};