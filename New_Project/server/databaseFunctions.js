var sqlite3 = require('sqlite3').verbose() //npm install sqlite3

//Creating a new database instance - Indication of connected database
//Before peforming any operations to database, make sure database is connected.
let db = new sqlite3.Database('./Database/tidalDB.sqlite3', (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        //Successful database connection
        console.log('Database Connected!') 
    }
});

let checkEmailUsed = (email) =>{
	var getEmailSql = 'SELECT email FROM users WHERE email = ?';
	db.get(getEmailSql, [email], (err, row) => {
		if(err)
			return console.error(err.message);
		if(row){
			return true;
		}
		return false;
	});
}

//Create a User
let createUser = (fName, lName, email, password) =>{
	var createUserSql ='INSERT INTO users (id, fName,lName,email,password) VALUES (?,?,?,?,?)'
	var params =[null, fName,lName, email, password];

	db.run(createUserSql, params, function(err){
		if (err){
			return console.log(err.message);
		}
		console.log("User Created");
		console.log(`Rows inserted ${this.changes}`);	  
	});
}

module.exports = {createUser, checkEmailUsed}