# Skaberen code generator extension for Visual Studio Code

[Skaberen code generator](https://marketplace.visualstudio.com/items?itemName=Skaberencodetools.skaberen-code-generator) is an extension of Visual Studio Code that allows us to **generate a base code with a graphical user interface.**

> Inspired by [Angular files](https://github.com/ivalexa/vscode-angular2-files) 
## Why this extension?

This extension will save you time:

- **Spring boot**: Generates a complete REST API, creating entities, services, repositories and controllers.
- **NgRx**: Generates actions, effects and reducers simply by indicating the name of the model.

## Requirements
- [Lombok Annotations Support for VS Code](https://marketplace.visualstudio.com/items?itemName=GabrielBB.vscode-lombok)
- [Spring Boot Extension Pack](https://marketplace.visualstudio.com/items?itemName=Pivotal.vscode-boot-dev-pack)

## Getting started
### API REST with Spring boot
Right-click on the **main package** in the directory browser, then select "Skaberen Java: Generate base code"

**NOTE: The path of the selected directory will be taken as the main package**



![Dec-17-2020 23-17-43](https://user-images.githubusercontent.com/13028053/102566384-33165e80-40be-11eb-8228-fb5764b273b2.gif)

### What's this?

<img width="593" alt="Captura de Pantalla 2021-04-18 a la(s) 16 10 03" src="https://user-images.githubusercontent.com/13028053/115159316-93171480-a060-11eb-9db1-ff634be96872.png">

Here you can select how you want your code to be written.

If you select "NO usar clase ResultadoProc", Your code will look like this.
```java
// Controller
@GetMapping("/{id}")
public ResponseEntity<Usuario> findById(@PathVariable("id") int usuarioId)
        throws ErrorProcessingException, EntityNotFoundException {
    Usuario salida = usuarioService.findById(usuarioId);
    return new ResponseEntity<Usuario>(salida, HttpStatus.OK);
}
```
```java
// Service
@Override
  public Usuario findById(final int usuarioId) throws ErrorProcessingException, EntityNotFoundException {
    try {
      return this.usuarioRepository.findById(usuarioId).orElseThrow(() -> new EntityNotFoundException());
    } catch (final EntityNotFoundException e) {
      throw new EntityNotFoundException();
    } catch (final Exception e) {
      throw new ErrorProcessingException();
    }
  }
```
The response will look like this
```json
// Status: 200 OK
{
    "rut": "12345678-0",
    "nombre": "Ismael Alexander",
    "apellido": "Cuevas",
    "email": "ismael.c.26a@gmail.com"
}
```
```json
// Status: 404 Not found
{
    "status": 404,
    "timestamp": "2021-04-18T16:37:08.819-04:00",
    "error": "NOT_FOUND",
    "message": "El registro solicitado no existe",
    "path": "uri=/api/usuario/12345678-9"
}
```


but if you select "Usar clase ResultadoProc", Your code will look like this.

```java
// Controller
@GetMapping("/{id}")
public ResponseEntity<ResultadoProc<Usuario>> findById(@PathVariable("id") int usuarioId) {
    ResultadoProc<Usuario> salida = usuarioService.findById(usuarioId);
    return new ResponseEntity<ResultadoProc<Usuario>>(salida, HttpStatus.OK);
}
```
```java
// Service
@Override
  public ResultadoProc<Usuario> findById(final int usuarioId) {
    final ResultadoProc.Builder<Usuario> salida = new ResultadoProc.Builder<Usuario>();
    try {
      final Usuario usuario = this.usuarioRepository.findById(usuarioId).orElse(null);
      if (usuario == null) {
        salida.fallo("Usuario no se encontrado");
      }
      salida.exitoso(usuario);
    } catch (final Exception e) {
      Util.printError("findById(" + usuarioId + ")", e);
      salida.fallo("Se produjo un error inesperado al intentar obtener usuario");
    }
    return salida.build();
  }
```
The response will look like this
```json
// Status: 200 OK
{
    "error": "false",
    "mensaje": "",
    "resultado": {
        "rut": "12345678-0",
        "nombre": "Ismael Alexander",
        "apellido": "Cuevas",
        "email": "ismael.c.26a@gmail.com"
    }
}
```
```json
// Status: 404 Not found
{
    "error": "true",
    "mensaje": "Usuario no se encontrado",
    "resultado": null
}
```



---
## Result - Use ResultProc class

![Dec-17-2020 23-34-00](https://user-images.githubusercontent.com/13028053/102567497-62c66600-40c0-11eb-8d99-558c239cdf3b.gif)

---
