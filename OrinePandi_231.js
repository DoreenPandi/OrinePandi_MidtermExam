const pool= require ("./db");

const agg1=`SELECT CONCAT(c.first_name, ' ',c.last_name) "Customer Full Name",
CONCAT(a.address, ', ',a.district, ', ',c2.city, ', ',c3.country)"Customer Full Address"
FROM customer c
JOIN address a
ON c.address_id = a.address_id
JOIN city c2
ON a.city_id = c2.city_id
JOIN country c3
ON c2.country_id = c3.country_id
ORDER BY c.customer_id ASC;`;

pool.query(agg1, (err, res) => {
	try {
		console.log(res.rows);
	} catch (err){
		console.error(err.message);
	}
});

pool.end();