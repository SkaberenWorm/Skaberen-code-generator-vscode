# Skaberen code generator extension for Visual Studio Code

[Skaberen code generator](https://marketplace.visualstudio.com/items?itemName=Skaberencodetools.skaberen-code-generator) es una extensión de Visual Studio Code que nos permite **generar un código base con una interfaz gráfica de usuario**.
<br><br>
## ¿Por qué esta extensión?

Esta extensión te ahorrará tiempo:

- **Spring boot**: Genera una API REST completa, creando las entidades, servicios, repositorios y controladores.
- **NgRx**: Genera acciones, efectos y reducers simplemente indicando el nombre del modelo.

<br>

## Requisitos
- Instalar extensión [Lombok Annotations Support for VS Code](https://marketplace.visualstudio.com/items?itemName=GabrielBB.vscode-lombok)

<br>

## ¿Cómo empezar?
### PASOS: API REST con Spring boot
Click derecho sobre el **package principal** en el explorador de directorios, despúes seleccione "Skaberen Java: Generate base code"

**NOTA: Se tomará como package principal la ruta del directorio seleccionado**

<img width="608" alt="Skaben Java paso 01" src="https://user-images.githubusercontent.com/13028053/99841378-d8382880-2b4c-11eb-89cb-16c58dc61c2f.png">

Indique el nombre de la entidad

<img width="608" alt="Skaberen Java paso 02" 
src="https://user-images.githubusercontent.com/13028053/99841998-d0c54f00-2b4d-11eb-9ae9-cf8a29efd969.png">

Seleccione o escriba el tipo de variable de la primary key
<img width="608" alt="Skaberen Java paso 03" 
src="https://user-images.githubusercontent.com/13028053/99841349-ca82a300-2b4c-11eb-83ef-c2d2bd7e6a55.png">

Seleccione el sexo de la clase, para la generación de comentarios
<img width="608" alt="Skaberen Java paso 04" 
src="https://user-images.githubusercontent.com/13028053/99841356-cc4c6680-2b4c-11eb-89c2-b12d40a07967.png">

Seleccione los métodos que desea agregar al código
<img width="608" alt="Skaberen Java paso 05" 
src="https://user-images.githubusercontent.com/13028053/99841360-d0788400-2b4c-11eb-86f7-23476fcc7191.png">

Debe indicar de dónde se importarán las clases de utilidad
- Usar clases locales: _Se crearán las clases dentro de una carpera llamada Utils_
- Usar repositorio UFT: _Importará las clases del repositorio de la Universidad Finis Terrae (cl.uft.commons.model.*)_ 

<img width="608" alt="Skaberen Java paso 06" src="https://user-images.githubusercontent.com/13028053/99841365-d2dade00-2b4c-11eb-8fc8-877083a62ae6.png">

<br><br>

## Resultado 

<img width="608" alt="Skaberen Java paso 07" src="https://user-images.githubusercontent.com/13028053/99841370-d5d5ce80-2b4c-11eb-8bb9-57c84df91181.png">


