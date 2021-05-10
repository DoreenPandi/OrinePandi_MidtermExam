const pool= require ("./db");

const agg1=`SELECT film_id, title
FROM film
WHERE replacement_cost = 
(SELECT MAX(replacement_cost)
 FROM film);`;

pool.query(agg1, (err, res) => {
	try {
		console.log(res.rows);
	} catch (err){
		console.error(err.message);
	}
});

pool.end();