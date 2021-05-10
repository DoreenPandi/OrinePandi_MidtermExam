const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routes
app.get("/OrinePandi_211", async(req, res) =>{
    try {   
        const ans = await pool.query(
            `SELECT COUNT(*) 
            FROM film
            ;`);
        res.json(ans.rows)

    } catch (error) {console.error(error.message)}
});

app.get("/OrinePandi_212", async(req, res) =>{
    try {   
        const ans = await pool.query(
            `SELECT rating,
            SUM(rental_duration)
            FROM film
            GROUP BY rating
            ORDER BY rating ASC;`);
        res.json(ans.rows)

    } catch (error) {console.error(error.message)}
});

app.get("/OrinePandi_213", async(req, res) =>{
    try {   
        const ans = await pool.query(
            `SELECT film_id, title
            FROM film
            WHERE replacement_cost = 
            (SELECT MAX(replacement_cost)
             FROM film);`);
        res.json(ans.rows)

    } catch (error) {console.error(error.message)}
});

app.get("/OrinePandi_221", async(req, res) =>{
    try {   
        const ans = await pool.query(
            `SELECT * FROM midterm_list_of_films;`);
        res.json(ans.rows)

    } catch (error) {console.error(error.message)}
});

app.get("/OrinePandi_222", async(req, res) =>{
    try {   
        const ans = await pool.query(
            `SELECT * FROM midterm_total_films_per_category;`);
        res.json(ans.rows)

    } catch (error) {console.error(error.message)}
});

app.get("/OrinePandi_231", async(req, res) =>{
    try {   
        const ans = await pool.query(
            `SELECT CONCAT(c.first_name, ' ',c.last_name) "Customer Full Name",
            CONCAT(a.address, ', ',a.district, ', ',c2.city, ', ',c3.country)"Customer Full Address"
            FROM customer c
            JOIN address a
            ON c.address_id = a.address_id
            JOIN city c2
            ON a.city_id = c2.city_id
            JOIN country c3
            ON c2.country_id = c3.country_id
            ORDER BY c.customer_id ASC;`);
        res.json(ans.rows)

    } catch (error) {console.error(error.message)}
});

app.get("/OrinePandi_232", async(req, res) =>{
    try {   
        const ans = await pool.query(
            `SELECT CONCAT(c.first_name, ' ',c.last_name) "Customer Full Name",
            SUM(p.amount) "Total Lifetime Amount Paid",
            COUNT(f.film_id) "Total Movies Rented",
            GROUP_CONCAT(f.title) "Movie Titles"
            FROM payment p
            JOIN customer c
            ON p.customer_id = c.customer_id
            JOIN rental r
            ON p.rental_id = r.rental_id
            JOIN inventory i
            ON r.inventory_id = i.inventory_id
            JOIN film f
            ON i.film_id = f.film_id
            GROUP BY CONCAT(c.first_name, ' ',c.last_name);`);
        res.json(ans.rows)

    } catch (error) {console.error(error.message)}
});

app.post("/OrinePandi_241/:id", async(req, res) =>{
    try {   
        const {id} = req.params;
        const ans =
            `SELECT get_category($1);`;
        const output = await pool.query(ans,[id]);
        res.send(output.rows)

    } catch (error) {console.error(error.message)}
});

app.get("/OrinePandi_242", async(req, res) =>{
    try {   
        const ans = await pool.query(
            `call update_active(1,1);`);
        res.json(ans.rows)

    } catch (error) {console.error(error.message)}
});

app.listen(5000, () =>{
    console.log('server has started on port 5000');
});