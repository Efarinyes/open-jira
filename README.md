# Next.js OpenJira App

Per executar en local, necessitem la base de dades
```
docker-compose up -d 
```
* el menys d, significa __deatached__

* MongoDB url local
```
mongodb://localhost:27017/entriesdb
```
## Configurar les variables d'entorn 
Renombrar l'arxiu __.env.template__ a __.env__

## Omplir la base de dades amb registres de prova

Cridar a Postman:

```
http://localhost:3000/api/seed
```
