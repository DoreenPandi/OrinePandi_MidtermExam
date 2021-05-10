const pool= require ("./db");

const agg1=`SELECT * FROM midterm_total_films_per_category;`;

pool.query(agg1, (err, res) => {
	try {
		console.log(res.rows);
	} catch (err){
		console.error(err.message);
	}
});

pool.end();