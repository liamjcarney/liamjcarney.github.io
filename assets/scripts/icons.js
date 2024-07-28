const icons = [
    "x",
    "left",
    "right",
    "amazon-music",
    "apple-music",
    "bandcamp",
    "instagram",
    "linkedin",
    "soundcloud",
    "spotify",
    "youtube",
    "yt-music",
    "twitter"
  ];

  icons.forEach(icon => {
    document.querySelectorAll(`.${icon}`).forEach(element => {
      fetch(`assets/svg/${icon}.svg`)
        .then(response => response.text())
        .then(data => {
          element.innerHTML = data;
        })
    })
  });