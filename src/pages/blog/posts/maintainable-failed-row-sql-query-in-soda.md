---
layout: './_layout/MarkdownPostLayout.astro'
title: "Maintainable Failed Rows SQL Queries for soda.io"
pubDate: "2023-10-12"
author: "Mario S. Pinto Miranda"
image: 
  url: "/posts-covers/failed-rows.png"
  alt: "Maintainable Failed Rows SQL Queries for soda.io"
tags: ["Data-Quality", "SQL", "Maintainability"]
description: "How to write maintainable SQL queries for failed rows in soda.io following a structured pattern."
---


In this [article](https://leanmind.es/en/blog/soda-checks-development-with-test-driven-development/),
we saw the importance of having good data quality,
and how to use [soda.io](https://soda.io) to monitor it, covering the checks by
a concrete unit testing strategy. Among the possible checks, we saw the possibility
of checking the failed rows of a table. In this article we will see how to refactor
the SQL queries to make them more maintainable with a pattern where we will be able to
see different parts of the query in a more clear way (building, errorsRows and reportedRows).

## The problem
The failed rows check, in short, is a query that returns the rows that meet a fail
condition. For example, if we have a table where **start date** is later than **end date**,
we can check the rows that meet this condition with the following query:

```sql
SELECT *
FROM table
WHERE start_date > end_date
```
these rows are wrong, and we should report them to the data owner.

This example is pretty simple, but when we have to handle more complex
situations,where we have to join different tables, apply filtering,
or we have to check different conditions,the query can become very
complex and difficult to maintain, in other words to understand what
it does. I was pretty worried about this after I showed some checks to
my team when I started working with this, and it was difficult
for them to understand what the check is observing in the data.
There was a simple solution to this problem, add a description to the check,
but as any comment, in the code, should express decisions not
what code is doing. So I started to think about how to make the queries
with my colleague [Kevin Hierro](https://www.wolfremium.dev/).
We came up with a solution that I will explain with an example.

## A example of unmaintainable query
Let's imagine that we have to check the following condition in a fact table of cities:

> For cities with more than 10k inhabitants,
to report emissions is mandatory if the city is in the EU.

This check should be done using the following tables:
<img
src="/blog/diagrams/example-failed-rows-tables.svg"
alt="Tables"
width="100%"
height="auto"
/>

So, this could be a SQL query that checks this condition:

```sql
SELECT * FROM cities
INNER JOIN countries ON cities.country_id = countries.id
INNER JOIN supranationals ON countries.supranational_id = supranationals.id
WHERE cities.population > 10000
    AND supranationals.name = 'EU'
    AND cities.emissions IS NULL  -- We are checking the rows that are not reported
```

This query works but there are some problems:
- In terms of efficiency, we are doing a full join of the tables,
  and then we are filtering the rows.
- In terms of maintainability, it is difficult to understand what
  the query is doing, and what is the main condition that we are checking.

It is a super simple case but I totally sure that the query will be more
intuitive and efficient if we can see the different parts of the query
in a more clear way. If we have written the previous query applying the
TDD approach we could change the query to the following one with security:

```sql
WITH european_countries AS (
    SELECT * FROM countries
    INNER JOIN supranationals ON countries.supranational_id = supranationals.id
    WHERE supranationals.name = 'EU'
), european_cities_with_more_than_10k_inhabitants AS (
    SELECT * FROM cities
    INNER JOIN european_countries ON cities.country_id = european_countries.id
    WHERE cities.population > 10000

--- More clear what we are checking
), errorsRows AS (
    SELECT * FROM european_cities_with_more_than_10k_inhabitants ec
    WHERE ec.emissions IS NULL
---

), reportedRows AS (
    SELECT * FROM errorsRows
    -- We could add more information irrelevant for the check but relevant for the report
)
SELECT [columns-needed] FROM reportedRows
```

As you can see, we have divided the query into different parts, and we have
separated them by responsibility given a clear naming to express the intention.
The first part is the **building** part, where we are building the atomic parts
of the query to achieve the domain of query
(an efficient filtering avoiding multiple where conditions).
The second part is the **errorsRows** part, where we apply the main check that
business requires us to do. The third part is the **reportedRows** part, where we
filter the rows that are already reported, in this part we could add or join
information irrelevant for the check but relevant for the report. Finally,
we have the **select** part that is executed by soda scanner to report the rows
that are wrong.

## Conclusion
In this article we have seen how to refactor the SQL queries to make them more
maintainable with a pattern where we will be able to see different parts of the
query in a more clear way (building, errorsRows and reportedRows). This pattern
is very useful when we have to check complex conditions, and we want to make
the queries more efficient and maintainable.