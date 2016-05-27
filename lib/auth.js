import emitter from 'events'

/*
Control de authentificación
 */

class Auth {
	constructor( def ) {
		this.def = def
		this.emitter = new emitter()
		this.currentUser = false
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
	Envia un solicitud de sesión mediante el inicio de session utilizando el correo electronico.
	 */
	signInWithEmail( email ) {
		return this
			.def
			.transport()
			.ref( 'auth' )
			.request( {
				action: 'signInWithEmail',
				email: email,
			} )
	}
}


export default Auth
