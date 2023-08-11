const express=require('express');
const Router=express.Router();
const userService=require('../Services/userService');

Router.get('/Linkserveur',userService.GetServeur)

module.exports=Router