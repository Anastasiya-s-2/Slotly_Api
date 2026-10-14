class Service {
    constructor({
        id
        master_id,
        name
        description,
        price
        duration_minutes,
        is_active
    }) {
        this.id = id;
        this.masterId = master_id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.durationMinutes = duration_minutes;
        this.isActive = is_active;
    }
}

module.exports = Service;