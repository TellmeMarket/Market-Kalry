const signupFunc = (() => {
  const $form = document.querySelector(".signform");
  const $signBtn = $form.querySelector(".signBtn");
  const $popup = document.querySelector(".popup");

  // 랜덤 아이디 생성
  const randomString = () => {
    const rand = Math.random().toString(36).substring(2, 11);
    console.log(rand);
  };
  randomString();

  // 팝업창
  const popup = (text) => {
    // if (!$popup.classList.contains("active")) {
    //   $popup.querySelector("p").textContent = text;
    //   document.body.classList.add("off");
    //   $popup.classList.add("active");
    //   return;
    // } else {
    //   document.body.classList.remove("off");
    //   $popup.classList.remove("active");
    // }
  };

  // 에러 메세지 리스트
  const errPopup = [`6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합`, `비밀번호 영문 숫자 조합 8자리 이상`];

  // 에러체크 함수
  const checkErr = (target, regExp, errNum) => {
    if (!regExp.test(target.value)) target.closest("td").querySelector("p").textContent = errPopup[errNum];
    if (target.value.length === 0 || regExp.test(target.value)) target.closest("td").querySelector("p").textContent = "";
  };

  const isChecked = {
    isUserid(id) { // 아이디 체크
      const regExp = /^(?=.*[a-zA-Z])[a-zA-Z\d]{6,}$/;
      checkErr(id, regExp, 0);
      return regExp.test(id.value); // boolean
    },
    isPwd(pwd) { // 비밀번호 체크
      const regExp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{10,}$/;
      console.log(pwd.value);
      checkErr(pwd, regExp, 1);
      return regExp.test(pwd.value); // boolean
    },
    isPwdCheck() {

    },
    isName() {},
    isEmail() {},
    isPhoneNumber() {},
  };

  const { isUserid, isPwd, isPwdCheck, isName, isEmail, isPhoneNumber } = isChecked;

  const listCheck = []; // active된 요소를 확인하기위한 배열

  return () => {
    // inputEvent
    const inputHandler = (e) => {
      e.target.id === "userid" && isUserid(e.target);
      e.target.id === "pwd" && isPwd(e.target);
      e.target.id === "pwdCheck" && isPwdCheck(e.target);
      e.target.id === "name" && isName(e.target);
      e.target.id === "email" && isEmail(e.target);
      e.target.id === "phonNumber" && isPhoneNumber(e.target);
    };

    // 전체동의 체크 2
    const allCheck = (target, bool) =>
      target
        .closest(".column")
        .querySelectorAll("input[type=checkbox]")
        .forEach((el) => (el.checked = bool));

    const clickHandler = (e) => {
      // 전체동의 체크 1
      if (e.target.dataset.check === "check") {
        e.target.name === "agreeAll" && allCheck(e.target, e.target.checked);
        const result = [...$form.querySelectorAll(".required")].filter((el) => el.checked === true);
        result.length === $form.querySelectorAll(".required").length && allCheck(e.target, true);
      }

      // userId 중복확인 + 팝업
      // 1. userId 중복확인버튼을 눌렀을때 input.vaue가 해당 조건이 아니면 팝업창을 띄움
      if (e.target.className === "userid-check") {
        e.preventDefault();
      }

      // 2. userId 중복확인버튼을 눌렀을때 input.vaue가 해당 조건이 맞으면 팝업창을 띄우고 중복확인 버튼 off

      // email 중복확인 + 팝업
      // 1. email 중복확인버튼을 눌렀을때 빈문자열이면 입력해주세요
      // 2. 이메일 형식이 아닐경우 이메일 형식입력하라는 팝업창 띄움
      // 3. 이메일 형식이 맞을 경우 사용가능한 메일이라는 팝업창 뜨우고 버튼 off

      // 가입하기 버튼
      const allCheckSubmit = (e) => {
        e.preventDefault();

        // 1. userId active인가 ? 있으면 확인용 배열에 userid를 넣는다 아니면 return하면서 "아이디 중복체크해주세요"팝업창출력
        $form.querySelector("#userid").classList.contains("active") ? listCheck.push("userid") : popup("아이디를 중복체크 해주세요");
        // 2. email 중복확인 버튼이 off인가 ? 아니면 return하면서 "아이디 중복체크해주세요"팝업창출력
        $form.querySelector("#email").classList.contains("active") ? listCheck.push("email") : popup("email을 중복체크 해주세요");
        // 3. 휴대폰 인증번호 버튼이 off인가 ? 아니면 return하면서 "아이디 중복체크해주세요"팝업창출력
        $form.querySelector("#phonNumber").classList.contains("active") ? listCheck.push("phoneNumber") : popup("휴대폰 인증번호를 확인 해주세요");
        // 4. gender에 하나라도 체크가 되어있는가 ? 아니면 return하면서 "아이디 중복체크해주세요"팝업창출력
        $form.querySelectorAll(".genderList").filter((el) => el.checked === true).length === 1 ? listCheck.push("genderList") : popup("성별을 체크해주세요");
        // 5. 생년월일 input에 각각 값이 입력되어있는가 ? 아니면 return하면서 "아이디 중복체크해주세요"팝업창출력

        // 6. 이밴트가 하나라도 체크가 되어있는가 ? 아니면 return하면서 "아이디 중복체크해주세요"팝업창출력

        // 7. 약관동의 1,2,3에 체크가 되어있는가 ? 아니면 return하면서 "아이디 중복체크해주세요"팝업창출력

        // listCheck배열에 있는 갯수가 n개일 때 가입완료 페이지로 이동한다.
      };
      e.target.className === "signBtn" && allCheckSubmit(e);
    };

    // eventList
    $form.addEventListener("input", inputHandler);
    $form.addEventListener("click", clickHandler);
  };
})();

signupFunc();
// const clickHandler = (e) => {
//   e.preventDefault();
//   e.target.tagName === "BUTTON" && popup("text");
//   e.target.dataset.close === "close" && popup();
// };
