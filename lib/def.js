import IO from 'socket.io-client'
import emitter from 'events'
import auth from './auth'
import transport from './transport'


let LOGGER = function( ...logs ) {
	console.debug( `DEF:`, ...logs )
}


/**
 * Definicion de flujo de datos
 */
class def {
	constructor() {
		this.emitter = new emitter()
		this.authentificator = false
		this.initialized = false
		this.transporter = false
		this.version = "0.0.0"
	}


	/*
	Eventos
	 */
	on( ...args ) { this.emitter.on( ...args ) }
	once( ...args ) { this.emitter.once( ...args ) }
	addListener( ...args ) { this.emitter.addListener( ...args ) }
	emit( ...args ) { this.emitter.emit( ...args ) }
	removeAllListeners( ...args ) { this.emitter.removeAllListeners( ...args ) }
	removeListener( ...args ) { this.emitter.removeListener( ...args ) }


	/*
	Inicializa las configuraciones
	 */
	initialize( config = {} ) {
		let { silent = false, apiKey, authURL, databaseURL, clientId, room = 'def' } = config

		this.silent = silent
		this.silent && LOGGER( `Load config: silent = ${silent}` )

		this.apiKey = apiKey
		this.silent && LOGGER( `Load config: apiKey = ${apiKey}` )

		this.authURL = authURL
		this.silent && LOGGER( `Load config: authURL = ${authURL}` )

		this.databaseURL = databaseURL
		this.silent && LOGGER( `Load config: databaseURL = ${databaseURL}` )

		this.clientId = clientId
		this.silent && LOGGER( `Load config: clientId = ${clientId}` )

		this.room = room
		this.silent && LOGGER( `Load config: room = ${room}` )

		this.initialized = true

		this.authentificator = new auth( this )
		this.transporter = new transport( this )
	}

	auth() {
		return this.authentificator
	}

	transport() {
		return this.transporter
	}
}


/*
Export def
 */
export default def
