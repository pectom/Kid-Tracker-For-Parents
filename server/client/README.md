To start client server run command: npm start

Additional modules:
react,
axios,
react-router-dom,
semantic-ui-react,
redux-form,
react-redux,
http-proxy-middleware

To install modules go to /client and run command:
    npm install --save react axios ...

To run you also should have /server/config/dev.js file with secret keys.

Requests:

Request URL: http://localhost:3000/api/current_user
Request Method: GET

Request URL: http://localhost:3000/api/logout
Request Method: GET

Request URL: http://localhost:3000/auth/local
Request Method: POST
email: "abc@abc.pl"
password: "a"

Request URL: http://localhost:3000/api/children
Request Method: GET

Request URL: http://localhost:3000/api/children
Request Method: POST
iconColor: "blue"
name: "Aga"
user: "5c07cb300590db0096ad7a50"

Request URL: http://localhost:3000/api/children/5c0838df3f95c6006b263435
Request Method: PUT
iconColor: "blue"
name: "Aga2"

Request URL: http://localhost:3000/api/children/5c0838df3f95c6006b263435
Request Method: DELETE

Request URL: http://localhost:3000/api/areas
Request Method: POST
children: ["5c0839553f95c6006b263436"]
iconId: "building"
latitude: "45"
longitude: "36"
name: "Domek"
radius: "346"

Request URL: http://localhost:3000/api/areas
Request Method: GET

Request URL: http://localhost:3000/api/areas/5c08396a3f95c6006b263437
Request Method: PUT
children: ["5c0839553f95c6006b263436"]
iconId: "building"
latitude: 45
longitude: 36
name: "Domek2"
radius: 346

Request URL: http://localhost:3000/api/areas/5c08396a3f95c6006b263437
Request Method: DELETE