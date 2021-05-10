const pool= require ("./db");

const agg1=`call update_active(1, 0);`;

pool.query(agg1, (err, res) => {
	try {
		console.log(res.rows);
	} catch (err){
		console.error(err.message);
	}
});

pool.end();