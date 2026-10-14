const masterRepository = require('../repositories/masterRepository');
class MasterServices{
async getAllMasters() {
return await masterRepository.getAll();
}
async getMasterById(id) {
const result = await masterRepository.getById(id);
if (!result) {
throw new Error('Master not found');}
return result;
}

async searchMastersByName(name) {
if (!name || !name.trim()) {
throw new Error('Master name is required');}
return await masterRepository.searchByName(name.trim());
}
async create(masterData){
const {user_id,display_name,bio, specialization, city} = masterData;
if (!user_id || !display_name || !specialization || !city){
throw new Error('Required fields are missing');
}
return await masterRepository.create(masterData);
}
async edit(id, masterData){
const master = await masterRepository.getById(id);
if (!master){
throw new Error('Master not found')}
return await masterRepository.update(id,masterData);
}
async deleteMaster(id){
const master = await masterRepository.getById(id);
if (!master){
throw new Error('Master not found')}
return await masterRepository.delete(id);

}
}
module.exports = new MasterServices();