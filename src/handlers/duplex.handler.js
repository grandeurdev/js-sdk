// This is the most important class
// of Grandeur. This
// handles the real time connectivity.

// Import the event emitter class
import { EventEmitter } from "events";
import WebSocket from "isomorphic-ws";

// Import cuid because we will use it to generate packet ids
import { createId } from "@paralleldrive/cuid2";

// Extend the event emitter class
class BaseEventEmitter extends EventEmitter {

	// Function to emit an event based on pattern matching
	pEmit(topic, ...args) {

		// Loop over the event namaes
		this.eventNames().forEach((sub) => {

			// Emit event where ever there is a possible match
			if (topic.match(new RegExp(sub))) {

				// Send update on the sub
				this.emit(sub, ...args);

			}

		});

	}
}

// Datastructure of buffer
class buffer {

	// Constructor
	constructor() {

		// Define an internal object
		this.list = {};

	}

	// Function to push a packet to buffer
	push(id, packet) {

		// Add it to the buffer
		this.list[id] = packet;

	}

	// Function to loop over each pakcet in buffer
	forEach(callback) {
		
		// We will loop over elements in list
		Object.keys(this.list).forEach((id) => callback(this.list[id]));

	}

	// Function to remove a packet from buffer
	remove(id) {

		delete this.list[id];

	}
}

// Class
class duplex {

	// Constructor
	constructor(config, auth) {

		// Server URL to send upgrade requests
		this.config = config;

		// Store reference to auth handler
		this.auth = auth

		// Event queue object to handle callbacks
		// on Response
		this.tasks = new BaseEventEmitter();

		// User subscriptions object to handle
		// user subscriptions
		this.subscriptions = new BaseEventEmitter();

		// To check the status of Connection
		this.status = "CONNECTING";

		// To store the connection callback
		this.cConnection = null;

		// Buffer to store packets
		this.buffer = new buffer();

		// Setup list for events
		this.topics = {
			user: ["devices"],
			device: ["name", "status", "data"],
		};

		// Flag to abort current cycle
		// Like the case where a auth ping was on flight
		// but we triggered reconnection
		// Now to avoid the impact of the already sent request
		// we will use this signal
		this.abort = false;

	}

	// To initialize the connection
	async init() {

		// Reset abort flag
		this.abort = false;

		// Before starting the connection
		// verify that either the user is authenticated
		// or not using the auth object provided in args
		// Start the Connection

		try {

			var res = await this.auth.ping();

			// Once the response is received
			// make sure that we aren't in abort condition
			if (this.abort) return;

			// Got the response
			switch (res.code) {

				case "AUTH-AUTHORIZED":

					// User is authenticated
					// so try to connect to the duplex

					// Setup cookie
					var cookie = "";

					// Get cookie

					cookie = this.config.token || "";

					// Setup url
					const url = `${this.config.node}?apiKey=${this.config.apiKey}&token=${cookie}`;

					// Connect to the server
					this.ws = new WebSocket(url, "node");
					
					break;

				case "AUTH-UNAUTHORIZED":

					// User is not Authenticated
					// try to reconnect after some time
					this.reconnect();

					// Setup error response
					this.setStatus("AUTH-UNAUTHORIZED");

					// Flush buffer
					this.flush();

					return;

				case "SIGNATURE-INVALID":
				case "TOTP-INVALID":

					// Signature is invalid
					// Don't reconnect

					// Setup error response
					this.setStatus("SIGNATURE-INVALID");

					// Flush buffer
					this.flush();

					return;
			}
		} 
		catch (err) {

			// Internet connectivity issue
			// so try to reconnect in a while
			this.reconnect();

			// Setup default error
			this.setStatus("CONNECTION-REFUSED");

			// Flush buffer
			this.flush();

			return;

		}

		// When connection opened with the server
		this.ws.onopen = () => {

			// Set status to connected
			this.setStatus("CONNECTED");

			// Notify user about the change
			if (this.cConnection) this.cConnection("CONNECTED");

			// Start Ping
			this.ping = setInterval(() => {

				// Send packet to server
				var packet = { header: { id: "ping", task: "ping" }, payload: {} };
				this.ws.send(JSON.stringify(packet));

			}, 25000);

			// Handle bufferd packets
			this.handle();

		};

		// When connection closed with the server
		this.ws.onclose = () => {

			// Set the status to connecting
			this.setStatus("CONNECTING");

			// Notify user about the change
			if (this.cConnection) this.cConnection("DISCONNECTED");

			// Clear ping
			clearInterval(this.ping);

			// Retry connection after a while
			this.reconnect();

		};

		this.ws.onmessage = (message) => {

			// When a message is received from the server on duplex
			var data = JSON.parse(message.data);

			// Raise user event
			if (data.header.task === "update") {

				// Handle
				if (this.topics.device.includes(data.payload.event)) {

					// If event is of device type then get topic
					var topic = `${data.payload.deviceID}/${data.payload.event}${data.payload.path ? `/${data.payload.path}` : ""}`;

					// Then check the event type
					if (data.payload.event === "data") {

						// Emit event
						this.subscriptions.pEmit(topic, data.payload.path, data.payload.update);

					} 
					else {

						// Handler is defined for the event type
						// so execute the callback
						this.subscriptions.emit(topic, data.payload.update);

					}
				} 
				else {

					// Handler is defined for the event type
					// so execute the callback
					this.subscriptions.emit(data.payload.event, data.payload.update);

				}

			} 
			else {

				// Fire event
				this.tasks.emit(data.header.id, data.payload);

				// Since the res has been received, so we can debuffer the packet
				// if it was ever placed on the buffer
				if (data.header.task !== "/topic/subscribe") {

					// But don't remove the subscription based packets
					this.buffer.remove(data.header.id);

				}

			}
		};
	}

	reconnect() {

		// This function will call the
		// init event again with the auth
		// object after certain time

		// If the connection was disposed then don't reconnect
		if (this.status === "DISPOSED") return;

		// Put in abort mode
		this.abort = true;

		// Clear the existing timeout (if any)
		clearTimeout(this.recon);

		// We are already connected
		if (this.status === "CONNECTED") { 

			// Then close the connection
			this.ws.close();

			// Set status to disposed
			this.setStatus("DISCONNECTED");

			// And don't proceed to setup the reconnect timeer
			// the close event handler will automatically do this
			return;

		}

		// Start timer
		this.recon = setTimeout(() => {

			// Set status
			this.setStatus("CONNECTING");

			// Call init again
			this.init();

		}, 5000);
		
	}

	setStatus(status) {

		// Function to set status

		// Prevent setting status if the connection was disposed
		if (this.status === "DISPOSED") return;

		// Set
		this.status = status;

	}

	dispose() {

		// The function will close the duplex
		if (this.status === "CONNECTED") {

			// Also close the connection
			this.ws.close();

		}

		// Set status to disposed
		this.setStatus("DISPOSED");

		// Clear timeout
		clearTimeout(this.recon);

	}

	disconnect() {

		// Function will just close the connection
		if (this.status === "CONNECTED") {

			// Trigger close event
			// So that we could trigger a reconnect loop
			this.ws.close();

		}

		// Set status to disposed
		this.setStatus("DISCONNECTED");

		// Clear timeout
		clearTimeout(this.recon);
	}

	onConnection(callback) {

		// This function will take the
		// callback from use and will set
		// it to context so that
		// a the user could be notified
		// about possible connection changes
		this.cConnection = callback;

		// and return a
		return {
			clear: () => {
				// Remove the callback
				this.cConnection = undefined;
			},
		};

	}

	handle() {

		// We will loop over the buffer to send
		// the stored packets to server

		this.buffer.forEach((packet) => {

			// Send to server
			this.ws.send(JSON.stringify(packet));

		});

	}

	flush() {

		// This function flushes the event
		// buffer of the duplex. Loop over the buffer

		this.buffer.forEach((packet) => {

			// Emit event and throw error
			this.tasks.emit(packet.header.id, undefined, {
				code: this.status,
			});

			// Remove the packet from buffer
			this.buffer.remove(packet.header.id);
			
		});
	}

	send(event, payload) {

		// Create promise
		return new Promise((resolve, reject) => {

			//  If the connection is not borked
			if (this.status !== "SIGNATURE-INVALID" && this.status !== "DISPOSED") {

				// Generate unique ID for the request
				var id = createId();

				// Setup packet
				var packet = {
					header: {
						id: id,
						task: event,
					},
					payload: payload,
				};

				// Attach an event listener
				this.tasks.once(id, (res, err) => {

					// Reject if error has been returned
					if (err) return reject(err);

					// Resolve the promise
					resolve(res);

				});

				// If Connected to server
				if (this.status === "CONNECTED")

					// Then send packet right away if
					this.ws.send(JSON.stringify(packet));


				// Otherwise store the packet into a buffer
				else this.buffer.push(id, packet);

			} 
			else {

				// Otherwise return a rejection
				reject({
					code: this.status,
				});

			}

		});
	}

	subscribe(event, payload, callback) {

		// Method to subscribe to a particular device's data
		// Verify that the event is valid
		if (!(this.topics.device.includes(event) || this.topics.user.includes(event))) {

			// If the event is invalid
			// then return an error through callback
			callback({
				code: "TOPIC-INVALID",
			});

			return;

		}

		// Verify that if it is a device event
		// then device id is provided
		if (this.topics.device.includes(event) && !payload.deviceID) {

			// device id is not specified
			callback({
				code: "DATA-INVALID",
			});

			return;
		}

		// Return new promise
		return new Promise((resolve, reject) => {

			//  If the connection is not borked
			if (this.status !== "SIGNATURE-INVALID" && this.status !== "DISPOSED") {

				// Generate unique ID for the request
				var id = createId();

				var packet = {
					header: {
						id: id,
						task: "/topic/subscribe",
					},
					payload: payload,
				};

				// Formulate topic
				var topic = event;

				// If it is a device event then setup topic
				if (this.topics.device.includes(event)) {
					
					// Based on deviceID, event and path
					topic = `${payload.deviceID}/${event}${payload.path ? `/${payload.path}` : ""}`;

				}

				// Create unsub function
				const clear = () => {

					// Remove event listener
					this.subscriptions.removeListener(topic, callback);

					// Return if other subscribers are also attached to the topic
					// as in, we only want to unsub the topic for current callback
					if (this.subscriptions.listenerCount(topic) > 0) {

						// Return promise
						return new Promise((resolve, reject) =>
							resolve({
								code: "TOPIC-UNSUBSCRIBED",
							})
						);

					}

					// Remove the subscription packet from buffer
					this.buffer.remove(id);

					// Send request
					return this.send("/topic/unsubscribe", payload);

				};

				// Now if a subscriber is already listening to this topic
				if (this.subscriptions.listenerCount(topic) > 0) {

					// Then add another subscriber but don't send another request to server
					this.subscriptions.on(topic, callback);

					// Resolve request and return
					resolve({
						code: "TOPIC-SUBSCRIBED",
						clear: clear,
					});

				} 
				else {

					// Attach an event listener
					this.tasks.once(id, (res, err) => {

						// Reject if error has been returned
						if (err) return reject(err);

						// Add callback to subscriptions buffer
						this.subscriptions.on(topic, callback);

						// Resolve the promise
						resolve({
							...res,
							clear: clear,
						});

					});

					// Always buffer the packet because
					// we want these packets to later restore control
					this.buffer.push(id, packet);

					// If Connected to server
					if (this.status === "CONNECTED")

						// Then send packet right away
						this.ws.send(JSON.stringify(packet));
					
				}
			} 
			else {

				// Otherwise return a rejection
				reject({
					code: this.status,
				});

			}

		});
	}
}
export default duplex;
