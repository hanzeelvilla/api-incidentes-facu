# API para administrar accidentes en la facultad

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