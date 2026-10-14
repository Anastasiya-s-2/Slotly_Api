const masterService = require('../services/MasterService');
class MasterController{
async getAll(req,res){
try{
const masters = await masterService.getAllMasters();
return res.status(200).json(masters);
}
catch(error){
res.status(500).json({message:error.message});
}
}
async getMasterById(req, res) {
try {
const master = await masterService.getMasterById(req.params.id);
if (!master) {return res.status(404).json({
message: "Game not found"});}
res.status(200).json(master);}
catch (error) {
res.status(500).json({
message: error.message
});
}
}
async searchByName(req, res, next) {
try {
const { name } = req.query;
const masters = await masterService.searchMastersByName(name);
return res.status(200).json(masters);
}
catch (error) {
return res.status(400).json({message: error.message});
}
}
async create(req, res, next) {
try {
const master = await masterService.create(req.body);
return res.status(201).json(master);
}
catch (error) {
return res.status(400).json({message: error.message});
}
}
async edit(req, res) {
try {
const { id } = req.params;
const master = await masterService.edit(id, req.body);
return res.status(200).json(master);
}
catch (error) {
if (error.message === 'Master not found') {
return res.status(404).json({
message: error.message});
}
}
}

async deleteMaster(req, res) {
try {
const { id } = req.params;
await masterService.deleteMaster(id);
return res.status(204).send();}
catch (error) {
if (error.message === 'Master not found') {
return res.status(404).json({ message: error.message });
}
return res.status(500).json({ message: error.message });
}
}
}
module.exports = new MasterController();
