# App-A-Palooza-App

An app to be used during the App-A-Palooza part of the Own Your Pursuit Event.

App-A-Palooza is an event where fellows apply to as many jobs as they can in a set amount of time.

This app will let fellows set a personal goal regarding the number of Job Applications they want to send during the event, aggregate the numbers in a community target and display a single bar Bar Chart that will go up towards the community target every time a fellow submits an application.

At the end of the event the community will be able to see if they collectively hit the target

## Motivation

Humans like to see numbers go up and thinking that your job application as a single fellow helps the overall number go up can serve as a motivator to send more applications than what might be thought possible.

## DB Diagram

[Found here](https://dbdiagram.io/d/60138d2380d742080a384e16)

## GUI Designs

[On Figma here](https://www.figma.com/file/Pr6nGTZCEgSN6uxjX3Ym59/App-a-palooza?node-id=0%3A1)

## Server

### Endpoints

Root endpoint: `{{server_address}}/api`

| Method | Endpoint                            | Description                                            | Done/Priority |
| ------ | ----------------------------------- | ------------------------------------------------------ | ------------- |
| `POST` | `/users`                            | Add a new user with its goal                           | ✅ / 1         |
| `GET`  | `/users/current`                    | Retrieve the current session information               | ✅ / 2         |
| `POST` | `/job-applications`                 | Add a new job application                              | ✅ / 1         |
| `GET`  | `/job-applications`                 | Get all users' job applications                        | ☑️ / 4         |
| `GET`  | `/job-applications/community/count` | Get count of all users' job applications               | ✅ / 2         |
| `GET`  | `/job-applications/community/goal`  | Sum of all users goals (the community)                 | ✅ / 2         |
| `GET`  | `/job-applications/user/goal`       | Retrieve a current user's goals                        | ✅ / 3         |
| `GET`  | `/job-applications/user/count`      | Retrieve the current user's count of applications sent | ✅ / 3         |

### Web Sockets Messages

#### Server -> Client

Broadcast to all clients

| Message                 | Payload             | Description                     |
| ----------------------- | ------------------- | ------------------------------- |
| `NEW_APPLICATION_ADDED` | `{job_application}` | To update progress towards goal |
| `NEW_USER_ADDED`        | `new_user_goal`     | To update community goal        |

## Client

| Page       | Description                                              |
| ---------- | -------------------------------------------------------- |
| /          | Display community and users' personal goal with progress |
| /register  | User registration and goal setting form                  |
| /community | Display community and progress goal only                 |

## Steps/Components

* React
* Database
* Server
* Web Sockets
* Notification library when someone submits a job.
* Persistent session storage.
* Chart React Library (maybe unnecessary) use px in css as %
