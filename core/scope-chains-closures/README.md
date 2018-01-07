
# Scopes in JS
1. Lexical
2. Block
3. Global
4. `with`
5. `catch`
6. `eval`


### Lexical Scope

`var` is used to denote a variable which is Lexically Scoped to the current
function:
```
    function someFunc() {
      var aVariable;
    }
```
`aVariable` is lexically scoped within `someFunc`

### Block Scope

`let` & `const` are used to denote variables which are Block Scoped to the
current curly braced block:
```
    if (true) {
      let aVariable;
    }
```
`aVariable` is block scoped within the `if`'s curly braces


There are also 4 other scopes in the language: Global, `with`, `catch`, and `eval`.

### Global Scope
A variable declared outside a function.
All Javascript runtimes must implicitly create a Global Scope object (window in the browser, global in node), which sits at the top of every scope chain.
When assigning a variable without using either of var, let, etc, the variable is assumed to exist in an outer scope.
The javascript runtime follows these steps to assign a variable:
 1) Search within the current scope.
 2) If not found, search in the immediately outer scope.
 3) If found, go to 6.
 4) If not found, repeat 2. Until the Global Scope is reached.
 5) If not found in Global Scope, create it (on window / global objects).
 6) Assign the value.

### `with` Scope

### `catch` Scope

### `eval` Scope

## Nesting Scopes
It is perfectly valid to define two different variables, in different scopes, with the same name.
It is also valid to do this in nested scopes.
This is called Shadowing. The foo inside inner() is said to Shadow the foo inside someFunc.
Shadowing means that the inner() scope only has access to its own foo. There is no way for it to access the foo defined in someFunc().
(This can also be an accidental source of bugs, especially when there is deep nesting, or long functions.)

# Closures
To properly understand closures, let's start with an example scope chain:

    someFunc()
        ↑
        |
     inner()
        ↑
        |
      foo()

Let's say someFunc() declares a variable bar:

    someFunc()
     var bar
        ↑
        ⋮

Given how nesting scope works, it's possible for an inner scope within someFunc() to access bar. In this example, let's say inner() accesses bar:

    someFunc()
     var bar
        ↑
        |
     inner()
    alert(bar)
        ↑
        ⋮

Then inner() is said to Close Over bar. Therefore inner() is a Closure.

To power the callback style of programming, the closure will be maintained even if inner() isn't executed immediately. It is perfectly legal in Javascript to pass inner around / return it from someFunc() for later execution. All the while, bar will continue to be available.

# Garbage Collection
Every javascript runtime has their own algorithm for garbage collection, but most use a variation of *Mark & Sweep*.
### The Mark & Sweep algorithm
Mark & Sweep works by *marking* references to memory (variables, functions, etc) which are still reachable from active code.
Any reference which is not marked, is *swept* into the garbage (i.e. the memory is freed).

This concept of marking reachable memory is particulary relevant to closures:

     someFunc()
      var bar
    return inner
         ↑
         |
      inner()
     alert(bar)
         ↑
         ⋮

When the closure inner() is returned from someFunc(), it maintains its reference to bar. The Mark & Sweep algorithm will mark bar as reachable, and hence will not garbage collect it.

For inner() to correctly resolve its reference to bar, not only does the memory for bar need to be kept, but the scope chain which describes how to reach bar must also be kept.

Once the reference to inner() is no longer required, it can be marked for garbage collection, which in turn means bar can also be marked, and finally the entire scope chain can be marked, resulting in the freeing of all the memory.

In this way, Scope, Scope Chains, Closures, and Garbage Collection are all closely related.
