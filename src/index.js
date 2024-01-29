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
  const HAN_START_CHAR = "가".charCodeAt();
  const CHO_PERIOD = Math.floor("까".charCodeAt() - "가".charCodeAt());
  const JUNG_PERIOD = Math.floor("개".charCodeAt() - "가".charCodeAt());

  // 초성, 중성, 종성 값을 사용하여 각각의 크기를 고려하여 한글 문자의 코드 포인트를 계산
  const combineHangul = function (cho, jung, jong) {
    return String.fromCharCode(HAN_START_CHAR + cho * CHO_PERIOD + jung * JUNG_PERIOD + jong);
  };

  // 초성검색
  const makeRegexByCho = function (keyWord = "") {
    const escapedSearch = keyWord.replace(/[()|[\]{}\\]/g, ""); // 특수 문자 이스케이프
    const regex = CHO_HANGUL.reduce((acc, cho, index) => acc.replace(new RegExp(cho, "g"), `[${combineHangul(index, 0, 0)}-${combineHangul(index + 1, 0, -1)}]`), escapedSearch);
    return new RegExp(`(${regex})`, "ig");
  };

  const hansearch = function (jsonObj, keyWord, keys = []) {
    const regex = makeRegexByCho(keyWord);
    let searchResult = jsonObj.filter((obj) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key) && (keys.length === 0 || keys.includes(key))) {
          if (regex.test(obj[key])) {
            return true;
          }
        }
      }
      return false;
    });

    return {
      items: searchResult,
      mark: function (tag = "mark") {
        return {
          items: searchResult.map((obj) => {
            const markedObj = {};
            for (const key in obj) {
              if (obj.hasOwnProperty(key)) {
                if (keys.length === 0 || keys.includes(key)) {
                  if (Array.isArray(obj[key])) {
                    // 배열인 경우 각 원소에 대해 처리
                    markedObj[key] = obj[key].map((item) => item.replace(regex, `<${tag}>$&</${tag}>`));
                  } else {
                    markedObj[key] = obj[key].replace(regex, `<${tag}>$&</${tag}>`);
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
