const registerButton = document.querySelector("#register");

let usernameCondition, passwordCondition, confirmPassCondition;
//Functions to hover registerButton
const enableRegisterButton = (first, second, third) => {
  if (first && second && third) {
    registerButton.disabled = false;
    document.querySelector("#register p").style.color = "black";
    registerButton.addEventListener("pointerover", () => {
      registerButton.style.backgroundColor = "black";
      document.querySelector("#register p").style.color = "white";
    });
    registerButton.addEventListener("pointerout", () => {
      registerButton.style.backgroundColor = "white";
      document.querySelector("#register p").style.color = "black";
    });
  } else {
    registerButton.disabled = true;
    document.querySelector("#register p").style.color = "silver";
    registerButton.addEventListener("pointerover", () => {
      registerButton.style.backgroundColor = "white";
      document.querySelector("#register p").style.color = "silver";
    });
    registerButton.addEventListener("pointerout", () => {
      registerButton.style.backgroundColor = "white";
      document.querySelector("#register p").style.color = "silver";
    });
  }
};

//Helper functions for checkUsername & checkPassword
const specialChar = "`~!@#$%^&*()-=+{}|[]:;'<>,./?";
//If string contains specialChar, func will return true
const checkSpecialChar = (string) => {
  //Create an array of special char
  let arr = ['"'];
  for (let i = 0; i < specialChar.length; i++) {
    arr.push(specialChar[i]);
  }
  //Loop through string to find if there is any special char
  let letter = 0;
  while (letter < string.length) {
    if (arr.includes(string[letter])) {
      return true;
    } else {
      letter++;
    }
  }
  return false;
};

//If password contains a number, func will return true
const checkNumber = (password) => {
  let i = 0;
  while (i < password.length) {
    if (isNaN(password[i])) {
      i++;
    } else {
      return true;
    }
  }
  return false;
};

//If password contains an uppercase letter, func will return true
const checkUppercase = (password) => {
  let arr = ['"'];
  for (let i = 0; i < specialChar.length; i++) {
    arr.push(specialChar[i]);
  }

  let i = 0;
  while (i < password.length) {
    //Only check the letters in the string excluding specialChar and number
    if (!arr.includes(password[i])) {
      if (isNaN(password[i] * 1)) {
        if (password[i] !== password[i].toUpperCase()) {
          i++;
        } else {
          return true;
        }
      } else i++;
    } else i++;
  }
  return false;
};

//Functions to checkUsername
const checkUsername = (event) => {
  let username = event.target.value;
  usernameCondition = false;
  enableRegisterButton(
    usernameCondition,
    passwordCondition,
    confirmPassCondition
  );

  if (username.length <= 5) {
    document.querySelector("#warn-username").innerHTML =
      "* Username has to contain at least 6 characters";
  } else if (username.length > 5) {
    if (checkSpecialChar(username)) {
      document.querySelector("#warn-username").innerHTML =
        "* Username cannot contain any special characters, except for '_'";
    } else {
      document.querySelector("#warn-username").innerHTML = null;
      usernameCondition = true;
      enableRegisterButton(
        usernameCondition,
        passwordCondition,
        confirmPassCondition
      );
    }
  }
};

//Function to checkPassword
const checkPassword = (event) => {
  let password = event.target.value;
  passwordCondition = false;
  enableRegisterButton(
    usernameCondition,
    passwordCondition,
    confirmPassCondition
  );

  if (password.length <= 9) {
    document.querySelector("#warn-password").innerHTML =
      "* Password must contain at least 10 characters";
  } else if (password.length > 9) {
    if (!checkSpecialChar(password)) {
      document.querySelector("#warn-password").innerHTML =
        "* Password must contain at least 1 special character";
    } else {
      if (!checkNumber(password)) {
        document.querySelector("#warn-password").innerHTML =
          "* Password must contain at least 1 number";
      } else {
        if (!checkUppercase(password)) {
          document.querySelector("#warn-password").innerHTML =
            "* Password must contain at least 1 uppercase letter";
        } else {
          document.querySelector("#warn-password").innerHTML = null;
          passwordCondition = true;
          enableRegisterButton(
            usernameCondition,
            passwordCondition,
            confirmPassCondition
          );
        }
      }
    }
  }
};

//Function to check confirmPass
const checkConfirmPassword = () => {
  let password = document.getElementById("password").value;
  let confirmPass = document.getElementById("confirmPass").value;
  confirmPassCondition = false;
  enableRegisterButton(
    usernameCondition,
    passwordCondition,
    confirmPassCondition
  );
  if (password !== confirmPass) {
    document.getElementById("warn-confirmPass").innerHTML =
      "* Passwords do not match";
  } else {
    document.getElementById("warn-confirmPass").innerHTML = null;
    confirmPassCondition = true;
    enableRegisterButton(
      usernameCondition,
      passwordCondition,
      confirmPassCondition
    );
  }
};

//Function to toggle show & hide password
const toggle = (id) => {
  let target = document.getElementById(id);
  if (target.type === "password") {
    target.type = "text";
    return "Hide";
  } else {
    target.type = "password";
    return "Show";
  }
};

//Load jQuery
$(function () {
  $("#username").keyup(() => {
    document.getElementById("register-success").innerHTML = null;
    document.getElementById("warn-username").innerHTML = null;
    checkUsername(event);
  });
  $("#password").keyup(() => {
    document.getElementById("register-success").innerHTML = null;
    document.getElementById("warn-username").innerHTML = null;
    checkPassword(event);
    checkConfirmPassword(event);
  });
  $("#confirmPass").keyup(() => {
    document.getElementById("register-success").innerHTML = null;
    document.getElementById("warn-username").innerHTML = null;
    checkConfirmPassword(event);
  });
  $("#togglePassword").click(() => {
    document.getElementById("togglePassword").innerHTML = toggle("password");
  });
  $("#toggleConfirmPassword").click(() => {
    document.getElementById("toggleConfirmPassword").innerHTML = toggle(
      "confirmPass"
    );
  });
});
