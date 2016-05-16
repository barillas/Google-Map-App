// Pulls Mongoose dependency for creating schemas

var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

// Creates a User Schema. This will be the baseis of how user data is stored in the database

var UserSchema = new Schema ({

	username: {type: String, required: true},
	gender: {type: String, required: true},
	age: {type: Number, required: true},
	favlang: {type: String, required: true},
	location: {type: [Number], required: true }, // [Long, lat]
	htmlverified: String, 
	created_at: {type:Date, default: Date.now},
	updated_at: {type:Date, default: Date.now}
});

//Sets the created_at parameter to the current time 

UserSchema.pre('save', function(next){

	now = new Date();
	this.updated_at = now;
	if (!this.created_at) {
		this.created_at = now;
	}

	next();

});

//Indexes this schema in 2dsphere format (critical for running proxmity searches)

UserSchema.index({location: '2dsphere'});

//Exports the UserSchema for use elsewhere. Sets the MongoDB Colleciton to be used as "scotch-user"

module.exports = mongoose.model('scotch-user', UserSchema);

