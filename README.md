# product-service-js-be

Author: Surya Meiyappan
Gmail: suryadrago674@gmail.com


mail Template: 
https://github.com/ActiveCampaign/postmark-templates/tree/main/templates-inlined

Package install command:  npm install
migration command:  npx sequelize-cli db:migrate
seeder command:     npx sequelize-cli db:seed:all
application run command:  pm2 start dev.json


Api Collection For Refference:

Register Api :

http://product-service-be.dv/api/v1/authentication
{
    "module": "Auth",
    "module_code": "JWTAUTH",
    "action": "register",
    "data": {
        "username": "",
        "password": "",
        "email": "",
        "phone_number": ""
    }
}

Login Api :

http://product-service-be.dv/api/v1/authentication
{
    "module": "Auth",
    "module_code": "JWTAUTH",
    "action": "login",
    "data": {
        "email": "",
        "password": ""
    }
}


Forgot Password Api :

http://product-service-be.dv/api/v1/authentication
{
    "module": "Auth",
    "module_code": "JWTAUTH",
    "action": "forgotPassword",
    "data": {
        "email": ""
    }
}
