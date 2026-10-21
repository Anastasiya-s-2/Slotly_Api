const arService = require('../services/AvailabilityRulesService');

class AvailabilityRulesController{
async getAll(req,res){
try{
const result = await arService.getAll();
return res.status(200).json(result);
}
catch(error){
res.status(500).json({message:error.message});
}
}

async getById(req, res) {
try {
const result = await arService.getById(req.params.id);
if (!result) {return res.status(404).json({
message: "ar not found"});}
res.status(200).json(result);}
catch (error) {
res.status(500).json({
message: error.message
});
}
}

async getByMasterId(req,res){
try {
const result = await arService.getByMasterId(req.params.id);
if (!result) {return res.status(404).json({
message: "ar not found"});}
res.status(200).json(result);}
catch (error) {
res.status(500).json({
message: error.message
});
}

}

async searchByWeekday(req, res) {
try {
const { weekday } = req.query;
const result = await arService.searchByWeekday(weekday);
return res.status(200).json(result);
}
catch (error) {
return res.status(400).json({message: error.message});
}
}
async create(req, res) {
try {
const result = await arService.create(req.body);
return res.status(201).json(result);
}
catch (error) {
return res.status(400).json({message: error.message});
}
}
async edit(req, res) {
try {
const { id } = req.params;
const result = await arService.edit(id, req.body);
return res.status(200).json(result);
}
catch (error) {
if (error.message === 'Availability rule not found') {
return res.status(404).json({ message: error.message });}
return res.status(500).json({ message: error.message });}
}

async delete(req, res) {
try {
const { id } = req.params;
await arService.delete(id);
return res.status(204).send();}
catch (error) {
if (error.message === 'Availability rule not found') {
return res.status(404).json({ message: error.message });
}
return res.status(500).json({ message: error.message });
}
}
}
module.exports = new AvailabilityRulesController();