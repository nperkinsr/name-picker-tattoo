document.addEventListener("DOMContentLoaded", function () {
  const pickNameButton = document.getElementById("pickNameButton");
  const nameInput = document.getElementById("nameInput");
  const resultSpan = document.querySelector(".name textPath");
  const registerSound = document.getElementById("register");
  const buzzingSound = document.getElementById("buzzing");

  function capitalizeName(name) {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  pickNameButton.addEventListener("click", function () {
    let names = nameInput.value
      .split("\n")
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    if (names.length === 0) {
      alert("Please enter at least one name.");
      return;
    }

    // Randomiser
    const finalName = capitalizeName(
      names[Math.floor(Math.random() * names.length)]
    );

    let revealedText = finalName
      .split("")
      .map(() => "<tspan class='underscore'>_</tspan>")
      .join("");
    resultSpan.innerHTML = revealedText;

    let index = 0;
    buzzingSound.play();

    const interval = setInterval(() => {
      if (index < finalName.length) {
        revealedText =
          finalName.slice(0, index + 1) +
          "<tspan class='underscore'>_</tspan>".repeat(
            finalName.length - index - 1
          );
        resultSpan.innerHTML = revealedText;
        index++;
      } else {
        clearInterval(interval);
        buzzingSound.pause();
        buzzingSound.currentTime = 0;
        registerSound.play();
        resultSpan.classList.add("revealed");
      }
    }, 400);
  });
});
