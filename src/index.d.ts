/**
 * 한글 초성 기반 검색을 수행하는 함수.
 * @param {Record<string, any>[]} jsonObj - 검색할 JSON 객체 배열
 * @param {string} keyWord - 초성 검색에 사용될 키워드
 * @param {Object} [options] - 옵션 객체
 * @param {Options string[]} [options.keys] - 검색할 특정 키(들)를 선택할 수 있습니다. 문자열 배열로 전달합니다.
 * @param {Options Record<string, any>[]} [options.keys] - 검색 모드 지정 및 검색할 특정 키(들)를 선택할 수 있습니다. JSON 객체 배열로 전달합니다.
 * @returns {Record<string, any>[]} - 검색 결과를 포함한 JSON 객체 배열을 반환합니다.
 * @example
 * const result = hansearch(jsonArray, "키워드"); // jsonArray의 모든 키값을 탐색
 * const result = hansearch(jsonArray, "키워드", ["key1", "key2"]); // jsonArray의 key1 및 key2 값만 탐색
 * const result = hansearch(jsonArray, "키워드").mark(); // 결과 값 <mark></mark> 태그 치환
 * const result = hansearch(jsonArray, "키워드").mark("my-tag"); // 결과 값 <my-tag></my-tag> 태그 치환
 * const result = hansearch(jsonArray, "키워드", {'mode':'exact'}); // 정확히 일치하는 검색을 수행
 * const result = hansearch(jsonArray, "키워드", {'mode':'exact', 'keys' : ["key1", "key2"]}); // 정확히 일치하는 검색을 수행하며, key1 및 key2 값만 탐색
 **/
interface MarkedResult {
  mark: (tag?: string) => Record<string, any>[];
}

type Options = Record<string, any> | string[];

declare module "hansearch" {
  const hansearch: (jsonObj: Record<string, any>[], keyWord: string, options?: Options) => MarkedResult;

  export = hansearch;
}
