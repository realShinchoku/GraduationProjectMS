# GraduationProjectMS

This project was create with .NET 7, React, and use PostgreSQL.

## Server

### Database

Open docker and run PostgreSQL:

<img src="https://cdn.discordapp.com/attachments/1072793867109273640/1075260771778437150/image.png" alt="Docker" title="Docker">

After run config port of `DefaultConnection` in `./API/appsettings.json` to port on PostgreSQL

<img src="https://cdn.discordapp.com/attachments/1072793867109273640/1075261848259149874/image.png" alt="DockerPost" title="DockerPost">

### Run

In terminal project run:

#### `dotnet run --project API --no-hot-reload`

## Client

### First we need cd the client

#### `cd ./client-app`

### Download package for first clone

#### `npm i`

### Run the client app

#### `npm run start`