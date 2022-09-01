# Project Objective
Real time multi user chat application developed using sockets and web socket protocol

## Folder Structure
	Root 
		client 
			css/style.css
			js/client.js
			vendor/images
			index.html
		server
			node_modules
			package.json
			package.lock.json
			server.js
		LICENCE
		README.md

## Prerequisites
	Socket, Web Socket and Web Socket Secure

## Terminology
	Socket : It is an end-point in a two way communication line between two programs within a network using a communication protocol

	Web Socket Protocol : A communication protocol which allows multi way communication at the same time

## Functions
	socket.emit(event, data) : trigger server to initialize an event
	socket.broadcast.emit(event, data) : trigger clients to initialize an event
	socket.on(event, data) : listen to an event


## Why I chose ws Protocol?

## HTTP vs WS
	1. HTTP allows one way communication at a time whereas WS allows multi way communication at a time
	2. In HTTP, client-server architecuture is followed whereas In WS, clients and server both can push updates simultaneously that makes the web app faster and efficient

## Socker.IO
	event driven JS library for developing real time web application
	Refer here at : https://socket.io/
