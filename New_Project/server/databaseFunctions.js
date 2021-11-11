var sqlite3 = require('sqlite3').verbose() //npm install sqlite3

//Creating a new database instance - Indication of connected database
//Before peforming any operations to database, make sure database is connected.
let db = new sqlite3.Database('./Database/task.sqlite', (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        //Successful database connection
        console.log('Database Connected!') 
    }
});

//Create a User
let createUser = (id, email, password) =>{
	var createUserSql ='INSERT INTO USER (user_id, user_email,user_password) VALUES (?,?,?)'
	var params =[null, email, password];

	db.run(createUserSql, params, function(err){
		if (err){
			return console.log(err.message);
		}
		console.log("User Created");
		console.log(`Rows inserted ${this.changes}`);	  
	});
}

module.exports = {createUser};