const {
	students,
	classes,
	Sequelize
} = require("./../models");

const Op = Sequelize.Op;

let self = {};

self.getAll = async (req,res) => {
	try{
		let data = await students.findAll({
			attributes:["id","name","batch","group_link"],
			include:[
				{
					model:classes,
					as:'classes',
					attributes:["id","name"]
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
		let data = await students.findOne({
			attributes:["id","name","classes_id","price","stock"],
			include:[
				{
					model:classes,
					as:'classes',
					attributes:["id","name"]
				}
			],
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
		let data = await students.findAll({
			attributes:["id","name","classes_id","price","stock"],
			include:[
				{
					model:classes,
					as:'classes',
					attributes:["id","name"]
				}
			],
			where:{
				[Op.or]:{
					name:{
						[Op.like]:"%"+text+"%"
					},
					//search by name of classes
					'$classes.name$':{
						[Op.like]:"%"+text+"%"
					}
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
		let data = await students.create(body);
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
		let data = await students.update(body,{
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
		let data = await students.destroy({
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