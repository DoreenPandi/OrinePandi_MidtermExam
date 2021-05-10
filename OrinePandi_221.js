const pool= require ("./db");

const agg1=`SELECT * FROM midterm_list_of_films;`;

pool.query(agg1, (err, res) => {
	try {
		console.log(res.rows);
	} catch (err){
		console.error(err.message);
	}
});

pool.end();