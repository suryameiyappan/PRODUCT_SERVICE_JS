# product-service-js-be

application run command  : pm2 start dev.json

migration command: npx sequelize-cli db:migrate

mail Template: 
https://github.com/ActiveCampaign/postmark-templates/tree/main/templates-inlined

http://product-service-be.dv/api/v1/authentication
{
    "module": "Auth",
    "module_code": "JWTAUTH",
    "action": "register",
    "data": {
        "username": "surya meiyppan",
        "password": "surya@123",
        "email": "m.surya@novactech.in",
        "phone_number": "9943098715"
    }
}
http://product-service-be.dv/api/v1/authentication
{
    "module": "Auth",
    "module_code": "JWTAUTH",
    "action": "verification",
    "data": {
        "verify_token": "gfhfghfhg564gdfgsdasdfdgdfg"
    }
}
http://product-service-be.dv/api/v1/authentication
{
    "module": "Auth",
    "module_code": "JWTAUTH",
    "action": "login",
    "data": {
        "email": "m.surya@novactech.in",
        "password": "surya@123"
    }
}
http://product-service-be.dv/api/v1/authentication
{
    "module": "Auth",
    "module_code": "JWTAUTH",
    "action": "forgotPassword",
    "data": {
        "email": "m.surya@novactech.in"
    }
}