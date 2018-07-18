# vehicle-lite
A RESTful coding challenge.

Given a limited amount of time with the below acceptance criteria, I was able to make a back-end with Node.js and NanoSQL to make several endpoints that met as a very minimum-viable product.  My plan (if given enough time) was to later encorporate either a React or Angular frontend styled with Material Design (for uniformity).  It would be composed of a simple form that would allow the user to add different fields that would build out the variable "props" that could be saved in the database for each vehicle type.  

I chose an open props object for various reasons, the main one being flexibility.  As we determined baseline attributes, those would be added to the model such as size, volume, speed, make, model, etc.  Given an object with this flexibilty, you can dynamically insert text fields and inputs that are dynamically generated based off of each vehicle type.

Thank you for your consideration.

## Getting Started

`npm start`

> App is accessible at http://localhost:3000

## Endpoints

* GET /vehicles/id - get a single vehicle `ex: /vehicles/1`
* GET /vehicles/all - get array of all vehicles
* POST /vehicles/new/type - create a new vehicle of type `ex: /vehicles/new/boat`
  * Accepts a body of properties
* POST /vehicles/id - update a single vehicle `ex: /vehicles/1`
  * Accepts a body { type: string, props: object }
* DELETE /vehicles/id - delete specific vehicle `ex: /vehicles/1`
* DELETE /vehicles/last - delete last added vehicle (as of session)

## Acceptance Criteria
```
Design a simple Restful application (do not use springboot) to handle vehicles inventory & search. Share your coding assessment via public git repo.
Basic requirements:
1) Vehicle could be of different types with specific properties and behaviors. Types: Car, Truck, Airplane, Drone, Amphibian, Boat.
2) CRUD operations to manage vehicles
3) Save to a local db like h2 or sqlite
4) Ability to search for vehicles
4) Delete recent API - should delete last added vehicle
```