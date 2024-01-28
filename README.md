
## hansearch

Json객체에서 한글 검색을 수행하는 라이브러리. 한글 초성 검색을 지원합니다. 
<br/>
Library for performing Korean search within JSON objects. Supports Korean initial consonant search.

[See the simple live demo](https://hwantage.github.io/hansearch/demo/)

## Usage 1
### Installation
npm 패키지로 설치합니다.
```shell
npm i hansearch
```
### Usage
```js
  // 라이브러리 import
  import hansearch from "hansearch";

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
  [
    {
      "title": "Javascript 직렬화(serialization)",
      "users": ["골리앗", "이순신", "김길동"],
      "description": "직렬화를 알아본다."
    }
  ]
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
  [
    {
      "title": "Javascript 직렬화(serialization)",
      "users": ["골리앗", "이순신", "김길동"],
      "description": "직렬화를 알아본다."
    }
  ]
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

## LICENSE
MIT
