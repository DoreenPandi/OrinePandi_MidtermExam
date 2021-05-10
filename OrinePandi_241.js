const pool= require ("./db");

const agg1=`select get_category(2);`;

pool.query(agg1, (err, res) => {
	try {
		console.log(res.rows);
	} catch (err){
		console.error(err.message);
	}
});

pool.end();