const { pool } = require("../../connection/postgresql");

const showHotels = (req, res) => {
    let query = `SELECT * 
    FROM hotels 
    JOIN rooms ON hotels.id = rooms.id`;
    // let query = `SELECT * 
    // FROM hotels`;
    console.log(query);
    pool.query(query, (error, result) => {
        if (error) {
            throw error
        }
        console.log("result.rows",result.rows)
        res.status(200).json(result.rows);
    })
}


const showAllHotels = (req, res) => {
    let query = "SELECT * FROM hotels" ;
    console.log(query);
    pool.query(query, (error, result) => {
        if (error) {
            throw error
        }
        console.log("result.rows",result.rows)
        res.status(200).json(result.rows);
    })
}

const showHotel = (req, res) => {
    const { id } = req.params;
    let query = `SELECT * FROM hotels WHERE id='${id}'`;
    console.log(query);
    pool.query(query, (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows);
    })
    console.log(id);
}

const addHotel = (req, res) => {
    const { name, rating, location, hotel_description, hotel_image } = req.body;
    console.log(req);
    console.log(name, rating, location, hotel_description, hotel_image);
    const query = `INSERT INTO hotels (name, rating, location, hotel_description, hotel_image) VALUES ('${name}', '${rating}', '${location}', '${hotel_description}', '${hotel_image}') `;
    pool.query(query, (error, result) => {
        console.log(query);
        if (error) {
            res.status(500).json(error.message)
        }
        res.status(200).json({success_message: "Hotel ADDED", body: req.body})
    })
}

const updateHotel = (req, res) => {
    const { id, name, rating, location, hotel_description, hotel_image } = req.body;
    console.log(id, name, rating, location, hotel_description, hotel_image);
    const query = `UPDATE hotels SET (name, rating, location, hotel_description, hotel_image) = ('${name}', '${rating}', '${location}', '${hotel_description}', '${hotel_image}') WHERE id = '${id}'`;
    pool.query(query, (error, result) => {
        console.log(query);
        if (error) {
            throw error
        }
        res.status(200).json({success_message: "Hotel UPDATED", body: req.body})
    })
}

const deleteHotel = (req, res) => {
    const { id } = req.params;
    console.log(id);
    const query = `DELETE FROM hotels WHERE id = ${id}`;
    pool.query(query, (error, result) => {
        console.log(query);
        if (error) {
            throw error
        }
        res.status(200).json(`Hotel with ID: ${id} DELETED`)
    })
}

module.exports = { showHotels, showAllHotels, showHotel, addHotel, updateHotel, deleteHotel };