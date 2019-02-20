import { Observable } from 'rxjs'
import { combineLatest, map, delay } from 'rxjs/operators'

import { useEventCallback } from './use-event-callback'

const initialValue = 1000
const value = 1
const timeToDelay = 200

const factory = (
  event$: Observable<React.MouseEvent<HTMLButtonElement>>,
  inputs$: Observable<number[]>,
  _state$: Observable<number>,
): Observable<number> =>
  event$.pipe(
    combineLatest(inputs$),
    map(([_, [count]]) => {
      return value + count
    }),
    delay(timeToDelay),
  )
function Fixture(props: { count: number }) {
  // expect typeof factory to be
  // (eventSource$: Observable<MouseEvent<HTMLButtonElement, MouseEvent>>, inputs$: Observable<number[]>, state$: Observable<number>) => Observable<number>
  // but TypeScript inference the factory type to be
  // (eventSource$: Observable<MouseEvent<HTMLButtonElement, MouseEvent>>, inputs$: Observable<number[]>, state$: Observable<number[]>) => Observable<number[]>
  // while the State of useEventCallback<EventValue, State, Inputs> expect to be the typeof parameter initialValue
  const [clickCallback, stateValue] = useEventCallback(factory, initialValue, [props.count])

  return (
    <>
      <h1>{stateValue}</h1>
      <button onClick={clickCallback}>click me</button>
    </>
  )
}