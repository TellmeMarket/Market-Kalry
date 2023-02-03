const signupFunc = (() => {
  const $form = document.querySelector(".signform");
  const $signBtn = $form.querySelector(".signBtn");
  const $popup = document.querySelector(".popup");

  return () => {
    // 에러 여부에따라 확인 후 에러 제거함수
    const clearErr = (node) => {
      const errMsgs = node.closest("td").querySelector("p");
      errMsgs && node.closest("td").querySelector("p").remove();
    };

    // 팝업창
    const popup = (text) => {
      if (!$popup.classList.contains("active")) {
        $popup.querySelector("p").textContent = text;
        document.body.classList.add("off");
        $popup.classList.add("active");
      } else {
        document.body.classList.remove("off");
        $popup.classList.remove("active");
      }
    };
 
    // userId
    const isTxt = (id, minLen, maxLen) => {
      // 정규식표현
      const idValue = id.value.trim();
      const template = `<p>${minLen}자 이상 ${maxLen}자 이하의 영문 혹은 영문과 숫자를 조합</p>`;
      clearErr(id);
      if (idValue.length >= minLen && idValue.length <= maxLen) console.log(true);
      else if (idValue.length >= 1) id.closest("td").insertAdjacentHTML("beforeend", template);
      else if (idValue.length === 0) clearErr(id);
    };

    // passWord
    const isPwd = (pwd) => {
      const regPass = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10}$/;
      const template = "wafwe";
      console.log(regPass.test(pwd.value));
      clearErr(pwd);
      regPass.test(pwd.value) || pwd.closest("td").insertAdjacentHTML("beforeend", template);
      pwd.value.length === 0 && clearErr(pwd);
    };

    const isPwdCheck = (pwd, minLen) => {
      const regPass = "^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{10}$";

      // if(regPass.test(pwd.))
    };
    const isName = () => {};
    const isEmail = () => {};
    const isPhoneNumber = () => {};

    // inputEvent
    $form.querySelectorAll(".input").forEach((el) => {
      el.addEventListener("input", (e) => {
        // console.log(e.currentTarget.value);
        e.target.id === "userid" && isTxt(e.target, 6, 16);
        e.target.id === "pwd" && isPwd(e.target);
        e.target.id === "pwdCheck" && isPwdCheck(e.target, 10);
        e.target.id === "name" && isName(e.target, 10);
        e.target.id === "email" && isEmail(e.target, 10);
        e.target.id === "phonNumber" && isPhoneNumber(e.target, 10);
      });
    });

    // 전체동의 체크
    const allCheck = (target, bool) => {
      target
        .closest(".column")
        .querySelectorAll("input[type=checkbox]")
        .forEach((el) => (el.checked = bool));
    };

    const clickHandler = (e) => {
      // userId 중복확인 + 팝업
      // 1. userId 중복확인버튼을 눌렀을때 input.vaue가 해당 조건이 아니면 팝업창을 띄움
      // 2. userId 중복확인버튼을 눌렀을때 input.vaue가 해당 조건이 맞으면 팝업창을 띄우고 중복확인 버튼 off

      // email 중복확인 + 팝업
      // 1. email 중복확인버튼을 눌렀을때 빈문자열이면 입력해주세요
      // 2. 이메일 형식이 아닐경우 이메일 형식입력하라는 팝업창 띄움
      // 3. 이메일 형식이 맞을 경우 사용가능한 메일이라는 팝업창 뜨우고 버튼 off

      // 전체동의
      if (e.target.id === "agreeAll") {
        if (e.target.checked === true) allCheck(e.target, true);
        else allCheck(e.target, false);
      }

      // 가입하기 버튼
      // 1. userId 중복확인 버튼이 off인가 ? 아니면 return하면서 "아이디 중복체크해주세요"팝업창출력
      // 2. email 중복확인 버튼이 off인가 ? 아니면 return하면서 "아이디 중복체크해주세요"팝업창출력
      // 3. 휴대폰 인증번호 버튼이 off인가 ? 아니면 return하면서 "아이디 중복체크해주세요"팝업창출력
      // 4. gender에 하나라도 체크가 되어있는가 ? 아니면 return하면서 "아이디 중복체크해주세요"팝업창출력
      // 5. 생년월일 input에 각각 값이 입력되어있는가 ? 아니면 return하면서 "아이디 중복체크해주세요"팝업창출력
      // 6. 이밴트가 하나라도 체크가 되어있는가 ? 아니면 return하면서 "아이디 중복체크해주세요"팝업창출력
      // 7. 약관동의 1,2,3에 체크가 되어있는가 ? 아니면 return하면서 "아이디 중복체크해주세요"팝업창출력
    };

    $form.addEventListener("click", clickHandler);
  };
})();
signupFunc();

// const clickHandler = (e) => {
//   e.preventDefault();
//   e.target.tagName === "BUTTON" && popup("text");
//   e.target.dataset.close === "close" && popup();
// };
