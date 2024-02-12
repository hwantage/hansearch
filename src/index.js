/*!
 * hansearch
 * Copyright(c) 2024 hwantage
 * MIT Licensed
 */

(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports === "object" && typeof exports.nodeName !== "string") {
    module.exports = factory();
  } else {
    root.hansearch = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  // 참고 : https://gurtn.tistory.com/207
  const CHO_HANGUL = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
  const JUNG_HANGUL = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];
  const JONG_HANGUL = ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
  const MAP_DOUBLE_MOUM = { ㄳ: "ㄱㅅ", ㄵ: "ㄴㅈ", ㄶ: "ㄴㅎ", ㄺ: "ㄹㄱ", ㄻ: "ㄹㅁ", ㄼ: "ㄹㅂ", ㄽ: "ㄹㅅ", ㄾ: "ㄹㅌ", ㄿ: "ㄹㅍ", ㅀ: "ㄹㅎ", ㅄ: "ㅂㅅ" };

  const HAN_START_CHAR = "가".charCodeAt();
  const CHO_PERIOD = Math.floor("까".charCodeAt() - "가".charCodeAt());
  const JUNG_PERIOD = Math.floor("개".charCodeAt() - "가".charCodeAt());

  // 초성, 중성, 종성 값을 사용하여 각각의 크기를 고려하여 한글 문자의 코드 포인트를 계산
  const combineHangul = (cho, jung, jong) => {
    return String.fromCharCode(HAN_START_CHAR + cho * CHO_PERIOD + jung * JUNG_PERIOD + jong);
  };

  // 초성검색
  const makeRegexByCho = (keyWord = "") => {
    const escapedSearch = keyWord.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"); // 특수문자 검색 지원
    const regex = CHO_HANGUL.reduce((acc, cho, index) => acc.replace(new RegExp(cho, "g"), `[${combineHangul(index, 0, 0)}-${combineHangul(index + 1, 0, -1)}]`), escapedSearch);
    return new RegExp(`(${regex})`, "ig");
  };

  // 초성, 중성, 종성 값으로 한글 재조합
  const johapHangul = (cho, jung, jong) => {
    return String.fromCharCode(HAN_START_CHAR + CHO_HANGUL.indexOf(cho) * CHO_PERIOD + JUNG_HANGUL.indexOf(jung) * JUNG_PERIOD + (jong ? JONG_HANGUL.indexOf(jong) : 0));
  };

  // 사용자의 예상 기대 결과 도출을 위해 검색 키워드를 생성. 마지막 문자를 분해 조합.
  const makeSearchWords = (keyWord = "") => {
    let keywords = [keyWord];

    let preCharacters = keyWord.slice(0, keyWord.length - 1); // 마지막 문자를 제외한 모든 문자열
    preCharacters = preCharacters
      .split("")
      .map((currentChar) => {
        if (MAP_DOUBLE_MOUM.hasOwnProperty(currentChar)) {
          // 앞 문자열에 겹초성만 있는 문자는 분해해서 조립
          return MAP_DOUBLE_MOUM[currentChar];
        } else {
          return currentChar;
        }
      })
      .join("");

    //keywords.push(preCharacters);
    const lastCharacter = keyWord.charAt(keyWord.length - 1); // 마지막 문자

    if (lastCharacter >= "가" && lastCharacter <= "힣") {
      // 모음이 포함된 경우
      const char_code = lastCharacter.charCodeAt() - HAN_START_CHAR;
      const cho = Math.floor(char_code / CHO_PERIOD);
      const jung = Math.floor((char_code % CHO_PERIOD) / JUNG_PERIOD);
      const jong = char_code % JUNG_PERIOD;
      const cho_char = CHO_HANGUL[cho];
      const jung_char = JUNG_HANGUL[jung];
      const jong_char = JONG_HANGUL[jong];
      if (jong > 0) {
        if (MAP_DOUBLE_MOUM.hasOwnProperty(jong_char)) {
          // 겹받침인 경우
          let result = johapHangul(cho_char, jung_char, MAP_DOUBLE_MOUM[jong_char][0]);
          keywords.push(preCharacters + result);
          keywords.push(preCharacters + result + MAP_DOUBLE_MOUM[jong_char][1]);
        } else {
          // 홑받침인 경우
          keywords.push(preCharacters + johapHangul(cho_char, jung_char));
          keywords.push(preCharacters + johapHangul(cho_char, jung_char) + jong_char);
        }
      }
    } else {
      // 초성만 있는 경우
      if (MAP_DOUBLE_MOUM.hasOwnProperty(lastCharacter)) {
        keywords.push(preCharacters + MAP_DOUBLE_MOUM[lastCharacter]);
      } else {
        keywords.push(preCharacters + lastCharacter);
      }
    }
    return keywords;
  };

  const hansearch = (jsonObj, keyWord, options) => {
    let keys = [];
    let searchWords = null;

    // check option keys
    if (Array.isArray(options)) {
      keys = options; // support minor version
    } else if (typeof options === "object" && options !== null && "keys" in options) {
      keys = options.keys;
    } else {
      keys = [];
    }
    // check option values
    if (typeof options === "object" && options !== null && "mode" in options) {
      if (options.mode === "exact") {
        searchWords = [keyWord]; // exact matching
      } else {
        searchWords = makeSearchWords(keyWord); // deassemble matching
      }
    } else {
      searchWords = makeSearchWords(keyWord); // default deassemble matching
    }
    const regexArray = searchWords.map((word) => makeRegexByCho(word)).filter((regex) => regex);
    //console.log(searchWords, regexArray);

    let searchResult = jsonObj.filter((obj) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key) && (keys.length === 0 || keys.includes(key))) {
          if (regexArray.some((regex) => regex.test(obj[key]))) {
            return true;
          }
        }
      }
      return false;
    });

    return {
      items: searchResult,
      mark: (tag = "mark") => {
        return {
          items: searchResult.map((obj) => {
            const markedObj = {};
            for (const key in obj) {
              if (obj.hasOwnProperty(key)) {
                if (keys.length === 0 || keys.includes(key)) {
                  if (Array.isArray(obj[key])) {
                    // 배열인 경우 각 원소에 대해 처리
                    markedObj[key] = obj[key].map((item) => {
                      return regexArray.reduceRight((acc, regex) => acc.replace(regex, `<${tag}>$&</${tag}>`), item);
                    });
                  } else {
                    markedObj[key] = regexArray.reduceRight((acc, regex) => acc.replace(regex, `<${tag}>$&</${tag}>`), obj[key]);
                  }
                } else markedObj[key] = obj[key];
              }
            }
            return markedObj;
          }),
        };
      },
    };
  };

  return hansearch;
});
