# Overview

This is the final solution for the UBIO tech challenge.

The original README.md is provided at the end.

Thank you for sharing this challenge, and for opportunity to join the team. I had a lot of fun trying to solve this!

### Development time

Although I didn't accurately time the challenge, overall I'd estimate I took around 10 hours to complete this project.

### Frameworks Used:

- NestJS
- MongoDB Atlas
- Mongoose
- Jest

I've implemented both unit tests and e2e testing for the api endpoint.

### Other tools

- Postman (for making api calls)
- [Swagger](http://localhost:3000/api) docs added (accessed when local server is running)

This repository was created with NestJS
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

### Notes & Considerations

- `.env` file
  - In a real world project I would not expose the database password. However since this will only be used locally, I've simplified it and created two Mongo database, one for testing and one for production, which can be accesse by any ip address.
- UNIX timestamp vs DateTime:
  - I've taken the liberty to rather than using a UNIX timestamp, to use a DateTime object type in Mongo instead. This was to faciliate use cases such as setting up an expiry field for automatic deletion after a certain amount of time in MongoDB.
- Expiry time of last `updatedAt`
  - I've set this to 1 minute for testing purposes. On a real world project, depending on the use case the expiry time would likely be higher, e.g. 1h or more.
- Improving folder structure

  - Due to the project not having a lot of entities I've simplified folder structure, and encompassed the `group` summary and logic into the `heartbeat` folder. For a more scalable solution/real world case, I would add these to separate folders.

- Prisma VS Mongoose
  - I considered and tried using Prisma for creating the database schemas, as I have used in the past with SQL database such as PostgreSQL, however I found that in the case for using MongoDB, Mongoose worked better at this moment in time.

## Set up environment

Create a `.env` file at the root of the project and add:

```bash
PROD_DB_URL="mongodb+srv://cooluser:coolpassword@node-heartbeat.p1yr3un.mongodb.net/%3FretryWrites=true&w=majority"
TEST_DB_URL="mongodb+srv://testcooldb:testcooldbpassword@cluster0.p6ue95j.mongodb.net/?retryWrites=true&w=majority"
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

---

# Original README

# Backend Developer Technical Test

Hi there!

We are excited about you considering to join our small team of dedicated engineers.

Below you will find a technical test that will help us understand your ability to write clean concise code, which is easy to reason about, maintain and support. We are also keen on seeing your approach to naming (because we know how hard naming is!) and structuring the entities around your codebase, as well as testing and documenting them.

Good luck, and looking forward to welcome you aboard.

## Spec

Implement a RESTful horizontally scalable discovery service.

The idea is simple: a number of different client applications will periodically send heartbeats to this service, and the service keeps track of them, periodically removing those that didn't send any heartbeats in some configured time frame.

### Endpoints

The service should expose the following endpoints:

- `POST /:group/:id`

  - registers an application instance in specified `group`
  - `id` is a unique identifier of application instance, generated by client
  - if instance is already registered, the `updatedAt` timestamp must be updated
  - the request body can specify meta information that will be attached to the instance
  - returns JSON with following structure:

    ```js
    {
        "id": "e335175a-eace-4a74-b99c-c6466b6afadd",   // echoed from path parameter
        "group": "particle-detector",                   // echoed from path parameter
        "createdAt": 1571418096158,                     // first registered heartbeat
        "updatedAt": 1571418124127,                     // last registered heartbeat
        "meta": {                                       // meta echoed from request body
            "foo": 1
        }
    }
    ```

- `DELETE /:group/:id`

  - unregisters an application instance

- `GET /`

  - returns a JSON array containing a summary of all currently registered groups as follows:

    ```js
    [
      {
        group: 'particle-detector',
        instances: '4', // the number of registered instances in this group
        createdAt: 1571418124127, // first heartbeat registered in this group
        lastUpdatedAt: 1571418124127, // last heartbeat registered in this group
      },
      // ...
    ];
    ```

  - groups containing 0 instances should not be returned

- `GET /:group`

  - returns a JSON array describing instances of the `group`:

    ```js
    [
      {
        id: 'e335175a-eace-4a74-b99c-c6466b6afadd',
        group: 'particle-detector',
        createdAt: 1571418096158,
        updatedAt: 1571418124127,
        meta: {
          foo: 1,
        },
      },
      // ...
    ];
    ```

The service should periodically remove expired instances. The "age" of the most recent heartbeat of an instance to be considered expired should be configurable with environment variable and have a sensible default value.

## Our expectations

- A service should be implemented in Node.js, with README containing steps to get it up and running.
- TypeScript with `strict: true` is strongly encouraged, but not 100% required.
- Unless something is explicitly stated in Spec, please choose how to approach the specifics.
  - If some use cases are missing in Spec but important, please do cover them in your solution as well. Don't forget to document important implementation decisions.
  - Feel free to challenge the Spec if something does not add up, or can be done more elegantly and/or efficiently. We appreciate the ability to work with the requirements.
- Feel free to use latest Node version (we don't like legacy either!)

## Submitting solution

- Create a repository on GitHub and/or BitBucket, push your code there and send us a link.
- If you choose to use a private repository, download your code as ZIP and attach it to the email.
- Optional: Deploying the solution to some public service like Glitch
- Optional: Showing a green CI page would also be beneficial

---

## License

Nest is [MIT licensed](LICENSE).
