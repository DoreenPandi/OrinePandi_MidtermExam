const pool= require ("./db");

const agg1=`SELECT rating,
SUM(rental_duration)
FROM film
GROUP BY rating
ORDER BY rating ASC;`;

pool.query(agg1, (err, res) => {
	try {
		console.log(res.rows);
	} catch (err){
		console.error(err.message);
	}
});

pool.end();