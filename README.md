
## hansearch

JSON 객체에서 한글 검색을 수행.
한글 초성 검색을 지원.

## Installation
npm 패키지로 설치합니다.
`npm i hansearch`

CDN 에서 소스를 인크루드 합니다.
```html
<script src="" type="text/javascript"></script>
```

## Usage

```js
  // 라이브러리 import
  import hansearch from "hansearch";

  // Json 객체 정의
  var json = [
    {
      title: "Javascript find, findIndex, filter",
      tags: ["JS", "find", "findIndex", "filter"],
      description: "Javascript 객체 탐색시 자주 사용하는 find, findIndex, filter 문법을 정리합니다.",
    },
    {
      title: "Javascript 직렬화(serialization)",
      tags: ["JS", "Function", "Hoisting"],
      description: "직렬화의 의미는 자바스크립트의 메모리 상에 존재하는 Object 나 데이터 구조를 다른 용도로 사용하기 위해 포맷을 변환하는 것.",
    },
    {
      title: "Javascript 템플릿 리터럴(Template literal)",
      tags: ["JS", "Template literal"],
      description:
        "ES6는 템플릿 리터럴(Template literal)이라고 불리는 새로운 문자열 표기법을 도입하였습니다. 템플릿 리터럴은 일반 문자열과 비슷해 보이지만, ‘ 또는 “ 같은 통상적인 따옴표 문자 대신 백틱(backtick) 문자 `를 사용합니다. 템플릿 리터럴은 + 연산자를 사용하지 않아도 간단한 방법으로 새로운 문자열을 삽입할 수 있는 기능을 제공합니다. 이를 문자열 인터폴레이션(String Interpolation)이라 합니다. 문자열 인터폴레이션은 ${}으로 표현식을 감싸 사용합니다.",
    },
  ];

  // 검색 수행
  const result = hansearch(json, "ㅈ렬화");

  /* result 의 결과는 다음과 같습니다.
    {
      title: "Javascript 직렬화(serialization)",
      tags: ["JS", "Function", "Hoisting"],
      description: "직렬화의 의미는 자바스크립트의 메모리 상에 존재하는 Object 나 데이터 구조를 다른 용도로 사용하기 위해 포맷을 변환하는 것.",
    }
  */
```
