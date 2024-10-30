# API para administrar accidentes en la facultad

## Requsitios

* Node.js
* MySQL 

## Configuración

1. Instalar dependencias
```
npm i
```

2. Crear un archivo .env
```
DATABASE_URL="mysql://username:password@host:port/database_name"
```
> [!NOTE]
> El puerto default de MySQL es 3306


3. Crear la BD
```
npx prisma db pull
```

SQL usado para la BD
```
drop database incidentes;
create database incidentes;
use incidentes;
create table incidentes (
    id int auto_increment primary key, 
    tipo varchar(255) not null, 
    descripcion text, 
    ubicacion varchar(255) not null, 
    fecha datetime default current_timestamp, 
    fotoName varchar(255) not null, 
    fotoUrl text, 
    prioridad varchar(255)
);
describe incidentes;
```

## ENDPOINTS    

**GET** '/': Entry point principal del servidor **NO DE LA API**
**GET** '/: api/incidentes/' Pro

## Probar los endpoints con REST Client en VS Code

Si no tienes instalado REST Client: 
1. Abre VS Code
2. Ve a las extensiones dando clic en el ícono de extensiones o en presionando *CTRL+SHIFT+X*
3. Busca REST Client y da clic en instalar

* Dentro de **api.http** da clic en **Send Request** que aparece arriba de cada endpoint