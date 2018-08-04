#Edrak-Online courses

This is online courses application, that allow user to add new courses that linked to youtube and display it 

---

## Technologies:

* Front-end : React JS.
* Back-end : NodeJS ( Express ).
* Database : Mongodb.

---

## How to Run:

* clone this repo to your pc.

* create youtube credentials and replace with file (`client_secret.json`) 

* run your terminal, then write :
	1. `$ npm install` .

	2. `$npm start` .

    3. `$npm run dev-react` .

---

## Add Admin account to Database:

in order to create admin account you need to use Postmane or cURL.

send POST request to `http://localhost:3000/api/user/create`

it must be in **application/json** type and its format as `{"userName": "admin","password": "admin","fullName": "Admin Account","gender" : "Male","Role" : "Admin"}`.

---

## Auther:
- [Ahmad Alyaaqba](https://github.com/AhmadAlYaaqba/) - Auther -
