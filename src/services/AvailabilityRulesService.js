const arRepository = require('../repositories/AvailabilityRulesRepository');
class AvailabilityRulesService{
async getAll() {
return await arRepository.getAll();
}
async getById(id) {
const result = await arRepository.getById(id);
if (!result) {
throw new Error('not found');}
return result;
}
async getByMasterId(id){
const result = await arRepository.getByMasterId(id);
if(!result){
throw new Error('not found');
}
return result;
}

async searchByWeekday(weekday) {
if (weekday == null || weekday < 0 || weekday > 6 || !Number.isInteger(Number(weekday))) {
throw new Error('Weekday must be an integer from 0 to 6');
}
return await arRepository.searchByWeekday(weekday);
}
async create(arData){
const {master_id, weekday, start_time, end_time} = arData;
if (!master_id || !weekday || !start_time || !end_time){
throw new Error('Required fields are missing');
}
if (weekday == null || weekday < 0 || weekday > 6 || !Number.isInteger(Number(weekday))) {
throw new Error('Weekday must be an integer from 0 to 6');
}
if(start_time >= end_time){
throw new Error("Start time must be earlier than end time");
}
return await arRepository.create(arData);
}
async edit(id, arData){
const ar = await arRepository.getById(id);
if (!ar){
throw new Error('Availability rule not found');}
return await arRepository.update(id,arData);
}
async delete(id){
const ar = await arRepository.getById(id);
if (!ar){
throw new Error('Availability rule not found');}
return await arRepository.delete(id);

}
}
module.exports = new AvailabilityRulesService();
