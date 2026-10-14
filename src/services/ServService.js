const serviceRepository = require('../repositories/ServiceRepository');
class servService{

async getAllServices(){
const services = await serviceRepository.getAll();
return services;
}

async getById(id){
const service = await serviceRepository.getById(id);
if(!service){
throw new Error('Service not found');}
return service;
}
async searchServiceByName(name) {
if (!name || !name.trim()) {
throw new Error('Service name is required');}
return await serviceRepository.searchByName(name.trim());
}
async create(serviceData){
const {master_id, name, description, price, duration_minutes} = serviceData;
if (!master_id || !name?.trim() || price == null || duration_minutes == null){
throw new Error('Required fields are missing');
}
return await serviceRepository.create(serviceData);
}
async edit(id, serviceData){
const service = await serviceRepository.getById(id);
if (!service){
throw new Error('Service  not found')}
return await serviceRepository.update(id,serviceData);
}
async deleteService(id){
const service = await serviceRepository.getById(id);
if (!service){
throw new Error('Service not found')}
return await serviceRepository.delete(id);
}
}
module.exports = new servService();