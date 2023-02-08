const signupFunc = (() => {
  const $form = document.querySelector(".signform");
  const $birthDays = [...$form.querySelector(".dateWrap").children];
  const $popup = $form.querySelector(".popWrap");
  const [$userid, $pwd, $pwdCheck, $name, $eamil, $phonNumber] = $form.querySelectorAll(".in");
  let idNum = 0;

  // 에러 메세지 리스트
  const errPopup = [
    "6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합",
    "비밀번호 영문 숫자 조합 8자리 이상",
    "동일한 비밀번호를 입력",
    "이름을 입력해 주세요",
    "이메일 형식으로 입력해 주세요",
    "잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요.",
  ];

  // 랜덤 아이디 생성
  const rand = Math.random().toString(36).substring(2, 11);

  const createPopup = (text) => {
    if (!$popup.classList.contains("active")) {
      $popup.querySelector("h2").textContent = text;
      $popup.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  };

  $birthDays.forEach((el) => el.addEventListener("input", (e) => (el.value = e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1"))));

  const createErr = (target, msgNum) => (target.closest("td").querySelector("p").textContent = errPopup[msgNum]);
  const removeErr = (target, msg = "") => (target.closest("td").querySelector("p").textContent = msg);

  const checkErr = (target, regExp, errNum) => {
    if (!regExp.test(target.value)) target.closest("td").querySelector("p").textContent = errPopup[errNum];
    if (target.value.length === 0 || regExp.test(target.value)) target.closest("td").querySelector("p").textContent = "";
  };

  const linkStart = (url) => {
    let link = document.createElement("a");
    link.href = url;
    link.className = "go";
    document.body.append(link);
    document.querySelector(".go").click();
  };

  const allCheck = (target, bool) =>
    target
      .closest(".column")
      .querySelectorAll("input[type=checkbox]")
      .forEach((el) => (el.checked = bool));

  const allCheckSubmit = () => {
    const result = {
      useridReulst: isUserid($userid), // 유저아이디
      pwdResult: isPwd($pwd), // 비밀번호 확인
      pwdCheckResult: isPwdCheck($pwdCheck), // 비밀번호 체크 확인
      nameReulst: isName($name), // 이름 확인
      emailResult: isEmail($eamil), // 이메일 확인
      phoneNumberResult: isPhoneNumber($phonNumber),
      genderResult: !![...$form.querySelectorAll(".genderList > input[type=radio]")].filter((el) => el.checked === true).length, // 성별체크
      yearResult: $birthDays[0].value.length === 4 && $birthDays[1].value.length === 2 && $birthDays[2].value.length === 2, // 생년월일 입력값 체크
      additionalResult: [...$form.querySelectorAll(".additional > input[type=radio]")].filter((el) => el.checked === true).length === 1,
      agreeResult: [...$form.querySelectorAll(".essential")].filter((el) => el.checked === true).length === $form.querySelectorAll(".essential").length,
    };
    const { useridReulst, pwdResult, nameReulst, pwdCheckResult, emailResult, phoneNumberResult, genderResult, yearResult, additionalResult, agreeResult } = result;
    console.log(useridReulst, pwdResult, nameReulst, pwdCheckResult, emailResult, phoneNumberResult, genderResult, yearResult, additionalResult, agreeResult);

    if (useridReulst && pwdResult && nameReulst && pwdCheckResult && emailResult && phoneNumberResult && genderResult && yearResult && additionalResult && agreeResult) {
      // localStorage.setItem(idNum++, {});
      linkStart("../../index.html"); // 메인 페이지로 이동
    }
  };

  const inputChecked = {
    // 아이디 체크
    isUserid(id) {
      const regExp = /^(?=.*[a-zA-Z])[a-zA-Z\d]{6,}$/;
      checkErr(id, regExp, 0);
      return regExp.test(id.value);
    },
    // 비밀번호 체크
    isPwd(pwd) {
      const regExp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{10,}$/;
      checkErr(pwd, regExp, 1);
      return regExp.test(pwd.value);
    },
    // 비밀번호 재확인
    isPwdCheck(pwdCheck) {
      pwdCheck.value !== $pwdCheck.value ? createErr(pwdCheck, 2) : removeErr(pwdCheck);
      !pwdCheck.value.length && removeErr(pwdCheck, "비밀번호를 한번 더 확인해주세요");
      return !!pwdCheck.value;
    },
    // 이름확인
    isName(name) {
      !name.value.length ? createErr(name, 3) : removeErr(name);
      return !!name.value;
    },
    // 이메일 확인
    isEmail(email) {
      const regExp = /^[^@]+@[^@.]+.+[^.]+$/;
      checkErr(email, regExp, 4);
      return regExp.test(email.value);
    },
    // 휴대폰 번호 확인
    isPhoneNumber(number) {
      const regExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
      checkErr(number, regExp, 5);
      return regExp.test(number.value);
    },
  };
  const { isUserid, isPwd, isPwdCheck, isName, isEmail, isPhoneNumber } = inputChecked;

  return () => {
    const inputHandler = (e) => {
      e.target.id === "userid" && isUserid(e.target);
      e.target.id === "pwd" && isPwd(e.target);
      e.target.id === "pwdCheck" && isPwdCheck(e.target);
      e.target.id === "name" && isName(e.target);
      e.target.id === "email" && isEmail(e.target);
      e.target.id === "phonNumber" && isPhoneNumber(e.target);
    };

    const clickHandler = (e) => {
      if (e.target.className === "close") {
        $popup.classList.remove("active");
        document.body.style.overflow = "visible";
      }

      // buttonClick
      if (e.target.tagName === "BUTTON") {
        e.preventDefault();

        // userid 중복확인 버튼
        if (e.target.className === "userid-check") {
          // ...
        }

        // email 중복확인 버튼
        if (e.target.dataset.email === "email") {
          if (isEmail(e.target.previousElementSibling)) {
            createPopup("사용가능한 이메일입니다");
            e.target.classList.add("off");
          } else if (!e.target.previousElementSibling.value.length) {
            createPopup("이메일을 입력해주세요");
          } else {
            createPopup("이메일 형식으로 입력해주세요");
          }
        }

        //인증번호 전송 버튼
        if (e.target.className === "phoneNumberBtn") {
          if (isPhoneNumber(e.target.previousElementSibling)) createPopup("인증번호가 전송되었습니다.");
        }

        // 가입하기
        e.target.className === "signBtn" && allCheckSubmit();
      }

      // 전체동의
      if (e.target.dataset.check === "check") {
        e.target.name === "agreeAll" && allCheck(e.target, e.target.checked);
        const result = [...$form.querySelectorAll(".required")].filter((el) => el.checked === true);
        result.length === $form.querySelectorAll(".required").length && allCheck(e.target, true);
      }
    };

    // eventList
    $form.addEventListener("input", inputHandler);
    $form.addEventListener("click", clickHandler);
  };
})();

signupFunc();
