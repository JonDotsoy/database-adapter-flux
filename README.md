# Database Adapter FLUX
Un adaptador para el control de flujo de datos virtual inspirado en [Firebase].





## Usage

### instalación

```bash
npm i --save database-adapter-flux
```

### Configuración

```javascript
import def from 'database-adapter-flux/client'

def.initialize( {
	apiKey,      // API key para el servición del servidor
	authURL,     // Url para la identificación
	databaseURL, // Url de la base de datos
	silent,      // Muestra o oculta los logs de ref
	clientId,    // id del usuario.
	room,        // Nombre de la sala para conectase con la definición Por defecto es `/def`
} )
```


## API Cliente

### Transportador `[Transport] def.transport()`
El transportador es un colección de definiciones de conexión permitiendo tener a disposición múltiples definiciones de conexiones que se usaran para comunicarse con el servidor.

#### Nueva definición `def.transport().newRef( name, { url, room } )`

**Parametros**:
 
 * **name** `String`: Contiene el nombre asociado a la nueva conexión. (:warning: esta definición se creara solo si no existe previamente)
 * **Opcines** `Object`: Configuraciones de la definición.
    * **url** `String`: Contiene la [URL] usada para conectarse con el servicio.
    * **room** `String`: Sala a la que se conectara el servicio. 


### Autentificación de usuario `[Object] def.auth().currentUser`
Contiene los datos de los usuarios a controlar.

```javascript
let user = def.auth().currentUser

if (user) {
	// Esta la session iniciada
} else {
	// No esta la session iniciada
}
```


### Autentificación con email `[Promise] def.auth().signInWithEmail( <email> )`
Permite enviar una email al servidor para realizar una autentificación enviando una link al email.

| Parámetro | Descripción |
| --------- | ----------- |
| email | Dirección de email para autentificar. |


```javascript
def.auth().signInWithEmail( "a@a.com" )
.then(function () {
	// Se ha enviado el email
})
.catch(function ({ code, messages }) {
	// No se ha enviado el email
})
```

#### Código de errors

| Código | Definición |
| ------ | ---------- |
| 0 | sin Errores durante la ejecución |
| 1 | El email no es valido |
| 2 | error no identificado algo salido mal durante su ejecución |


## API Server (Uso Manul)
Por defecto para para crear la entrada en el servidor. _Utilizando [Socket.Io]_

```javascript
io.of('/def').on('connection', function (socket) {
	// Abre la conección con def en el cliente.
})
```

### Authentificación con Email
Recibe el email para realizar la identificación con el correo electrónico.


```javascript
socket.on('request', function (data, cb) {
	if ( data.action == 'signInWithEmail') {
		var email = data.email
		// Se solicita una autentificación con email
		// 
		// cb(0, 'Sin Error')
		// 
		// cb(<1-1000>, 'Ha surgido un error')
	}
})
```


## API Server

```javascript
import defs from 'database-adapter-flux/server'
```

### Scope

El `scope` es una variable que contiene todas las configuraciones de la sentencia actual del cliente.

```javascript
defs.use('blabla', function (scope, data){
})
```

#### Opciones

 * **scope** `Object`: Variable con todas las configuraciones del cliente.
    * **socket** [`Socket`](http://socket.io/docs/server-api/#socket): Socket actual conectado con el navegador cliente.
    * **initialized** `Boolean`: Es un indicador que define si se han iniciado las configuraciones con el cliente.
    * **header** `Object`: Datos obtenidos desde el usuario, usados para almacenar la conexión existente.
        * **X-Def-Version** `String`: Contiene la versión del cliente.
        * **Api-key** `String`: Contiene la key api del cliente.
        * **Session-Data** `Object`: Contiene los datos de session obtenidos por el cliente.
 * **data** `Object`: Son los datos utilizados por la instancia enviada al servidor.


[Firebase]: https://firebase.google.com/
[Socket.Io]: http://socket.io/
[URL]: https://en.wikipedia.org/wiki/Uniform_Resource_Locator#Syntax