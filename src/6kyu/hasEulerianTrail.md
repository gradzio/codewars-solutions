# Cross the Bridges

This input is an object containing some number of cities.

For each city in the object there is a list.

The length of the list is the number of bridges in the city.

Each element in the list is the name of a city-- the destination.

We want to know if we can visit every city by taking every bridge exactly once.

It's okay to visit the same city more than once.

Return true if we can do it, otherwise false.

## Examples

```
input1 = {
  A : [B,C,D]
  B : [A]
  C : [A,D]
  D : [A,C]
}
output: true
input2 = {
  A : [C,D]
  B : [E]
  C : [A,D]
  D : [A,C]
  E : [B]
}
output: false
input3 = {
  A : [B,D]
  B : [A,D,D,E]
  C : [E]
  D : [A,B,B,E]
  E : [B,C,D]
}
output: true
input4 = {
  A : [B,C,D]
  B : [A,C,D]
  C : [A,B,D]
  D : [A,B,C]
}
output: false
```

The circles are nodes (cities) and red lines are bridges.
bridges_And_Cities

Tests:

900 random tests
largest input may hold over 900 cities