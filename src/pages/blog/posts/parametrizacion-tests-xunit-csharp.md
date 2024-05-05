---
layout: './_layout/MarkdownPostLayout.astro'
title: "Parametrización de tests con xUnit (C#)"
pubDate: "2023-11-19"
image: 
  url: "/posts-covers/parametrizacion-xunit-csharp.webp"
  alt: "Parametrización de tests con xUnit (C#)"
author: "Mario S. Pinto Miranda"
tags: ["xUnit", "Csharp", "Testing"]
description: "En este artículo se introduce a la parametrización de tests y cómo realizarlo con xUnit en C#."
---

Recuerdo las primeras veces escribiendo tests, cuando aprendía a aplicar
Test-Driven-Development. Hubo un momento que, con algunas katas, hacer tests
era un dolor porque se volvían difíciles de mantener. Entre esos tests estaban
aquellos que inspeccionaban múltiples casos (un test por cada caso).
Estos al principio los generaba en copiando y pegando y solo cambiaba
algo en el *Arrange* y otra cosa en *Assert* de cada test. Entonces, cuando quería
hacer un cambio de diseño,  múltiples tests se veían afectados (pues estaban
inspeccionando la misma lógica, pero contra distinta combinación).

Más adelante, para solventar este problema,  aprendí a trabajar con parametrización
de tests, lo que me ayudó mejorar el mantenimiento de estos. No obstante,
el test parametrizado se vuelve más abstracto (los detalles), ahí depende
de cómo se afronta la parametrización y si cabría preguntarse si existe
un problema de diseño (múltiples parámetros y el expected).

Te quiero mencionar finalmente a Property-Based-Testing que de cierta manera surge
de una parametrización de tests, pero cuya diferencia es que busca hacer una
verificación de un hecho en el sistema se cumple siempre, si quieres ver más
en detalle esto, he escrito una
<a href="https://leanmind.es/es/blog/introduccion-a-property-based-testing/" target="_blank">introducción a property-based-testing</a>
con C# y FsCheck.
En lo que respecta a este artículo, nos centraremos en la parametrización que es más
sencilla y barata en el contexto de querer cubrir un número de casos muy acotado.

## ¿Por qué parametrizar los tests?

Antes de entrar en materia, quiero destacar por qué parametrizar los tests nos puede beneficiar:

1. **Aumenta la eficiencia a la hora de generar tests:** Permite escribir en un solo test que múltiples situaciones, lo que ahorra tiempo y esfuerzo en la creación y mantenimiento respecto a tener test individuales.
2. **Simplifica el mantenimiento:** Permite agregar, modificar o eliminar casos de prueba, solo en un lugar central, en lugar de modificar múltiples pruebas individuales.
3. **Mejora la cobertura de pruebas:**  Permite explorar un rango más amplio de escenarios de prueba con menos esfuerzo. Esto ayuda a identificar y corregir posibles problemas que podrían pasar desapercibidos.
4. **Facilita la detección de regresiones:**  Permite verificar, si cuando se realizan modificaciones en el código, se  introducen regresiones al ejecutar automáticamente una serie de pruebas con diferentes datos de entrada.
5. **Fomenta la consistencia:** Promueve la coherencia en tus pruebas, lo que facilita su comprensión y colaboración entre miembros del equipo de desarrollo. Ojo, esto depende del diseño, pero puede servir para detectar defectos en este.
6. **Ahorro de tiempo a largo plazo:** Aunque la configuración inicial de tests parametrizados puede requerir un poco más de tiempo que las pruebas unitarias individuales, ahorras tiempo significativo a medida que tu proyecto crece y evoluciona, ya que no necesitas crear pruebas adicionales para cada caso.

## ¿Cómo podemos parametrizar los test con xUnit (C#)?

Ahora sí, vamos a lo importante, el cómo. Lo primero es que debemos hacer uso
del atributo `[Theory]`. Este  nos permitirá  habilitar la posibilidad de usar
parámetros en los tests, es decir, habilitar la parametrización.
Las opciones disponibles son: `[InlineData]`, `[ClassData]` y `[MemberData]`

### Atributo ****`[InlineData]`****

Esta es la opción más sencilla, pues permite en el mismo atributo declarar los parámetros
a inyectar en el orden que están declaradas en el método que hace de test:

```csharp
    using Xunit;
    
    public class CalculatorShould
    {
        [Theory]
        [InlineData(2, 3, 5)]
        [InlineData(0, 0, 0)]
        [InlineData(4, -2, 2)]
        public void AddTwoNumbers(int number1, int  number2, int result)
        {
            var calculator = new Calculator();
    
            Assert.Equal(result, calculator.Add(number1, number2));
        }
    }
```

Sin embargo, si los casos a comprobar son un número considerable,
ensombrece lo importante, el test. Por otro lado,
solo es posible cuando se declara una expresión constante.
Para situaciones donde se necesiten expresiones más complejas se puede usar
`ClassData` o `MemberData`  pues están diseñados para manejar situaciones donde
necesitas pasar objetos complejos como datos de prueba.
Para estos casos veremos un ejemplo que requiere de una complejidad mayor.

Supongamos estamos desarrollando el cálculo el total de un pedido,
incluyendo los precios de los productos y los impuestos.
Los productos se representarán mediante una clase **`Product`** y el pedido mediante
una clase **`Order`**.

```csharp
public class Product
{
    public string Name { get; set; }
    public decimal Price { get; set; }
}

public class Order
{
    public List<Product> Products { get; set; } = new List<Product>();
    public decimal TaxRate { get; set; }

    public decimal CalculateTotal()
    {
        var subtotal = Products.Sum(p => p.Price);
        return subtotal + subtotal * TaxRate;
    }
}
```

Veamos como podemos generar tests parametrizados para esto tanto con la
opción `ClassData` como  la  de `MemberData`.
Para ello, los datos de prueba incluirán una lista de productos,
una tasa de impuestos y el total esperado. Las pruebas verificarán si el
método **`CalculateTotal`** de la clase **`Order`** calcula correctamente el
total del pedido, incluyendo los impuestos.

### Atributo `[ClassData]`

Esta alternativa permite extraer datos de prueba en su propia clase,
lo que es útil para organizar los datos de prueba por separado de las pruebas y
facilita su reutilización.
Debes cargar los datos de prueba desde una clase que herede de
**`IEnumerable<object[]>`** e implemente el método **`GetEnumerator`**.
Sin embargo, este enfoque es complicado porque requiere implementar la interfaz
**`IEnumerable`** y aun así sufre de falta de seguridad de tipo.

```csharp
public class OrderTestData : IEnumerable<object[]>
{
    public IEnumerator<object[]> GetEnumerator()
    {
        yield return new object[] {
            new List<Product> {
								new Product { Name = "T-shirt", Price = 20m },
							  new Product { Name = "Jeans", Price = 50m }
						},
            0.1m, // 10% Tax
            77m // Expected total
        };
        yield return new object[] {
            new List<Product> { new Product { Name = "Socks", Price = 5m } },
            0.2m, // 20% Tax
            6m // Expected total
        };
    }

    System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator() => GetEnumerator();
}

public class OrderShould
{
    [Theory]
    [ClassData(typeof(OrderTestData))]
    public void CalculateTotalCorrectly(
			List<Product> products, decimal taxRate, decimal expectedTotal
		)
    {
        var order = new Order { Products = products, TaxRate = taxRate };

        var total = order.CalculateTotal();

        Assert.Equal(expectedTotal, total);
    }
}
```

### Atributo `[MemberData]`

Esta alternativa permite encapsular la parametrización en un método estático.
Para ello es necesario pasar la referencia del método estático a **`nameof`** para
referenciar el miembro que proporciona los datos, lo cual facilita futuras
modificaciones al código sin romper los tests. Este enfoque carece de tipado fuerte,
ya que la propiedad o método debe devolver **`IEnumerable<object[]>`**. No Obstante,
se puede declarar los tipo en los parámetros de los tests

```csharp
public class OrderShould
{
    public static IEnumerable<object[]> TestData
    {
        get
        {
            yield return new object[] {
                new List<Product> {
										new Product { Name = "T-shirt", Price = 20m },
										new Product { Name = "Jeans", Price = 50m }
								},
                0.1m, // 10% Tax
                77m // Expected total
            };
            yield return new object[] {
                new List<Product> { new Product { Name = "Socks", Price = 5m } },
                0.2m, // 20% Tax
                6m // Expected total
            };
        }
    }

    [Theory]
    [MemberData(nameof(TestData))]
    public void CalculateTotalCorrectly(
			List<Product> products, decimal taxRate, decimal expectedTotal
		)
    {
        var order = new Order { Products = products, TaxRate = taxRate };

        var total = order.CalculateTotal();

        Assert.Equal(expectedTotal, total);
    }
}
```

## ¿Cuándo usar MemberData o ClassData?

La elección entre usar **`ClassData`** con una clase independiente
o un método estático (**`MemberData`**) en xUnit para pruebas parametrizadas
depende de varios factores: La organización del código, la reutilización y la
escalabilidad. Aunque ambos enfoques funcionan de manera similar a nivel lógico,
hay diferencias clave que pueden influir en la toma de decisión de elegir una u otra:

### **Uso de una Clase Independiente (`ClassData`)**

**Cuándo elegirlo:**

- **Reutilización de datos en múltiples Clases de Test:** Si los mismos datos de prueba se van a utilizar en diferentes clases de test, una clase independiente evita la duplicación del código.
- **Separación de preocupaciones:** separación de los datos de prueba de la lógica del test para una mejor organización y claridad.
- **Complejidad de los datos para el test:** Si los datos de prueba requieren una lógica de configuración compleja o inicialización, una clase independiente puede manejar esto de manera más ordenada.
- **Escalabilidad:** En proyectos grandes, donde los datos de prueba pueden ser extensos y complejos, una clase independiente puede hacer que el manejo de estos datos sea más manejable.

### **Uso de un Método Estático (`MemberData`)**

**Cuándo elegirlo:**

- **Conveniencia y Accesibilidad:** Si los datos de prueba son específicos para una suite de test y no necesitas reutilizarlos en otros lugares.
- **Simplicidad:** Para casos de prueba simples donde no se justifica una clase separada.
- **Visibilidad y Coherencia:** Cuando es beneficioso tener los datos de prueba cerca de los métodos de test para una mejor visibilidad y comprensión del contexto de prueba.

En resumen, aunque ambos enfoques ofrecen la misma funcionalidad a nivel lógico, la elección entre ellos depende de cómo quieras organizar tus pruebas, la necesidad de reutilizar los datos de prueba y la complejidad de los datos y las pruebas involucradas. La clave es elegir el enfoque que mejor se adapte a la estructura y necesidades de tu proyecto. Un punto final a considerar es la cohesión del código. Si los datos de prueba están estrechamente relacionados con la lógica de prueba, mantenerlos juntos en la misma clase puede tener más sentido.

## Referencias
- [Theory](https://www.linkedin.com/pulse/xunit-theory-parametrized-tests-said-souhayel/)
- [Unit Testing con xUnit (.NET)](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-dotnet-test)
- [Comparativa InlineData, ClassData y MemberData](https://andrewlock.net/creating-parameterised-tests-in-xunit-with-inlinedata-classdata-and-memberdata/#:~:text=xUnit)
- [Diseño Ágil con TDD](https://savvily.es/libros/diseno-agil-con-tdd/)