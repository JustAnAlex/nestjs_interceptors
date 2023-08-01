
NESTJS + FASTIFY

curl --location 'http://localhost:3000/api?junk=raw' \
--header 'junk: raw' \
--header 'Content-Type: application/json' \
--data '{"junk": "raw"}'

body, query, headers
class, property, meythod
midleware, interceptor, guard, pipe, filters, decorator
req, res

midleware
  - глобально связанное промежуточное ПО app.use
  - промежуточное ПО с привязкой к модулям (по факту для тех же контроллеров, только настраивается в модулях)

interceptor
  - глобальный
  - на контроллер
  - на метод контроллера

guard
  - глобальный
  - на контроллер
  - на метод контроллера

pipe
  - глобальный
  - на контроллер
  - на метод контроллера
  - on @Body @Query parameters

filters
  - глобальный
  - на контроллер
  - на метод контроллера


Последовательность срабатывания
body raw, 
 - GUARD GLOBAL, 
 - GUARD CONTROLLER, 
 - GUARD CONTROLLER METHOD, 
 - INTERCEPTOR GLOBAL, 
 - INTERCEPTOR CONTROLLER, 
 - INTERCEPTOR CONTROLLER METHOD, 
 - PIPE GLOBAL, 
 - PIPE CONTROLLER, 
 - PIPE CONTROLLER METHOD, 
 - PIPE CONTROLLER PARAMETER

query raw, 
  - MIDLEWARE GLOBAL, 
  - MIDLEWARE MODULE, 
  - GUARD GLOBAL, 
  - GUARD CONTROLLER, 
  - GUARD CONTROLLER METHOD, 
  - INTERCEPTOR GLOBAL, 
  - INTERCEPTOR CONTROLLER, 
  - INTERCEPTOR CONTROLLER METHOD, 
  - PIPE GLOBAL, 
  - PIPE CONTROLLER, 
  - PIPE CONTROLLER METHOD, 
  - PIPE CONTROLLER PARAMETER

headers raw, 
  - MIDLEWARE GLOBAL, 
  - MIDLEWARE MODULE, 
  - GUARD GLOBAL, 
  - GUARD CONTROLLER, 
  - GUARD CONTROLLER METHOD, 
  - INTERCEPTOR GLOBAL, 
  - INTERCEPTOR CONTROLLER, 
  - INTERCEPTOR CONTROLLER METHOD