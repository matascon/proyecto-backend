## Proyecto 1 - Backend

**Objetivo general:**
Aplicar todos los conocimientos adquiridos en los módulos de NodeJS y Backend.

- Servidor y base de datos✅
- Montar un servidor con Express.✅
- Utilizar MongoAtlas como base de datos.✅
- Modelos de datos✅
- Crear al menos dos modelos.✅
- Uno de ellos será el modelo de usuarios, que deberá incluir un array de datos procedentes de otra colección.✅

## Creación de usuarios

- Los usuarios nuevos se crean siempre con el rol "user".✅
- El primer admin se insertará manualmente modificando el documento directamente en MongoAtlas. Podrá tener el rol “admin”.✅

## Gestión de roles

- Los administradores pueden cambiar el rol de un usuario para convertirlo en admin.✅
  **Importante: Un usuario con rol "user" no puede cambiar su propio rol ni el de otro usuario normal.**✅

## Eliminación de cuentas

- Un usuario puede eliminar su propia cuenta.✅
- Un admin puede eliminar la cuenta de cualquier usuario.✅
- Restricción: Un usuario normal no puede borrar la cuenta de otro usuario diferente al suyo.✅

## Campo de imagen

- Cada usuario debe tener un campo "image".✅
- Al crear un usuario, se enviará una imagen desde nuestro equipo.✅
- La imagen se procesará con un middleware de subida de ficheros basado en Cloudinary.✅

## Borrado de imagen

- Al eliminar la cuenta de un usuario, también se debe eliminar su imagen en Cloudinary.✅

## Integridad del array relacionado

- En el array de datos relacionados no pueden duplicarse elementos.✅
- Al añadir nuevos datos, no deben sobrescribirse los anteriores.✅

## Seeder

- Implementar una semilla (seed) que cargue un array de datos en una de las colecciones.✅

## Documentación

- Documentar el proyecto correctamente en Markdown.✅
- Recurso sugerido para aprender: https://dillinger.io/✅

## Entrega pública

- El proyecto deberá estar en un repositorio público. Para completar el proyecto tendréis que enviar un correo con el asunto “Proyecto 1 - Backend - Vuestro Nombre” a antonio.rosales@thepower.education adjuntando el repositorio.✅

## Archivo .env

- Aunque normalmente se oculta y no se sube a GitHub, para facilitar la corrección subidlo junto al resto del código (es un proyecto escolar).✅

## **Resumen de requisitos**

- Creación de 2 modelos como mínimo✅
- 1 dato relacionado como mínimo✅
- Diferentes roles de usuario con diferentes permisos + middleware Auth✅
- Subida de ficheros con Cloudinary + eliminación de archivo cuando se elimina el dato✅
- README.md con la documentación del proyecto✅
- Semilla para una de las colecciones✅
- Se evitan los duplicados en el array de los usuarios y no se pierde ningún dato✅
- CRUD completo de todas las colecciones✅
- Los roles del usuario funcionan de manera correcta como se indica en la descripción del proyecto✅
