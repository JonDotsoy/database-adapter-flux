import IO from 'socket.io-client'

class Reference {
	constructor( def ) {}
}

/*
Referencia de una conección
 */
class refIO extends Reference {
	constructor( def, url ) {
		super( def )
		this.def = def

		// UTILZANDO SOCKET.IO
		this.io = IO.connect( url )

		let SessionData = this.getSessionStore()

		this.io.on( 'connect', () => {
			console.log( 'is connect transport' )
			console.log( 'emit `_header_data_`' )

			this.io.emit( '_header_data_', {
				'X-Def-Version': def.version,
				'Api-key': this.def.apiKey,
				'Session-Data': SessionData,
			} )
		} )
	}

	/*
	Obtiene los datos del navegador para asociarlos al navegador

	  ----------   ---------   -------------   --------------
	| localStore > tempStore > ConnectServer > Server Session |
	  ----------   ---------   -------------   --------------
	 */

	/*
	Genera de la sesion usando daots locales.
	 */
	generateSession() {}

	/*
	Obtiene los datos de session almacenados de forma local
	 */
	getSessionStore() {
		return localStorage.getItem( 'defStoreSession' ) || {}
	}

	/*
	envia datos esperando un callback
	 */
	request( data ) {
		return new Promise( ( resolve, reject ) => {
			/**
			 * Callback al request emitido al servidor.
			 * 
			 * @param {Number} coderr - Codigo de resultado, si surge algun error retorna un numero diferente a 0.
			 * @param {Object} res    - Contiene el resultado de la respuesta obtenida por el servidor.
			 */
			let cb = function( coderr, res ) {
				res.code = coderr
				if ( coderr == 0 ) {
					resolve( res )
				} else {
					/*
					Genera el error a retornar

					Este cuenta con los parametros `code` y `messages`

					* **code** `number`: Numero asociado al error.
					* **messages** `String[]`: Arreglo con todos los mensajes de error obtiendos por el servidor. 
					 */
					let err = new Error( `Error request: ${res.messages}` )

					err.code = res.code
					err.messsages = res.messsages

					reject( err )
				}
			}

			this
				.io
				.emit( 'request', data, cb )
		} )
	}
}


/*
Transporter por defecto para gestionar las conecciónes con DEF
 */
class Transport {
	constructor( def ) {
		this.refs = new Map()
		this.newRef( 'auth', { url: `${def.authURL}`, room: def.room } )
		this.newRef( 'db', { url: `${def.databaseURL}`, room: def.room } )
	}

	/*
	maneja entre refernecias de conección.
	 */
	newRef( name, { url, room } ) {
		if ( this.refs.has( name ) === false ) {
			let urlRef = url + room.split( "" ).map( ( e, i ) => i == 0 && e == '/' ? '' : e ).join( "" )
			console.log( urlRef )
			this.refs.set( name, new refIO( def, urlRef ) )
		}
	}

	/*
	Obitne una referencia de conneción
	 */
	ref( name ) {
		return this.refs.get( name )
	}
}

export default Transport
