---
layout: './_layout/MarkdownPostLayout.astro'

title: Librerías de mocking para C# .NET
publicationDate: "2023-11-16"
author: "Mario S. Pinto Miranda"
image: 
  url: /posts-covers/librerias-mocks-csharp.webp
  alt: "Librerías de mocking para C# .NET"
tags: ["Mocking", "Csharp", "Testing"]
description: "Una guía rápida sobre las librerías para mocking más populares para C# .NET. para que puedas elegir la que mejor se adapte a tus necesidades."
---

La importancia de aprender a usar mocks durante el desarrollo de software radica
esencialmente en dos direcciones: velocidad del feedback y validar las
interacciones entre los objetos para lograr objetivos específicos. De esto escribí este
<a href="https://leanmind.es/es/blog/los-mocks-escritos-son-una-herramienta-de-diseno-de-software/" target="_blank">post blog</a>
con más detalles sobre por qué los mocks son una herramienta
de diseño de software cuando estamos desarrollando con el paradigma de
orientación a objetos. En este post veremos cómo trabajar con mocks en C# .NET.

Disclaimer: No voy a seguir convenciones de .NET

## Librerías

Hay varias librerías disponibles. Vamos a ver cada una brevemente y también para
hacer una comparativa práctica vamos a ponernos en la situación de que queremos
registrar un usuario en nuestra aplicación y esto implica guardar su
información en repositorio. En definitiva, vamos a desarrollar este caso de uso,
para ellos tenemos la siguiente interfaz:

```csharp
public interface UserRepository
{
    void SaveUser(User user);
}
```

### [Moq](https://github.com/devlooped/moq)

Características:

- **Sintaxis Expressiva**: Moq ofrece una sintaxis expresiva y fácil de usar para configurar el comportamiento de los mocks. Aprovecha esta característica para configurar los mocks de manera clara y concisa en tus pruebas.
- **Configuración de Comportamiento**: Puedes configurar mocks para devolver valores específicos, lanzar excepciones o realizar acciones personalizadas cuando se llaman a métodos o propiedades en los mocks.
- **Verificación de Llamadas**: Moq permite verificar si se han llamado a métodos específicos en tus mocks con los argumentos correctos y el número de veces esperado. Esto es útil para verificar que las interacciones con las dependencias sean las esperadas.
- **Amplia Adopción**: Moq es ampliamente adoptado en la comunidad .NET y tiene una gran base de usuarios. Esto significa que puedes encontrar abundante documentación y ejemplos en línea.
- **Integración con Marcos de Pruebas Unitarias**: Moq se integra fácilmente con marcos de pruebas unitarias populares como NUnit, MSTest y xUnit, lo que facilita la incorporación de pruebas unitarias en tu proyecto.

Limitaciones:

- **Solo para Interfaces y Clases Virtuales/Metódos Virtuales**: Moq es ideal para crear mocks de interfaces y clases con métodos virtuales. No es adecuado para clases concretas o métodos no virtuales, a menos que utilices una biblioteca adicional como Castle Windsor para interceptar llamadas a métodos no virtuales.
- **Límites en la Configuración de Métodos Estáticos y Finales**: Moq no puede utilizarse para crear mocks de métodos estáticos ni para métodos finales (sealed) debido a las limitaciones de la plataforma .NET.
- **Configuración de Métodos Estáticos y No Virtuales en Clases Concretas**: Moq no puede configurar directamente métodos estáticos o no virtuales en clases concretas. Puedes considerar utilizar bibliotecas como Typemock Isolator o Microsoft Fakes si necesitas trabajar con estas limitaciones.
- **Desafíos con Dependencias Externas y Librerías Externas**: Cuando trabajas con bibliotecas externas que no están diseñadas para ser mockeadas, puede ser complicado utilizar Moq. En tales casos, es posible que necesites aplicar técnicas de inyección de dependencias o crear adaptadores para facilitar las pruebas unitarias.

En general, Moq es una herramienta poderosa y ampliamente utilizada para crear mocks en .NET, pero es importante tener en cuenta sus limitaciones y usarla adecuadamente según el contexto de tu proyecto y las necesidades de tus pruebas unitarias.

Ejemplo sobre el caso de uso:

```csharp
using Moq;
using Xunit;

public class RegisterUserShould
{
    [Fact]
    public void saveValidUser()
    {
        // Arrange
        var userRepositoryMock = new Mock<UserRepository>();
        var registerUser = new RegisterUser(userRepositoryMock.Object);
        var userToRegister = new User { /* User data */ };

        // Act
        registerUser.execute(userToRegister);

        // Assert
        userRepositoryMock.Verify(repo => repo.SaveUser(It.IsAny<User>()), Times.Once);
    }
}
```

### [NSubstitute](https://nsubstitute.github.io/)

Características:

- **Sintaxis Simple**: NSubstitute se caracteriza por su sintaxis simple y legible, lo que facilita la configuración de mocks y la escritura de pruebas claras.
- **Auto-Configuración de Mocks**: NSubstitute puede configurar automáticamente mocks para devolver valores predeterminados, lo que ahorra tiempo en la configuración.
- **Integración con Marcos de Pruebas Unitarias**: Se integra bien con marcos de pruebas unitarias populares como NUnit, MSTest y xUnit.

Limitaciones:

- **Limitado a Mocks de Interfaces y Clases Virtuales/Métodos Virtuales**: Al igual que Moq, NSubstitute es más adecuado para crear mocks de interfaces y clases con métodos virtuales. No es ideal para clases concretas o métodos no virtuales sin el uso de bibliotecas adicionales.
- **Desafíos con Dependencias Externas y Librerías Externas**: Como con otras bibliotecas de mocking, puede haber desafíos al trabajar con bibliotecas externas que no están diseñadas para ser mockeadas.

Ejemplo sobre el caso de uso:

```csharp
using NSubstitute;
using Xunit;

public class RegisterUserShould
{
    [Fact]
    public void saveValidUser()
    {
        // Arrange
        var userRepositoryMock = Substitute.For<UserRepository>();
        var registerUser = new RegisterUser(userRepositoryMock);
        var userToRegister = new User { /* User data */ };

        // Act
        registerUser.execute(userToRegister);

        // Assert
        userRepositoryMock.Received(1).SaveUser(Arg.Any<User>());
    }
}
```

### [Rhino Mocks](https://hibernatingrhinos.com/oss/rhino-mocks)

Características:

- **Amplio Conjunto de Características**: Rhino Mocks ofrece un conjunto completo de características para configurar mocks y verificar llamadas, lo que puede ser útil en escenarios complejos de pruebas.
- **Historial de Uso**: Rhino Mocks permite llevar un historial de las llamadas realizadas a los mocks para una verificación detallada.

Limitaciones:

- **Sintaxis Menos Intuitiva**: Algunos desarrolladores encuentran que la sintaxis de Rhino Mocks es menos intuitiva en comparación con Moq o NSubstitute, lo que puede requerir un tiempo adicional para aprender y utilizar eficazmente la biblioteca.
- **Requiere Métodos Virtuales o Interfaces**: Rhino Mocks funciona mejor con clases que tienen métodos virtuales o interfaces. Puede ser complicado mockear métodos no virtuales o clases concretas.

Ejemplo sobre el caso de uso:

```csharp
using Rhino.Mocks;
using Xunit;

public class RegisterUserShould
{
    [Fact]
    public void saveValidUser()
    {
        // Arrange
        var userRepositoryMock = MockRepository.GenerateMock<UserRepository>();
        var registerUser = new RegisterUser(userRepositoryMock);
        var userToRegister = new User { /* User Data */ };

        // Act
        registerUser.execute(userToRegister);

        // Assert
        userRepositoryMock.AssertWasCalled(repo => repo.SaveUser(Arg<User>.Is.Anything), opt => opt.Repeat.Once());
    }
}
```

### [FakeItEasy](https://fakeiteasy.github.io/)

Características:

- **Sintaxis Fácil de Usar y Fluida**: FakeItEasy se destaca por su sintaxis fácil de usar y fluida, lo que facilita la configuración de mocks y la escritura de pruebas.
- **Integración con Marcos de Pruebas Unitarias**: Se integra bien con marcos de pruebas unitarias populares como NUnit, MSTest y xUnit.

Limitaciones:

- **Limitado a Mocks de Interfaces y Clases Virtuales/Métodos Virtuales**: Al igual que Moq y NSubstitute, FakeItEasy es más adecuado para crear mocks de interfaces y clases con métodos virtuales.
- **Desafíos con Dependencias Externas y Librerías Externas**: Pueden surgir desafíos al trabajar con bibliotecas externas que no están diseñadas para ser mockeadas.
- **Menos Características Avanzadas**: Si bien FakeItEasy es fácil de usar, puede carecer de algunas de las características más avanzadas que ofrecen bibliotecas como Moq o Rhino Mocks.

Ejemplo sobre el caso de uso:

```csharp
using FakeItEasy;
using Xunit;

public class RegisterUserShould
{
    [Fact]
    public void saveValidUser()
    {
        // Arrange
        var userRepositoryMock = A.Fake<UserRepository>();
        var registerUser = new RegisterUser(userRepositoryMock);
        var userToRegister = new User { /* User Data */ };

        // Act
        registerUser.execute(userToRegister);

        // Assert
        A.CallTo(() => userRepositoryMock.SaveUser(A<User>.Ignored)).MustHaveHappenedOnceExactly();
    }
}
```

### Xunit.Mocks

Xunit.Mocks es una extensión de [xUnit.NET](http://xunit.net/) y no una biblioteca de mocking independiente. Su uso se limita a proyectos que ya utilizan [xUnit.NET](http://xunit.net/) como marco de pruebas unitarias.

Ejemplo sobre el caso de uso:

```csharp
using Xunit;
using Xunit.Mocks;

public class RegisterUserShould
{
    [Fact]
    public void saveValidUser()
    {
        // Arrange
        var userRepositoryMock = new Mock<UserRepository>();
        var registerUser = new RegisterUser(userRepositoryMock.Object);
        var userToRegister = new User { /* User Data */ };

        // Act
        registerUser.execute(userToRegister);

        // Assert
        userRepositoryMock.Verify(repo => repo.SaveUser(It.IsAny<User>()), Times.Once);
    }
}
```

### [Castle Windsor](https://www.castleproject.org/projects/windsor/)

Características:

- **Contenedor de Inversión de Control (IoC)**: Castle Windsor es principalmente un contenedor de IoC que facilita la resolución de dependencias en tu aplicación. Puedes usarlo para crear y administrar instancias de objetos y configurar la inyección de dependencias en tu proyecto.
- **Integración con Mocking**: Si bien Castle Windsor no es una biblioteca de mocking en sí misma, puedes utilizarla en combinación con bibliotecas de mocking como Rhino Mocks o Moq para crear mocks de tus dependencias y registrarlos en el contenedor de Windsor.
- **Configuración de Componentes**: Castle Windsor te permite registrar componentes y configurar cómo se resuelven y se inyectan las dependencias en tu aplicación. Esto es útil para definir cómo se deben crear los mocks y cómo se deben inyectar en las clases bajo prueba.
- **Control de Ciclo de Vida**: Puedes especificar el ciclo de vida de los componentes registrados, como Singleton, Transient o Scoped, según tus necesidades.

Limitaciones:

- **No es una Biblioteca de Mocking Independiente**: Castle Windsor no es una biblioteca de mocking en sí misma, por lo que necesitas utilizarla junto con otra biblioteca de mocking, como Rhino Mocks, Moq o FakeItEasy, para crear mocks de tus dependencias.
- **Limitado a Objetos Registrados**: Castle Windsor se centra en la resolución de dependencias de objetos que se han registrado en el contenedor. Si deseas crear mocks para objetos que no están registrados en Windsor, debes utilizar una biblioteca de mocking independiente.
- **Configuración Adicional Requerida**: Configurar Castle Windsor para trabajar con mocks puede requerir cierta configuración adicional y un entendimiento de cómo se integra con la biblioteca de mocking que elijas.

Ejemplo sobre el caso de uso:

```csharp
using Castle.MicroKernel.Registration;
using Castle.Windsor;
using Xunit;

public class RegisterUserShould
{
    [Fact]
    public void saveValidUser()
    {
        // Arrange
        var container = new WindsorContainer();
        var userRepositoryMock = container.Register(Component.For<UserRepository>().Instance(MockRepository.GenerateMock<IUserRepository>()));
        var registerUser = new RegisterUser(container.Resolve<UserRepository>());
        var userToRegister = new User { /* User Data */ };

        // Act
        registerUser.execute(userToRegister);

        // Assert
        userRepositoryMock.Verify(repo => repo.SaveUser(Arg<User>.Is.Anything), opt => opt.Repeat.Once());
    }
}
```

## Comparativa

### Facilidad de Uso
Moq: Se destaca por su sintaxis sencilla y su enfoque en LINQ.
NSubstitute: Tiene una sintaxis muy intuitiva y es fácil de aprender.
Rhino Mocks: Aunque poderoso, puede resultar más complejo para los principiantes.
FakeItEasy: Diseñado para ser fácil de usar, con un enfoque en la simplicidad.
Castle Windsor: Más conocido como un contenedor de inyección de dependencias, pero también ofrece capacidades de simulación.

### Funcionalidades
Moq y NSubstitute: Ambos ofrecen una amplia gama de funcionalidades para cubrir la mayoría de las necesidades de simulación.
Rhino Mocks: Proporciona características avanzadas pero su desarrollo ha sido menos activo recientemente.
FakeItEasy: Ofrece un buen equilibrio entre funcionalidades y simplicidad.
Castle Windsor: Su enfoque principal no está en la simulación, por lo que puede carecer de algunas funcionalidades específicas.

### Comunidad y Soporte
Moq y NSubstitute: Tienen comunidades activas y un buen nivel de soporte.
Rhino Mocks: Menos actividad reciente en la comunidad y en el desarrollo.
FakeItEasy: Comunidad en crecimiento y buen soporte.
Castle Windsor: Fuerte comunidad centrada principalmente en la inyección de dependencias.

### Rendimiento
Las diferencias de rendimiento pueden ser mínimas para la mayoría de las aplicaciones, pero Moq y NSubstitute generalmente se consideran muy eficientes.

## Conclusiones
Moq y NSubstitute son excelentes opciones generales, equilibrando facilidad de uso y funcionalidades.
Rhino Mocks puede ser una buena opción para casos de uso específicos o para aquellos familiarizados con su sintaxis.
FakeItEasy es ideal para quienes buscan simplicidad y facilidad de uso.
Castle Windsor es preferible si también se necesita un contenedor de inyección de dependencias robusto, aunque puede no ser la mejor opción para la simulación exclusiva.
Cada una de estas bibliotecas tiene sus fortalezas, y la elección depende en gran medida de las necesidades específicas del proyecto y la familiaridad del equipo con la biblioteca.