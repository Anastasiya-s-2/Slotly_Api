const pool = require('../config/database');
class ServiceRepository {

async getAll() {
const result = await pool.query(`select id, master_id, name, description,price, duration_minutes, is_active, created_at from services where is_active = true`);
return result.rows;}

async getById(id) {
const result = await pool.query(`select id, master_id, name, description,price, duration_minutes, is_active, created_at from services where id = $1 AND is_active = TRUE`, [id]);
return result.rows[0];}

async searchByName(name) {
const result = await pool.query(`select id, master_id, name, description, price, duration_minutes, is_active, created_at from services where name ilike $1 AND is_active = true`, [`%${name}%`]);
return result.rows;}

async create(serviceData){
const {master_id, name, description, price, duration_minutes}=serviceData;
const result  = await pool.query(`Insert into services(master_id, name, description, price, duration_minutes) values ($1,$2,$3,$4,$5)
returning id, master_id, name, description, price, duration_minutes`, [master_id, name, description, price, duration_minutes]);
return result.rows[0];
}

async update(id, serviceData){
const {name, description, price, duration_minutes}=serviceData;
const result  = await pool.query(`update services set name = coalesce($1,name),
 description = coalesce($2, description),
 price = coalesce($3, price),
 duration_minutes = coalesce($4, duration_minutes)
 where id = $5
 returning id, name, description, price, duration_minutes, created_at
 `, [name, description, price, duration_minutes, id]
 );
 return result.rows[0];
}
async delete(id) {
const result = await pool.query(`delete from services where id = $1 returning id`, [id]);
return result.rows[0];
}

}

module.exports = new ServiceRepository();