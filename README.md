## hansearch

Json객체에서 한글 검색을 수행하는 라이브러리. 한글 초성 검색을 지원합니다.
<br/>
Library for performing Korean search within JSON objects. Supports Korean initial consonant search.

[See the simple live demo](https://hwantage.github.io/hansearch/demo/)

Hugo 블로그에서 Fuse.js 를 이용해 검색기능을 구현해 보았는데, 한글 검색 지원이 원활하지 않았습니다. json 데이터를 기준으로 검색을 수행하는 라이브러리가 없어 레퍼런스를 참고하여 직접 패키지로 만들었습니다.

- 매우 심플하고 빠릅니다.
- 영문 대소문자 구분없이 검색을 지원합니다.
- 한글 초성 검색을 지원합니다.
- 기본적으로 exact matching 으로 동작합니다.
- 특수문자에 대한 검색을 지원합니다. (Contributions by [hwahyeon](https://github.com/hwahyeonhttps:/))
- 마지막 입력 문자를 분해하여 다음 문자열 검색에 사용합니다. 예) "많"을 입력한 경우 "만화" 도 함께 검색됩니다.
- Typescript 를 지원하도록 구현하였습니다.
- AMD, CJS 스펙을 모두 지원할 수 있도록 UMD 패턴으로 작성하였습니다.
- 사용법이 매우 간편합니다.

[라이브 데모 확인하기](https://hwantage.github.io/hansearch/demo/)

## Usage 1

노드 패키지를 설치해서 테스트 가능합니다. 간편하게 테스트 해보시려면 `Usage 2` 섹션을 참고하세요.
npm 패키지로 설치합니다.

```shell
npm i hangul-search
```

코드를 작성합니다.

```js
// 라이브러리 import
import hansearch from "hangul-search";

// Json 객체 정의
var json = [
  {
    title: "Javascript find, findIndex, filter",
    users: ["김정환", "홍길동", "강감찬", "아이유"],
    description: "구글 네이버 다음",
  },
  {
    title: "Javascript 직렬화(serialization)",
    users: ["골리앗", "이순신", "김길동"],
    description: "직렬화를 알아본다.",
  },
  {
    title: "Javascript 템플릿 리터럴(Template literal)",
    users: ["James", "Tom", "David"],
    description: "고글 가글 고고씽",
  },
];

// 검색 수행
const result = hansearch(json, "ㅈ렬화");
console.log(result);

/* 출력 결과
  {
    "items" :
    [
      {
        "title": "Javascript 직렬화(serialization)",
        "users": ["골리앗", "이순신", "김길동"],
        "description": "직렬화를 알아본다."
      }
    ]
  }
  */
```

## Usage 2

CDN을 이용하여 실행가능합니다.

```html
<script src="https://hwantage.github.io/hansearch/src/index.js" type="text/javascript"></script>
<script type="text/javascript">
  var json = [
    {
      title: "Javascript find, findIndex, filter",
      users: ["김정환", "홍길동", "강감찬", "아이유"],
      description: "구글 네이버 다음",
    },
    {
      title: "Javascript 직렬화(serialization)",
      users: ["골리앗", "이순신", "김길동"],
      description: "직렬화를 알아본다.",
    },
    {
      title: "Javascript 템플릿 리터럴(Template literal)",
      users: ["James", "Tom", "David"],
      description: "고글 가글 고고씽",
    },
  ];

  var result = hansearch(json, "ㅈ렬화");
  console.log(result);

  /* 출력 결과
  {
    "items" :
    [
      {
        "title": "Javascript 직렬화(serialization)",
        "users": ["골리앗", "이순신", "김길동"],
        "description": "직렬화를 알아본다."
      }
    ]
  }
  */
</script>
```

## Options

3번째 인자에 검색 대상 키 컬럼을 지정할 수 있습니다. 값을 지정하지 않으면 모든 키를 대상으로 검색을 수행합니다.

```js
var result = hansearch(json, "ㅈ렬화"); // 모든 키를 대상으로 검색을 수행합니다.
var result = hansearch(json, "ㅈ렬화", ["title"]); // title 키를 대상으로 검색을 수행합니다.
var result = hansearch(json, "ㅈ렬화", ["title", "users"]); // title과 users 키를 대상으로 검색을 수행합니다.
```

.mark() 메소드 체이닝을 지원합니다. 일치한 검색어를 `<mark>` 태그로 감싸주며, 원하는 태그를 인자로 넘겨줄 수 있습니다.

```js
var result = hansearch(json, "ㅈ렬화").mark(); // 검색어와 일치한 단어를 <mark> 태그로 감싼 결과를 리턴합니다.
var result = hansearch(json, "ㅈ렬화").mark("tags"); // 검색어와 일치한 단어를 <tags> 태그로 감싼 결과를 리턴합니다.
```

hansearch 의 3번째 인자에는 json 형태로 옵션값을 전달할 수도 있습니다.

```json
var options = {
    "mode" : "exact",
    "keys" : ["key1", "key2"]
}
```

`mode` string "exact" : 정확히 일치하는 검색을 수행합니다. default 는 자음 분해 검색을 수행합니다.

| exact 모드인 경우 "파라미터"를 검색하기 위해 "ㅍㄻㅌ" 와 같이 입력한 경우 검색이 되지 않습니다. default 모드에서는 ㄻ 을 ㄹㅁ 으로 분해하여 검색을 수행합니다. 특별히 값을 지정하지 않으면 분해 검색을 수행합니다.

`keys` string[] : 검색 대상 키값을 지정합니다. 값을 지정하지 않으면 모든 키를 대상으로 검색을 수행합니다.

| 다음 두 코드는 동일한 동작을 수행합니다.

```json
var keys = ["title", "users"];
var options = { "keys" : ["title", "users"] };

var result = hansearch(json, "ㅈ렬화", keys);
var result = hansearch(json, "ㅈ렬화", options);

```

## References

https://gurtn.tistory.com/207

https://github.com/hwahyeon/korean-unpacker/issues/1

## LICENSE

MIT
