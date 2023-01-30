module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    // 사용되지 않은 변수를 허용하지 않는다
    "no-unused-vars": ["warn"],
    // 변수, 함수명 등은 20자 이하로 지어야 한다
    "id-length": ["error", { max: 20 }],
    // 함수 정의시 함수이름 뒤에 공백이 없어야 한다
    "space-before-function-paren": ["error", "never"],
    // 객체의 프로퍼티 이름은 필요할 때만 따옴표로 감싸야 한다
    "quote-props": ["error", "as-needed"],
    // 파라미터는 읽기 전용이다(매개변수를 수정할 수 없다)
    "no-param-reassign": ["error"],
    // 파라미터는 3개를 초과해서 사용하지 않는다
    "max-params": ["error", 3],
    // 중괄호(블록) 내부의 앞뒤에 공백이 하나씩 있어야 한다
    "block-spacing": ["error"],
    // 중첩 if문을 허용하지 않는다
    "max-depth": ["error", 1],
    // if 문에서 중복 조건을 허용하지 않는다
    "no-dupe-else-if": ["error"],
    // if 문에서 return을 하면 else 문에서 return을 할 수 없다
    "no-else-return": ["error"],
    // 삼항연산자를 허용하지 않는다
    "no-unneeded-ternary": [
      "error",
      {
        defaultAssignment: false,
      },
    ],
    // 문자열 선언에는 곁따옴표를 사용한다
    quotes: [
      "error",
      "double",
      {
        // '""' 같은 중쳡 리터럴은 허용한다
        avoidEscape: true,
      },
    ],
    // 문자열 연결에는 템플릿 문자열을 사용해야 한다
    "prefer-template": ["error"],
  },
};
