const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { Op } = require("sequelize");

module.exports = {
  getEventByOwner,
  create
};

//[2021-09-01 PO]
async function getEventByOwner(id) {
    //await db.User.findOne({ where: { username: params.username } })
    // const user = await db.User.findOne({where : { id: id}});
  const event = await db.Event.findAll({ where: { owner: id } });
    if(!event) throw 'Event not found';
    return event;
}

async function create(params){
  console.log(params);
  //validate
  if(!await db.User.findOne({where: {id: params.owner}})){
    throw 'Owner id: "' + params.owner + '" not found';
  }

  //check วันที่ start > end
  if(CheckStartMoreEndDateTime(params)){
    throw `[${params.startDate}] > [${params.endDate}] Start > End!`;
  }
  //check วันที่ซ้ำ
  if(await CheckEventDateTime(params)){
    throw `[${params.startDate}] Time is already!, ช่วงเวลานี้ระบุแล้ว!`;
  }

  //save event
  await db.Event.create(params);

}

async function CheckEventDateTime(params) {
    let countDup = await db.Event.count({ where: {
    owner: params.owner,
    [Op.or]:[{
        startDate: {
          [Op.between]: [params.startDate, params.endDate] // gte มากกว่าหรือเท่ากับ >=
      }
    },
    {
        endDate: {
          [Op.between]: [params.startDate, params.endDate] // lte น้อยกว่าหรือเท่ากับ >=
      }
    }
    ]
  }});

  if(countDup > 0 )
    return true; //console.log('yes');
  else 
    return false; //console.log('noo');
}

function CheckStartMoreEndDateTime(params) {
  const start = new Date(params.startDate);
  const end = new Date(params.endDate);
  if(end <= start){
    return true;
  }
  else {
    return false;
  }
}