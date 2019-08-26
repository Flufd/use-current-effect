# useCurrentEffect

Sometimes we need to track if an effect has been cleaned up, because one of it's dependencies has changed. The `useCurrentEffect` hook gives us a helper parameter to track this state without the boilerplate.

## Installation
`npm i use-current-effect` or just copy the hook from this repo

Dan Abramov shows us how we can track if the effect has been "cancelled" here https://overreacted.io/a-complete-guide-to-useeffect/#speaking-of-race-conditions

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

With `useCurrentEffect` you can do away with this boilerplate and clean up your effects...

```Javascript
useCurrentEffect((effectState) => {
  async function fetchData() {
    const article = await API.fetchArticle(id);
    if (effectState.isCurrent) {
      setArticle(article);
    }
  }

  fetchData();
}, [id]);
```
Any clean up function returned by the first effect parameter function will be called after the flag has been set, so you may still unsubscribe from subscriptions etc.

Note that deconstructing the parameter as `({ isCurrent })` will cause issues, because doing so effectively creates a copy of boolean field, scoped to the effect function only, which will not be mutated by the cleanup.

## ESLint

If you use the ESLint rule `react-hooks/exhaustive-deps` then you can add the `useCurrentEffect` to your `additionalHooks` Regex in your `.eslint` to ensure that you don't miss any dependencies.

```JSON
"react-hooks/exhaustive-deps": ["warn", { "additionalHooks": "useCurrentEffect" }],
```