<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
  </a>
</p>

# Practicando con Nestjs
### Requiere:
    + Nodejs +18v
    + Nest CLI +9v
    + Typescript +4v
    + Postgres +14v
    + ...
___
## Pasos para ejecutar en local:
___
### 1. Clonar repositorio.
___
### 2. Instalar las dependencias:
```bash
$ yarn install
```
___
### 3. Configurar variables de entorno:
+ Copiar el archiv .env.template
+ Renombrarlo a .env
+ Configurar las variables.
___
### 4. Ejecutar imagen de la DB:
- Nota: La opción "-d" es para que la imagen siga ejecutándose aunque cerremos la terminal.
```bash
$ docker-compose up -d
```
___
### 5. Ejecutar la aplicación localmente en modo desarrollo:
```bash
$ yarn start:dev
```
ó
```bash
$ nest start --watch
```

___

## Stack:
+ Nestjs
+ PostgreSQL