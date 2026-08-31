# Track.ME
<img width="862" height="289" alt="logo_light" src="https://github.com/user-attachments/assets/f93043e3-f6dc-4793-8deb-9e53693c3bd7" />

Web-based goal tracker made to prevent procrastination and provide a clear overview of how close you are to achieving those goals, coded in React with a backend made in Node.JS.

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Setup](#setup)

## Introduction

I'm going to be honest, I have a problem. Every time I want to start a big project like an RC plane or a Robot arm, I never finish it. I always run out of motivation, and it ends up sitting half-completed in the corner. The most recent example would be a plane I attempted to 3d print (Aeroshark specifically). Long story short, too many things burned me out and I never finished it. As and example, I wanted to build my own RC plane. Specifically, the AeroShark 3D-printable RC plane. Because there were so many different things to do (printing parts, assembly, calibrating motor, ordering the right parts etc.) I lost overview and, let's just say it's collecting dust in a corner now.


The goal of my project is to help people prevent stuff like this.
<img width="973" height="897" alt="image" src="https://github.com/user-attachments/assets/cdbf6d8e-2c69-4683-a1f5-1487296723f0" />





## Features

1. Create and delete widgets 
2. Draggable widgets for organization
3. Creation and deletion of different workspaces
4. User login and sign-up
5. Polished UI/UX elements with sound effects / visual effects
6. Dark mode / Light mode

## Setup
Project structure
```text
track-me/
├── track-me-backend/          # Node.js + Express API server
│   ├── server.js     # Entry point
│   ├── package.json  # Backend dependencies
│   └── .env.example  # Template for environment variables
├── src/              # React frontend source code
├── public/           # Static frontend assets
└── package.json      # Frontend dependencies
```
First of all, you would need to get a server to host the website and the backend on. This can range from a cheap 1$ a month VPS to your homelab. Start by ensuring you have you have ** Node.JS v16 or higher and npm installed on your machine.

## 1. Clone the repository by typing:
```bash
git clone [https://github.com/1440pQHD/track-me.git](https://github.com/1440pQHD/track-me.git)
```

## 2. Navigate into the ```track-me-backend``` folder and install alldependencies by typing:
```
cd track-me-backend
npm install
```
## 3. Set up Environment Variables
Create a .env file inside the ```track-me-backend``` folder using this template (or .env.example provided in the rep)
```
PORT=3000
DB_USER= postgres
DB_PASSWORD=YourPasswordHere ;)
DB_HOST=localhost (If running on the same machine)
DB_PORT=5432
DB_NAME=trackme_db
```
## 4. CD out of the backend folder and back to the root folder. Once there, run:
```npm install```

## 5. Start the development server and build the production build
```npm run dev```
(Take note of the address)
```npm run build```
## 6. Point the backend to the frontend 
Edit the .env file inside ```track-me-backend``` and replace "your_front_end_url_here" with the URL you noted down earlier.

## Finally, inside the backend folder, run:
```npm start```
And voilà, the backend should now be properly configured and running with the goal tracker, so you can log in and retrieve all your saved workspaces and goals.







The backend is a simple Node.js server that uses PUT requests to store user data.
<img width="444" height="278" alt="image" src="https://github.com/user-attachments/assets/ec722498-af36-4e96-9040-ec0ea19d0cc0" />


The user login system works with an 8-digit alphanumeric code that is randomly generated. The maximum number of combinations is 2.8 trillion!

My backend is currently hosted on a VPS in London alongside the website.

