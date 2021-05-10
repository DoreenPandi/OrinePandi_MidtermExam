const pool= require ("./db");

const agg1=`SELECT CONCAT(c.first_name, ' ',c.last_name) "Customer Full Name",
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
GROUP BY CONCAT(c.first_name, ' ',c.last_name);`;

pool.query(agg1, (err, res) => {
	try {
		console.log(res.rows);
	} catch (err){
		console.error(err.message);
	}
});

pool.end();