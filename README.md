## hansearch

Json객체에서 한글 검색을 수행하는 라이브러리. 한글 초성 검색을 지원합니다.
<br/>
Library for performing Korean search within JSON objects. Supports Korean initial consonant search.

[See the simple live demo](https://hwantage.github.io/hansearch/demo/)

Hugo 블로그에서 Fuse.js 를 이용해 검색기능을 구현해 보았는데, 한글 검색 지원이 원활하지 않았습니다. json 데이터를 기준으로 검색을 수행하는 라이브러리가 없어 레퍼런스를 참고하여 직접 패키지로 만들었습니다.

* 매우 심플하고 빠릅니다.
* 영문 대소문자 구분없이 검색을 지원합니다.
* 한글 초성 검색을 지원합니다.
* 기본적으로 exact matching 으로 동작합니다.
* Typescript 를 지원하도록 구현하였습니다.
* AMD, CJS 스펙을 모두 지원할 수 있도록 UMD 패턴으로 작성하였습니다.
* 사용법이 매우 간편합니다.

## Usage 1

### Installation

npm 패키지로 설치합니다.

```shell
npm i hangul-search
```

### Usage

```js
  // 라이브러리 import
  import hansearch from "hangul-search";

  // Json 객체 정의
  var json = 
  [
  	{
  	  "title": "Javascript find, findIndex, filter",
  	  "users": ["김정환", "홍길동", "강감찬", "아이유"],
  	  "description": "구글 네이버 다음"
  	},
  	{
  	  "title": "Javascript 직렬화(serialization)",
  	  "users": ["골리앗", "이순신", "김길동"],
  	  "description": "직렬화를 알아본다."
  	},
  	{
  	  "title": "Javascript 템플릿 리터럴(Template literal)",
  	  "users": ["James", "Tom", "David"],
  	  "description": "고글 가글 고고씽"
  	}
  ]

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

```html
<script src="https://hwantage.github.io/hansearch/src/index.js" type="text/javascript"></script>
<script type="text/javascript">
  var json = 
  [
  	{
  	  "title": "Javascript find, findIndex, filter",
  	  "users": ["김정환", "홍길동", "강감찬", "아이유"],
  	  "description": "구글 네이버 다음"
  	},
  	{
  	  "title": "Javascript 직렬화(serialization)",
  	  "users": ["골리앗", "이순신", "김길동"],
  	  "description": "직렬화를 알아본다."
  	},
  	{
  	  "title": "Javascript 템플릿 리터럴(Template literal)",
  	  "users": ["James", "Tom", "David"],
  	  "description": "고글 가글 고고씽"
  	}
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

3번째 인자에 검색 대상 키 컬럼을 지정할 수 있습니다.

```js
var result = hansearch(json, "ㅈ렬화");   // 모든 키를 대상으로 검색을 수행합니다.
var result = hansearch(json, "ㅈ렬화", ["title"]);   // title 키를 대상으로 검색을 수행합니다.
var result = hansearch(json, "ㅈ렬화", ["title", "users"]);   // title과 users 키를 대상으로 검색을 수행합니다.
```

.mark() 메소드 체이닝을 지원합니다. 일치한 검색어를 `<mark>` 태그로 감싸주며, 원하는 태그를 인자로 넘겨줄 수 있습니다.
```js
var result = hansearch(json, "ㅈ렬화").mark();   // 검색어와 일치한 단어를 <mark> 태그로 감싼 결과를 리턴합니다.
var result = hansearch(json, "ㅈ렬화").mark("tags");   // 검색어와 일치한 단어를 <tags> 태그로 감싼 결과를 리턴합니다.
```


## References

https://gurtn.tistory.com/207

## LICENSE

MIT
