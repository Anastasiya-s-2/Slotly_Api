const pool = require("../config/database");
class MasterRepository{
async getAll(){
const result = await pool.query("Select mp.id, mp.display_name, mp.bio, mp.specialization, mp.city, mp.created_at from master_profiles mp inner join users u on u.id = mp.user_id where u.is_active=true");
return result.rows;
}
async getById(id){
const result = await pool.query("Select mp.id, mp.display_name, mp.bio, mp.specialization, mp.city, mp.created_at from master_profiles mp  inner join users u on u.id = mp.user_id where mp.id=$1 and u.is_active=true",[id]);
return result.rows[0];
}
async searchByName(name){
const result = await pool.query("Select mp.id, mp.display_name, mp.bio, mp.specialization, mp.city, mp.created_at from master_profiles mp  inner join users u on u.id = mp.user_id where mp.display_name ilike $1 and u.is_active=true",[name]);
return result.rows[0];
}

async create(masterData) {
const {user_id, display_name, bio, specialization, city} = masterData;
const result = await pool.query(`insert into master_profiles(user_id, display_name, bio, specialization, city)
values ($1, $2, $3, $4, $5)
returning id, user_id, display_name, bio,specialization, city, created_at`,
[user_id, display_name, bio ?? null, specialization, city]);
return result.rows[0];
}

async update(id, masterData) {
const {display_name, bio, specialization, city} = masterData;
const result = await pool.query(
        `update master_profiles
         set display_name = COALESCE($1, display_name),
             bio = COALESCE($2, bio),
             specialization = COALESCE($3, specialization),
             city = COALESCE($4, city)
         where id = $5
         returning id, display_name, bio, specialization, city, created_at`,
        [display_name, bio, specialization, city, id]
    );
    return result.rows[0];
}

async delete(id) {
    const result = await pool.query(`delete from master_profiles where id = $1 returning id`,[id]);
    return result.rows[0];
}
}
module.exports = new MasterRepository();
