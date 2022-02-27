const {
	classes,
	students,
	Sequelize
} = require("./../models");

const Op = Sequelize.Op;

let self = {};

self.getAll = async (req,res) => {
	try{
		let data = await classes.findAll({
			attributes:["id","name"]
		});
		return res.json({
			status:"ok",
			data:data
		})
	}catch(error){
		res.status(500).json({
			status:"error",
			data:error
		})
	}
}

self.getWithItems = async (req,res) => {
	try{
		let data = await classes.findAll({
			attributes:["id","name"],
			include:[
				{
					model:student,
					as:'students',
					attributes:["id","name","email","nim","class_id"]
				}
			]
		});
		return res.json({
			status:"ok",
			data:data
		})
	}catch(error){
		res.status(500).json({
			status:"error",
			data:error
		})
	}
}

self.get = async (req,res) => {
	try{
		let id = req.params.id;
		let data = await classes.findOne({
			attributes:["id","name"],
			where:{
				id:id
			}
		});
		return res.json({
			status:"ok",
			data:data
		})
	}catch(error){
		res.status(500).json({
			status:"error",
			data:error
		})
	}
}

self.search = async (req,res) => {
	try{
		let text = req.query.text;
		let data = await classes.findAll({
			attributes:["id","name"],
			where:{
				name:{
					[Op.like]:"%"+text+"%"
				}
			}
		});
		return res.json({
			status:"ok",
			data:data
		})
	}catch(error){
		res.status(500).json({
			status:"error",
			data:error
		})
	}
}

self.save = async (req,res) => {
	try{
		let body = req.body;
		let data = await classes.create(body);
		return res.json({
			status:"ok",
			data:data
		})
	}catch(error){
		res.status(500).json({
			status:"error",
			data:error
		})
	}
}

self.update = async (req,res) => {
	try{
		let id = req.params.id;
		let body = req.body;
		let data = await classes.update(body,{
			where:{
				id:id
			}
		});
		return res.json({
			status:"ok",
			data:data
		})
	}catch(error){
		res.status(500).json({
			status:"error",
			data:error
		})
	}
}

self.delete = async (req,res) => {
	try{
		let id = req.params.id;
		let data = await classes.destroy({
			where:{
				id:id
			}
		});
		return res.json({
			status:"ok",
			data:data
		})
	}catch(error){
		res.status(500).json({
			status:"error",
			data:error
		})
	}
}


module.exports = self;