const TIPUS_IVA = 21;

// Funció per calcular el preu amb IVA
function calculaPreuAmbIva(preu) {
    return preu + (preu * TIPUS_IVA / 100);
}

const inputFitxer = document.querySelector('#fitxer');
const contenidor = document.querySelector('#cataleg');
const comptador = document.querySelector('#comptador-resultats');
const titolBotiga = document.querySelector('#titol-botiga');

inputFitxer.addEventListener('change', () => {
    const fitxer = inputFitxer.files[0];
    if (!fitxer) return;

    const lector = new FileReader();
    lector.addEventListener('load', () => {
        try {
            const dades = JSON.parse(lector.result);
            contenidor.replaceChildren();

            // Comprovació d'estructura del JSON fet a mà
            if (!dades.botiga || !Array.isArray(dades.botiga.jocs)) {
                throw new Error("L'estructura del JSON no coincideix amb el format esperat de la botiga.");
            }

            // Mostrar informació de la botiga
            titolBotiga.textContent = "Catàleg de " + dades.botiga.nom + " (" + dades.botiga.tipus + ")";

            const llistaJocs = dades.botiga.jocs;
            comptador.textContent = "Mostrant " + llistaJocs.length + " de " + llistaJocs.length + " jocs";

            llistaJocs.forEach(joc => {
                const targeta = document.createElement("article");
                targeta.classList.add("joc");

                // Classes d'estoc baix o esgotat
                if (joc.estoc < 5) {
                    targeta.classList.add("estoc-baix");
                }
                if (joc.disponible === false) {
                    targeta.classList.add("esgotat");
                }

                // Codi
                const pCodi = document.createElement("p");
                const strongCodi = document.createElement("strong");
                strongCodi.textContent = "Codi: ";
                pCodi.appendChild(strongCodi);
                pCodi.appendChild(document.createTextNode(joc.codi));
                targeta.appendChild(pCodi);

                // Títol
                const titol = document.createElement("h3");
                titol.textContent = joc.nom;
                targeta.appendChild(titol);

                // Gèneres (array recorregut amb join)
                const pGenere = document.createElement("p");
                const strongGenere = document.createElement("strong");
                strongGenere.textContent = "Gèneres: ";
                pGenere.appendChild(strongGenere);
                pGenere.appendChild(document.createTextNode(joc.generes.join(", ")));
                targeta.appendChild(pGenere);

                // Plataformes (array recorregut amb join)
                const pPlat = document.createElement("p");
                const strongPlat = document.createElement("strong");
                strongPlat.textContent = "Plataforma: ";
                pPlat.appendChild(strongPlat);
                pPlat.appendChild(document.createTextNode(joc.plataformes.join(", ")));
                targeta.appendChild(pPlat);

                // Preu amb IVA i dos decimals
                const pPreu = document.createElement("p");
                pPreu.classList.add("preu");
                const strongPreu = document.createElement("strong");
                strongPreu.textContent = "Preu: ";
                pPreu.appendChild(strongPreu);
                
                if (joc.disponible === false) {
                    pPreu.appendChild(document.createTextNode("<<<Esgotat>>>"));
                } else {
                    pPreu.appendChild(document.createTextNode(calculaPreuAmbIva(joc.preu).toFixed(2) + " " + dades.botiga.divisa));
                }
                targeta.appendChild(pPreu);

                // Valoració
                const pVal = document.createElement("p");
                const strongVal = document.createElement("strong");
                strongVal.textContent = "Valoració: ";
                pVal.appendChild(strongVal);
                pVal.appendChild(document.createTextNode(joc.valoracio + " / 5"));
                targeta.appendChild(pVal);

                // Estoc
                const pEstoc = document.createElement("p");
                const strongEstoc = document.createElement("strong");
                strongEstoc.textContent = "Estoc: ";
                pEstoc.appendChild(strongEstoc);
                pEstoc.appendChild(document.createTextNode(joc.estoc));
                targeta.appendChild(pEstoc);

                // Descripció
                if (joc.descripcio) {
                    const pDesc = document.createElement("p");
                    const strongDesc = document.createElement("strong");
                    strongDesc.textContent = "Descripció: ";
                    pDesc.appendChild(strongDesc);
                    pDesc.appendChild(document.createTextNode(joc.descripcio));
                    targeta.appendChild(pDesc);
                }

                contenidor.appendChild(targeta);
            });

        } catch (error) {
            contenidor.replaceChildren();
            comptador.textContent = "No s'ha pogut llegir el fitxer o el format no és vàlid: " + error.message;
        }
    });

    lector.readAsText(fitxer);
});