# vehicle-lite
A RESTful coding challenge

## Getting Started

`npm start`

## Endpoints

* GET /vehicles/id - get a single vehicle `ex: /vehicles/1`
* GET /vehicles/all - get array of all vehicles
* POST /vehicles/new/type - create a new vehicle of type `ex: /vehicles/new/boat`
  * Accepts a body of properties
* POST /vehicles/id - update a single vehicle `ex: /vehicles/1`
  * Accepts a body { type: string, props: object }
* DELETE /vehicles/id - delete specific vehicle `ex: /vehicles/1`
* DELETE /vehicles/last - delete last added vehicle (as of session)
