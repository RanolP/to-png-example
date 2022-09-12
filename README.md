# to-png-example

playwright랑 resvg로 html/svg를 png로 변환하는 예제

## playwright

```sh
$ npm run playwright     

> playwright
> node src/playwright.mjs

3356 ms
```

## playwright-svg

```sh
$ npm run playwright-svg

> playwright-svg
> node src/playwright-svg.mjs

3562 ms
```

## resvg

```sh
$ npm run resvg

> resvg
> node src/resvg.mjs

(node:20106) ExperimentalWarning: The Fetch API is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
474 ms
```

## 성능 비교

- playwright는 수행하는 작업과 무관하게 약 3 초의 오버헤드가 있습니다.
  브라우저를 켜는 데에 긴 시간이 걸리기 때문입니다.
- resvg는 1 초 이내의 시간에 작업을 수행합니다.
  정확히 SVG를 그린다는 기능만 수행하면 되기 때문입니다.

## 추가 최적화 가능성

- solved.ac 티어 아이콘, 배경 이미지 등 캐싱이 가능한 이미지는 로컬에 캐시하면 네트워크 요청 시간을 최적화할 수 있습니다.
- 사용자별로 svg -> png 결과를 캐싱할 수 있습니다. 수명을 적당히 주어 필요할 때 갱신되게 하고, 강제 갱신 기능을 만드는 편이 좋습니다.
