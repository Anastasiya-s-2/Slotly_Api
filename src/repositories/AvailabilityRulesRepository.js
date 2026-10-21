const pool = require("../config/database");
class AvailabilityRulesRepository{
async getAll(){
const result = await pool.query("Select ar.id, ar.master_id, ar.weekday, ar.start_time, ar.end_time from availability_rules ar");
return result.rows;
}
async getByMasterId(id){
const result = await pool.query("Select ar.id, ar.master_id, ar.weekday, ar.start_time, ar.end_time from availability_rules ar where ar.master_id=$1", [id]);
return result.rows;
}
async getById(id){
const result = await pool.query("Select ar.id, ar.master_id, ar.weekday, ar.start_time, ar.end_time from availability_rules ar where ar.id=$1", [id]);
return result.rows[0];
}
async searchByWeekday(weekday){
const result = await pool.query("Select ar.id, ar.master_id, ar.weekday, ar.start_time, ar.end_time from availability_rules ar where ar.weekday = $1",[weekday]);
return result.rows;
}

async create(arData) {
const {master_id, weekday, start_time, end_time} = arData;
const result = await pool.query(`insert into availability_rules(master_id, weekday, start_time, end_time)
values ($1, $2, $3, $4)
returning id, master_id, weekday, start_time, end_time`,
[master_id, weekday, start_time, end_time]);
return result.rows[0];
}

async update(id, arData) {
const {weekday, start_time, end_time} = arData;
const result = await pool.query(
        `update availability_rules
         set  weekday = coalesce($1, weekday),
             start_time = coalesce($2, start_time),
             end_time = coalesce($3, end_time)
         where id = $4
         returning id, master_id, weekday, start_time, end_time`,
        [weekday, start_time, end_time, id]
    );
    return result.rows[0];
}

async delete(id) {
    const result = await pool.query(`delete from availability_rules where id = $1 returning id`,[id]);
    return result.rows[0];
}
}
module.exports = new AvailabilityRulesRepository();
