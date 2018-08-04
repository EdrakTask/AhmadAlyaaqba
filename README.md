## Edrak-Online courses

This is online courses application, that allow user to add new courses that linked to youtube and display it 

---

## Technologies:

* Front-end : React JS.
* Back-end : NodeJS ( Express ).
* Database : Mongodb.

---

## Features:

* User Authenication system with Roles (User / Admin).
* User profile page displaying all courses that user have.
* User can only edit or delete courses that the user created.
* Category for courses, Only admin account can add new category.
* Each Category have its own color, that color will be a border for courses card.
* Display all course page, and have its sort function.
* Display courses by category page .
* When adding new course, to attach video it have 2 options
    1. Insert youtube link for uploaded video.
    2. Upload video directly to youtube (using youtube API).
* General secuty all over API.
and alot of other features

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

## Add Category:

you must be logged in using admin account, then navigate to `http://localhost:3000/admin`.

---

## Auther:
- [Ahmad Alyaaqba](https://github.com/AhmadAlYaaqba/) - Auther -
