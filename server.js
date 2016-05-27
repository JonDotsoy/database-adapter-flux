/*
Control de para el seridor
 */

var getDate = function( ) {
	var d = arguments[0] ? arguments[0] : new Date()
	var h = d.getHours()
	var m = d.getUTCMinutes()
	var s = d.getUTCSeconds()

	return h + ":" + m + ":" + s
}


var defLOGGER = function() { console.log.apply( console, [ "[" + getDate() + "] DEF:" ].concat( arguments ) ) }


/**
 * plugin para socketio.
 */
var defs = function( socket, next ) {
	// On Connect

	/*
	Simila las respuesta que pueden tener con DEF
	 */
	socket.on( 'request', function( data, cb ) {
		var action = data.action
		defLOGGER( "requere 'request' action: " + action + " - data:", data )

		if ( action == "signInWithEmail" ) {
			var email = data.email

			defLOGGER( `requere 'signInWithEmail' email: ${email}` )

			var errs = validate.single( email, { presence: true, email: true } )

			if ( !errs ) {
				cb( 0, { messages: [] } ) // Retorna sin errores
			} else {
				defLOGGER( "request 'signInWithEmail' emails no valid", errs )
				cb( 1, { messages: errs } )
			}
		}

	} )


	next()
}





// IO.of( '/def' ).on( 'connection', function( socket ) {
// 	defLOGGER( `Open 'connection'` )

// } )



module.exports = defs
