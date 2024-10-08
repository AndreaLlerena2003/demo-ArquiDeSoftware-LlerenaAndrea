# Arquitectura de Microservicios en Kubernetes

## Introducción

Este proyecto ilustra una arquitectura basada en microservicios, implementada en un entorno de Kubernetes. Los microservicios son un enfoque arquitectónico que permite desarrollar aplicaciones como un conjunto de servicios pequeños, autónomos y desplegables de manera independiente. Este enfoque mejora la escalabilidad, la mantenibilidad y la agilidad del desarrollo.

## ¿Qué son los Microservicios?

Los **microservicios** son un estilo arquitectónico que descompone una aplicación en componentes pequeños y manejables. Cada microservicio es responsable de una funcionalidad específica y se comunica con otros microservicios a través de API bien definidas. Esto permite a los equipos trabajar de manera independiente en diferentes partes de la aplicación, facilitando el desarrollo, las pruebas y la implementación.

### Ventajas de los Microservicios:

- **Escalabilidad**: Los servicios pueden escalarse de forma independiente según la demanda.
- **Desarrollo ágil**: Los equipos pueden desarrollar y desplegar servicios sin afectar al resto de la aplicación.
- **Resiliencia**: Si un servicio falla, el resto de la aplicación puede seguir funcionando.
- **Flexibilidad tecnológica**: Cada microservicio puede utilizar diferentes tecnologías y lenguajes según las necesidades.
- **Cambios sin afectar otra parte del negocio**
- **Mantenimiento más fácil**
- **Aislamiento de servicios**
  
### Desventajas de los Microservicios:

- **Mayor complejidad**: como los microservicios son distribuidos, gestionar la comunicación sobre los servicios puede resultar difícil. Puede que los desarrolladores tengan que escribir código adicional para garantizar una comunicación fluida entre los módulos.
- **Dificultades de implementación y control de versiones**: coordinar las implementaciones y gestionar el control de versiones en varios servicios puede resultar complejo y provocar incidencias de compatibilidad.
- **Complejidad de las pruebas**: las pruebas de microservicios implican situaciones complejas, sobre todo cuando se realizan pruebas de integración en diferentes servicios. Organizar esta tarea puede ser complicado.
- **Dificultades con la depuración**: puede resultar difícil depurar una aplicación que contiene varios microservicios, cada uno con su propio conjunto de registros. Un único proceso empresarial puede ejecutarse en varias máquinas simultáneamente, lo que agrava la complejidad.
- **Dificultades en la gestión de datos**: la coherencia de los datos y las transacciones entre varios servicios puede resultar compleja. En la arquitectura de microservicios, la gestión y la coordinación de los datos debe hacerse de forma cuidadosa para proteger la integridad de los datos.
- **Dificultad al estandarizar**


## ¿Qué son los Monolitos?

Los **monolitos** son un estilo arquitectónico en el cual una aplicación completa se construye como una única unidad cohesiva. Todas las funciones de la aplicación se ejecutan en un mismo proceso y cualquier cambio requiere desplegar toda la aplicación nuevamente.

### Ventajas de los Microservicios:

- **Menor repitición de código**
- **End to End Test**
- **Deployment rapidos**
- **Facilidad para controlar versiones:** Sólo hay una versión del sistema a la que se le hacen cambios, lo que facilita el control de versiones y el despliegue.
- **Rendimiento consistente:** Como todos los componentes se ejecutan en un mismo proceso, no se requiere comunicación a través de la red, lo que puede mejorar el rendimiento.
  
### Desventajas de los Microservicios:

- **Escalabilidad limitada:** A medida que la aplicación crece, puede volverse difícil escalarla. Escalar un monolito implica replicar toda la aplicación en lugar de escalar solo partes específicas.
Falta de flexibilidad tecnológica: Dado que todos los componentes están juntos, toda la aplicación debe estar desarrollada con las mismas tecnologías, lo que limita la capacidad de utilizar diferentes herramientas o lenguajes para diferentes partes.
- **Despliegue más complicado:** Cualquier cambio, por pequeño que sea, requiere volver a desplegar toda la aplicación, lo que puede aumentar el tiempo de inactividad y el riesgo de errores.
- **Mantenimiento difícil con el crecimiento:** A medida que la aplicación crece en tamaño y complejidad, se vuelve más difícil mantener el código, realizar actualizaciones y corregir errores sin afectar otras partes del sistema.
- **Dependencias fuertes entre componentes:** Los componentes dentro de un monolito tienden a tener dependencias estrechas, lo que dificulta la implementación de nuevas características o cambios sin romper otras partes del sistema.

![image](https://github.com/user-attachments/assets/6b6f2494-427a-4f63-8beb-3409580a2e6c)

## ¿Cuando escoger qué?
La elección entre una arquitectura monolítica y una de microservicios depende de varios factores, como la escala del proyecto, la complejidad del sistema y el equipo de desarrollo. Aquí te doy un ejemplo de cuándo elegir cada una y las razones detrás de esa decisión:
![image](https://github.com/user-attachments/assets/cc42ffc2-5e46-4f08-b610-7a5f426e27ed)

![image](https://github.com/user-attachments/assets/0a05d8a9-0f2d-4ddb-a7bf-96b57a2eb426)

### Combinaciones que llevan a monolito

1.- Pequeña Escala + Simplicidad + Equipo Pequeño + No Escalabilidad Independiente + No Resiliencia Alta + Latencia baja preocupación.
(Sistema pequeño, simple, sin necesidad de escalar ni alta resiliencia, con llamadas locales rápidas).

2.- Pequeña Escala + Simplicidad + Equipo Pequeño + No Escalabilidad Independiente + Resiliencia Alta + Latencia baja preocupación.
(Sistema pequeño y simple, pero con alta resiliencia, y latencia interna baja por la comunicación local).

3.- Pequeña Escala + Simplicidad + Equipo Grande + No Escalabilidad Independiente + No Resiliencia Alta + Latencia baja preocupación.
(El equipo es grande, pero el sistema sigue siendo pequeño y simple, con baja latencia debido a la ausencia de comunicación distribuida).

4.- Pequeña Escala + Complejidad Alta + Equipo Pequeño + No Escalabilidad Independiente + No Resiliencia Alta + Latencia baja preocupación.
(Aunque el sistema es complejo, el equipo es pequeño, no requiere escalabilidad ni resiliencia, y mantiene baja latencia local).

**ESCENARIO DE MICROSERVICIOS**
![image](https://github.com/user-attachments/assets/4a5becc7-9243-495c-8d96-bb4fca050f47)

![image](https://github.com/user-attachments/assets/a801de09-883b-4d1c-961f-25ed974914c2)

### Combinaciones que llevan a microservicios
1.- Gran Escala + Complejidad Alta + Equipo Grande + Escalabilidad Independiente + Resiliencia Alta 
(Sistema grande y complejo, con equipos grandes, donde es crítico escalar partes del sistema y se requiere alta resiliencia).

2.- Gran Escala + Complejidad Alta + Equipo Grande + Escalabilidad Independiente + No Resiliencia Alta.
(El sistema es grande y complejo, se necesita escalabilidad independiente, pero la resiliencia no es crítica).

3.- Gran Escala + Complejidad Alta + Equipo Pequeño + Escalabilidad Independiente + Resiliencia Alta .
(El equipo es pequeño, pero el sistema es grande y requiere escalabilidad, resiliencia.).

4.- Gran Escala + Complejidad Alta + Equipo Pequeño + Escalabilidad Independiente + No Resiliencia Alta .
(El sistema es grande y requiere escalabilidad independiente, pero la resiliencia.).

5.- Gran Escala + Complejidad Alta + Equipo Grande + Escalabilidad Independiente + Resiliencia Alta
(Sistema grande y complejo, con necesidad de escalabilidad y resiliencia).


## ¿Qué es Kubernetes?

Kubernetes (abreviado como K8s) es una plataforma de código abierto diseñada para automatizar el despliegue, la escalabilidad y la gestión de aplicaciones en contenedores. Los contenedores permiten empaquetar aplicaciones con todas sus dependencias, lo que facilita su portabilidad y ejecución en diferentes entornos. Sin embargo, gestionar múltiples contenedores y garantizar que funcionen correctamente en grandes entornos distribuidos puede ser complejo.

Ahí es donde entra Kubernetes: orquesta estos contenedores de manera que pueda asegurarse de que siempre estén disponibles, correctamente distribuidos en los recursos de hardware, y que se ajusten automáticamente a la demanda. Kubernetes maneja tareas como balanceo de carga, escalado automático, recuperación ante fallos y despliegues continuos, permitiendo a los equipos de desarrollo enfocarse en escribir código sin preocuparse por la infraestructura subyacente.

### Características Clave de Kubernetes:

- **Orquestación**: Gestiona la implementación y la comunicación entre contenedores.
- **Escalabilidad**: Escala automáticamente los microservicios según la carga.
- **Balanceo de Carga**: Distribuye el tráfico entre los diferentes contenedores.
- **Recuperación ante Fallos**: Reinicia automáticamente los contenedores fallidos y reemplaza los nodos defectuosos.

## KUBERNETES VS DOCKER SWAM
Al elegir una plataforma de orquestación, se deben considerar aspectos como escalabilidad, facilidad de uso, complejidad, soporte de la comunidad y capacidades de integración.

### Análisis de Alternativas

1. **Facilidad de Uso**
   - **Kubernetes**: Tiene una curva de aprendizaje más empinada debido a su complejidad, pero permite una personalización detallada y potente.
   - **Docker Swarm**: Es más fácil de aprender y usar, ideal para despliegues rápidos y sencillos.

2. **Escalabilidad**
   - **Kubernetes**: Diseñado para aplicaciones complejas y de gran escala. Es ideal para ambientes en la nube y soporta múltiples nodos y cargas de trabajo de alta disponibilidad.
   - **Docker Swarm**: Aunque es más fácil de configurar, no escala tan eficientemente como Kubernetes en aplicaciones complejas o distribuidas a gran escala.

3. **Comunidad y Soporte**
   - **Kubernetes**: Respaldado por una comunidad vasta y activa, con una gran cantidad de recursos, foros y documentación.
   - **Docker Swarm**: Aunque cuenta con una comunidad activa, es menos popular que Kubernetes, y su adopción ha disminuido en favor de este último.

4. **Flexibilidad y Personalización**
   - **Kubernetes**: Ofrece una mayor flexibilidad con opciones avanzadas de configuración, integraciones, y manejo de redes. Permite adaptar cada aspecto del ciclo de vida de los contenedores.
   - **Docker Swarm**: Tiene menos opciones de personalización, pero eso lo hace más simple y fácil de manejar para casos de uso menos complejos.

5. **Desempeño**
   - **Kubernetes**: Tiende a ser más pesado debido a su complejidad y número de componentes. Sin embargo, está optimizado para entornos a gran escala.
   - **Docker Swarm**: Más rápido y ligero en implementaciones pequeñas o medianas.

6. **Integración y Ecosistema**
   - **Kubernetes**: Se integra fácilmente con proveedores de la nube, herramientas de monitoreo, almacenamiento y seguridad.
   - **Docker Swarm**: Se integra bien dentro del ecosistema Docker, pero ofrece menos soporte para herramientas externas y complementos de terceros.

### Conclusión
- **Kubernetes** es la mejor opción para proyectos grandes y complejos, donde la escalabilidad y la flexibilidad son cruciales. Es la elección para organizaciones que buscan soluciones a largo plazo y alta disponibilidad.
- **Docker Swarm** es ideal para proyectos pequeños o medianos que requieren una implementación rápida y sencilla. Es perfecto para desarrolladores que ya utilizan Docker y necesitan una solución de orquestación sin complicaciones.

### Recomendación
Si el objetivo es soportar aplicaciones a gran escala con alta disponibilidad, Kubernetes es la opción recomendada. Para proyectos que priorizan la simplicidad y un ciclo de desarrollo rápido, Docker Swarm puede ser más adecuado.
  
