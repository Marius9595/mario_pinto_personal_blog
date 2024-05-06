import bowser from 'bowser';
const minVersions = {
    "Chrome": "123",
    "Firefox": "120",
    "Safari": "17.5",
    "Internet Explorer": "11",
    "Edge": "123",
    "Opera": "60",
};

const browser = bowser.getParser(window.navigator.userAgent);
const browserName = browser.getBrowserName();

if (minVersions[browserName]) {
    if (!browser.satisfies({ [browserName]: `>=${minVersions[browserName]}` })) {
        alert("Se ha detectado la necesidad de actualizar tu navegador para una mejor, por favor actualiza para mejorar tu" +
            " experiencia con los themes light-dark." +
            "Seguramente estes viendo la página con los estilos no aplicados correctamente. Perdona las molestias 😥😥");
    }
}