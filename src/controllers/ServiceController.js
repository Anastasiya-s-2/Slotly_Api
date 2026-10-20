const servService = require('../services/servService');

class ServiceController{
async getAll(req,res){
try{
const services = await servService.getAllServices();
return res.status(200).json(services);
}
catch(error){
res.status(500).json({message:error.message});
}
}

async getServiceById(req, res) {
try {
const result = await servService.getById(req.params.id);
if (!result) {return res.status(404).json({
message: "Service not found"});}
res.status(200).json(result);}
catch (error) {
res.status(500).json({
message: error.message
});
}
}

async getByMasterId(req,res){
try {
const result = await servService.getByMasterId(req.params.id);
//if(result === 0){
//return res.status(200).json({result"});}
res.status(200).json(result);
}
catch (error){
res.status(500).json({message: error.message});
}
}


async searchByName(req, res, next) {
try {
const { name } = req.query;
const service = await servService.searchServiceByName(name);
return res.status(200).json(service);
}
catch (error) {
return res.status(400).json({message: error.message});
}
}
async create(req, res) {
try {
const service = await servService.create(req.body);
return res.status(201).json(service);
}
catch (error) {
return res.status(400).json({message: error.message});
}
}
async edit(req, res) {
try {
const { id } = req.params;
const service = await servService.edit(id, req.body);
return res.status(200).json(service);
}
catch (error) {
if (error.message === 'Service not found') {
return res.status(404).json({ message: error.message });}
return res.status(500).json({ message: error.message });}
}

async deleteService(req, res) {
try {
const { id } = req.params;
await servService.deleteService(id);
return res.status(204).send();}
catch (error) {
if (error.message === 'Service not found') {
return res.status(404).json({ message: error.message });
}
return res.status(500).json({ message: error.message });
}
}
}
module.exports = new ServiceController();