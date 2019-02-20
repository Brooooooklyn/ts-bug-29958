# Bug report for https://github.com/Microsoft/TypeScript/issues/29958

- yarn
- see the [index.tsx](./index.tsx)

expect typeof factory to be
```ts
(eventSource$: Observable<MouseEvent<HTMLButtonElement, MouseEvent>>, inputs$: Observable<number[]>, state$: Observable<number>) => Observable<number>
```
but TypeScript inference the factory type to be
```ts
(eventSource$: Observable<MouseEvent<HTMLButtonElement, MouseEvent>>, inputs$: Observable<number[]>, state$: Observable<number[]>) => Observable<number[]>
```
while the `State` of `useEventCallback<EventValue, State, Inputs>` expect to be the typeof `initialValue` which in parameters
