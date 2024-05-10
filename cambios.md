

# Cambios a realizar  

## Vista Servicios  

- En el listado solo retorname lo que se vizualiza en el listado (HOTEL) -> Seria lo mismo para (REST| TOURS)
```
{
    "id": "bfa2cb28-9b96-4df6-865f-7c4b73faadde",
    "nombre": "habitacion 2",
    "tipoMoneda": "sol",
    "precio": 158,
    "disponible": true,
    "descripcion": "habitacion 2",
    "personas": 2,
    "camas": 2,
    "tipo": "",
    "fotos": {
        "gallery": [],
        "principal": "https://quemoda.es/wp-content/uploads/2021/03/cama-recortada.jpg"
    },
    "hotel": {
        "nombre": "Hotel Plaza Chacas",
        "estrellas": 3,
        "name_route": "hotel-chacas",
    }
}
```  


Ten en cuenta que al agregar las fotos en el administrador, el principal deberia estar dentro del gallery, asi que se podria reducir a un listado de objetos donde el principal siempre es el primer elemento del gallery  

## Vista Habitación View  

- Retornar los servicios de la habitación  (Listado de objetos)
https://backend.mispueblitos.info/habitacion/name_route/habitaci%C3%B3n-doble

- Retornar la Información Adicional de la Habitación (Listado de Objetos)  


## VISTA HOTEL VIEW  
- En el listado de habitaciones solo retornar la imagen principal que es la que se usa, de igual manera filtrar lo que solamente se utiliza
tal cual en el listado de servicios(filter -> )



