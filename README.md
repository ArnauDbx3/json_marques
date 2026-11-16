## Comparació entre convertidor automàtic i conversió manual
Atributs marcats amb @, # i indexats dins altres elements. Nombres de preu, valoracio i estoc marcats com string. 
Llistes com plataforma amb només un element sense ser llista (convertit amb w3schools) [XML to JSON Converter - W3Schools](https://www.w3schools.com/tools/tool_xml_json.php)

## Conversió de JSON a XML
L’atribut codi s’inclou com a nou de l’element fill joc. En comptes d’haver-hi un element pare `<jocs>` amb diversos `<joc>`, 
passa a cada joc ser element pare sense tenir un pare que els agrupi. El mateix passa amb generes i plataformes. 
No hi ha cap etiqueta en tot l’XML i s'han perdut els comentaris. Botiga fa de codi arrel. 
El document no validaria amb el DTD, ja que s’ha perdut tota l’estructura general i atributs i només
hi ha 2 nivells d’indentació a tot el document, mentre que l’original disposava de fins a 5.

## Validació i errors
Al document hi havien diversos errors sintàctics, però la dada errònia que no donava problema de sintaxi era el preu `"24.99"`.
Ja que es troba entre cometes, el valor no dona cap error, però això l'identifica com a string. Perquè sigui realment correcte
s'ha d'escriure sense cometes perquè sigui interpretat com a nombre.

## Càrrega de JSON erroni
Al intentar carregar `cataleg_convertidor.json` a l'HTML apareix error i no funciona. Això es deu principalment als nombres que es tracten com a cadenes de text, els elements que haurien de ser llistes d'elements i les claus com @ i #.
