const db = require('../utils/database');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const bcrypt = require('bcrypt');



exports.postAuth = (req, res, next) => {

    // console.log(req.body.first_name);
    // res.send(req.body.first_name);

    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email_address = req.body.email_address;
    var password = req.body.password;
    var gender = req.body.gender;
    var age = req.body.age;
    var fcmToken = req.body.fcmToken;

    const salt = genSaltSync(10);
    password = hashSync(req.body.password, salt);

    db.execute('INSERT INTO users(first_name, last_name, email_address, password, gender, age, fcmToken) VALUES (?, ?, ?, ?, ?, ?, ?)', [first_name, last_name, email_address, password, gender, age, fcmToken]).then(([rows, fieldData]) => {
        res.status(200).json({
            data : rows,
            moreData : fieldData
        })
    })

}

exports.getAuth = (req, res, next) => {

    db.execute('SELECT * from users').then(([rows, fieldData]) => {
        res.status(200).json(rows)
    })
}

exports.login = (req, res, next) => {

    var email_address = req.body.email_address;
    var password = req.body.password;


    db.execute('SELECT * FROM users WHERE email_address=?', [req.body.email_address]).then(([rows, fieldData]) => {
        if(rows.length > 0) 
        {
            const validPassword = compareSync(req.body.password, rows[0].password);
            if(validPassword)
            {
                res.status(200).json({
                    message : 'User logged in Successfully',
                    success: true,
                    data: rows[0],
                    
                })
            }
        }
    })
}