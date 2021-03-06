# useCurrentEffect

Sometimes we need to track if an effect has been cleaned up, because one of it's dependencies has changed, or the component was unmounted. The `useCurrentEffect` hook gives us a helper function as a parameter to track this state without the usual boilerplate.

## Installation

`npm i use-current-effect`

## Use

```Javascript
import { useCurrentEffect } from "use-current-effect";

// ...

useCurrentEffect((isCurrent) => {
  async function fetchData() {
    const article = await API.fetchArticle(id);
    if (isCurrent()) {
      setArticle(article);
    }
  }

  fetchData();
}, [id]);
```

## Motivation

You could do this manually like this each time you want to make this check:

```JavaScript
useEffect(() => {
  let didCancel = false;

  async function fetchData() {
    const article = await API.fetchArticle(id);
    if (!didCancel) {
      setArticle(article);
    }
  }

  fetchData();

  return () => {
    didCancel = true;
  };
}, [id]);
```

With `useCurrentEffect` you can do away with this boilerplate and make your effects more consise.

## Callbacks

There is also `useCurrentCallback` which works in a similar way, however as the consumer of the hook may want to pass parameters to the callback function, we must use a slightly different pattern. `useCurrentCallback` takes a generator function so you may inject the checker function.

```jsx
const onSearchOrders = useCurrentCallback(
  isCurrent => searchParams => {
    api.searchOrders(customerId, searchParams).then(results => {
      if (isCurrent()) {
        setSearchResults(results);
      }
    });
  },
  [customerId]
);
```

## ESLint

If you use the ESLint rule `react-hooks/exhaustive-deps` then you can add the `useCurrentEffect` to your `additionalHooks` regex in your `.eslint` to ensure that you don't miss any dependencies.

```JSON
"react-hooks/exhaustive-deps": ["warn", { "additionalHooks": "useCurrentEffect" }],
```
