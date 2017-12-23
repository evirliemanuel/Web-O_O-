const express = require('express');
const router = express.Router();

var list = [];

function findUserById(id) {
    for(counter = 0; counter < list.length; counter++) {
        var _user = list[counter];
        if(_user.id == id) {
            return _user;
        }
    }
    return null;
}
function getAllUser(){
    var _alluser = list;
    return _alluser;
}

router.get('/:userID',(request, response, next)=>{

    //map to :userID
    const id = request.params.userID;

    var alluser = getAllUser();

    if (id == 'all'){
      
            response.status(200).json(alluser);

    }else{

    var _user = findUserById(id);

        if (_user) {
            response.status(200).json(_user);
        } else {
            response.status(200).json({
                message : "Not found"
            });
        }
    }
});

router.post('/',(request, response, next)=>{

    //temporary object
    const users = {};

    //generated random id
    users.id = Math.floor((Math.random() * 10) + 1);

    //mapp
    users.username = request.body.username;
    users.password = request.body.password;

    //save on list
    list.push(users);

    //display
    response.status(201).json(users);
});

module.exports = router;