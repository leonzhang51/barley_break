/**
 * Summary: Afficher tout contenu de page
 *
 * @auteur  Zhang Lie    
 * @class Barley
 * @date  06/03/2019
 *
 * @fires   changerTableau()
 * @listens click
 * @listens className~event:eventName
 *
 * @method shuffleTableau  randomize (shuffle) un tableau 
 * @method afficherTableau  afficher le contenu du tableau sur la page pour créer la carte d'échecs
 * @param {tableau}  numero      valeur initiale
 * @param {tableau}  barleyTravailTableau      valeur de travail tableu après fini jouer ce tableau sera vide 
 * @param {entier}   record         le record qui utilise le moins de pas pour terminer le jeu
 * @param {entier}   step           Le numéro de l'étape pour l'utilisateur travaillant sur ce jeu
 * 
 */

class Barley { //create vue de le jeu
    constructor(){
        this.numero = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 'test'];
        this.barleyTravailTableau = localStorage.getItem('travailTableau'); //obtinir donnee de localstorage
        this.barleyTravailTableau = this.barleyTravailTableau.split(","); //changer le type de données de chaîne en tableau
        this.record=localStorage.getItem('record'); 
        this.etap = localStorage.getItem('etap');
    }
    
    shuffleTableau(array) { //randomize (shuffle) un tableau JavaScript
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    afficherTableau() {
        this.barleyTravailTableau = localStorage.getItem('travailTableau'); //obtinir donnee de localstorage
        this.barleyTravailTableau = this.barleyTravailTableau.split(","); //changer le type de données de chaîne en tableau
        //afficher donne de etap qui utilise et record
        document.getElementById("record").innerHTML = "Le meilleur record est: " + localStorage.getItem("record") +" Par "+localStorage.getItem("nom");
        document.getElementById("etap").innerHTML = "Vous avez utilisé " + localStorage.getItem("etap") + " étapes maintenant ";
        if (this.barleyTravailTableau === undefined || this.barleyTravailTableau.length == 0||this.barleyTravailTableau[0] === "") {
            
            this.shuffleTableau(this.numero); //randomize tableau
            this.barleyTravailTableau = this.numero;
            localStorage.setItem("travailTableau", this.barleyTravailTableau);
            
        }

        
        for (let i = 0; i < this.barleyTravailTableau.length; i++) { //afficher carte d'échecs
            
            var oDiv = document.createElement("button");
            oDiv.setAttribute("class", "w3-col m3 w3-blue  w3-badge w3-large ");
            oDiv.setAttribute("id", i);
            oDiv.innerHTML = this.barleyTravailTableau[i];

            document.getElementById("grid").appendChild(oDiv);
            var testEle = document.getElementById(i);
//            var testArray = this.barleyTravailTableau;
            
            //ajouter un eventlistener à un élément sauf null
            if (this.barleyTravailTableau[i] !== 'test') {
                testEle.addEventListener("click", (Event) =>{
                    var elementId = Event.target.id;
                    
                    changerTableau(elementId, this.barleyTravailTableau);

                    //console.log(Event.target.id);
                });
            }

        }


    }



}
/**
 * Summary: obtenir la position de l'élément sur lequel on clique puis faire une réaction
 *
 * @auteur  Zhang Lie    
 * @class Position_a_null
 * @date  06/03/2019
 *
 * @method shuffleTableau  randomize (shuffle) un tableau 
 * @method afficherTableau  afficher le contenu du tableau sur la page pour créer la carte d'échecs
 * @param {entier}  elementCliqueId      le nombre de index dans tableau sur lequel il faut cliquer 
 * @param {tableau}  positionTableau      valeur de travail tableu après fini jouer ce tableau sera vide 
 * @param {entier}   record         le record qui utilise le moins de pas pour terminer le jeu
 * @param {entier}   step           Le numéro de l'étape pour l'utilisateur travaillant sur ce jeu
 * 
 */
class Position_a_null {
    constructor(elementCliqueId, travailTableau) {
        this.elementCliqueId = elementCliqueId;
        this.positionTableau = travailTableau;
        this.etap = localStorage.getItem("etap");
        this.record = localStorage.getItem('record');

    }

    positionActuelle() {
        
 

        //clique element dans deuxième ou troisième rangée
        if (parseInt(this.elementCliqueId) > 3 && parseInt(this.elementCliqueId) < 12) { ////dans les deuxième et troisième rangées

            if (parseInt(this.elementCliqueId) % 4 != 0 && parseInt(this.elementCliqueId) % 4 != 3) { //dans la deuxième et troisième colonne
                if (this.positionTableau[parseInt(this.elementCliqueId) - 1] == 'test') {
                    this.positionTableau[parseInt(this.elementCliqueId) - 1] = this.positionTableau[parseInt(this.elementCliqueId)];
                    this.positionTableau[parseInt(this.elementCliqueId)] = 'test';
                    this.etap++;
                    localStorage.setItem('etap',this.etap);
                }
                if (this.positionTableau[parseInt(this.elementCliqueId) + 1] == 'test') {
                    this.positionTableau[parseInt(this.elementCliqueId) + 1] = this.positionTableau[parseInt(this.elementCliqueId)];
                    this.positionTableau[parseInt(this.elementCliqueId)] = 'test';
                     this.etap++;
                    localStorage.setItem('etap',this.etap);
                }
                if (this.positionTableau[parseInt(this.elementCliqueId) - 4] == "test") {

                    this.positionTableau[parseInt(this.elementCliqueId) - 4] = this.positionTableau[parseInt(this.elementCliqueId)];

                    this.positionTableau[parseInt(this.elementCliqueId)] = 'test';
                     this.etap++;
                    localStorage.setItem('etap',this.etap);
                }
                if (this.positionTableau[parseInt(this.elementCliqueId) + 4] == 'test') {
                    this.positionTableau[parseInt(this.elementCliqueId) + 4] = this.positionTableau[parseInt(this.elementCliqueId)];
                    this.positionTableau[parseInt(this.elementCliqueId)] = 'test';
                     this.etap++;
                    localStorage.setItem('etap',this.etap);
                }
            } else {
                if (parseInt(this.elementCliqueId) % 4 == 0) { //au bout du côté gauche
                    if (this.positionTableau[parseInt(this.elementCliqueId) + 1] == 'test') {
                        this.positionTableau[parseInt(this.elementCliqueId) + 1] = this.positionTableau[parseInt(this.elementCliqueId)];
                        this.positionTableau[parseInt(this.elementCliqueId)] = 'test';
                         this.etap++;
                        localStorage.setItem('etap',this.etap);
                    }
                    if (this.positionTableau[parseInt(this.elementCliqueId) - 4] == 'test') {
                        this.positionTableau[parseInt(this.elementCliqueId) - 4] = this.positionTableau[parseInt(this.elementCliqueId)];
                        this.positionTableau[parseInt(this.elementCliqueId)] = 'test';
                         this.etap++;
                        localStorage.setItem('etap',this.etap);
                    }
                    if (this.positionTableau[parseInt(this.elementCliqueId) + 4] == 'test') {
                        this.positionTableau[parseInt(this.elementCliqueId) + 4] = this.positionTableau[parseInt(this.elementCliqueId)];
                        this.positionTableau[parseInt(this.elementCliqueId)] = 'test';
                         this.etap++;
                        localStorage.setItem('etap',this.etap);
                    }
                } else { //au bout du côté droit

                    if (this.positionTableau[parseInt(this.elementCliqueId) - 1] === 'test') {

                        this.positionTableau[parseInt(this.elementCliqueId) - 1] = this.positionTableau[parseInt(this.elementCliqueId)];
                        this.positionTableau[parseInt(this.elementCliqueId)] = 'test';
                         this.etap++;
                        localStorage.setItem('etap',this.etap);
                    }
                    if (this.positionTableau[parseInt(this.elementCliqueId) - 4] == 'test') {

                        this.positionTableau[parseInt(this.elementCliqueId) - 4] = this.positionTableau[parseInt(this.elementCliqueId)];
                        this.positionTableau[parseInt(this.elementCliqueId)] = 'test';
                         this.etap++;
                        localStorage.setItem('etap',this.etap);
                    }
                    if (this.positionTableau[parseInt(this.elementCliqueId) + 4] == 'test') {
                        this.positionTableau[parseInt(this.elementCliqueId) + 4] = this.positionTableau[parseInt(this.elementCliqueId)];
                        this.positionTableau[parseInt(this.elementCliqueId)] = 'test';
                         this.etap++;
                        localStorage.setItem('etap',this.etap);
                    }
                }
            }
        }
        //clique element dans première rangée
        if (parseInt(this.elementCliqueId) <= 3) {
           
            if (parseInt(this.elementCliqueId) % 4 !== 0 && parseInt(this.elementCliqueId) % 4 !== 3) { //dans la deuxième et troisième colonne
                if (this.positionTableau[parseInt(this.elementCliqueId) - 1] === 'test') {
                    
                    this.positionTableau[parseInt(this.elementCliqueId) - 1] = this.positionTableau[parseInt(this.elementCliqueId)];
                    this.positionTableau[parseInt(this.elementCliqueId)] = 'test';
                     this.etap++;
                    localStorage.setItem('etap',this.etap);
                    
                }
                if (this.positionTableau[parseInt(this.elementCliqueId) + 1] === 'test') {
                     
                    this.positionTableau[parseInt(this.elementCliqueId) + 1] = this.positionTableau[parseInt(this.elementCliqueId)];
                    this.positionTableau[parseInt(this.elementCliqueId)] = 'test';
                    this.etap++;
                    localStorage.setItem('etap',this.etap);
                    
                }

                if (this.positionTableau[parseInt(this.elementCliqueId) + 4] === 'test') {

                    this.positionTableau[parseInt(this.elementCliqueId) + 4] = this.positionTableau[parseInt(this.elementCliqueId)];
                    this.positionTableau[parseInt(this.elementCliqueId)] = 'test';
                     this.etap++;
                    localStorage.setItem('etap',this.etap);
                }
            }
            if (parseInt(this.elementCliqueId) % 4 === 0) { //au bout du côté gauche
                if (this.positionTableau[parseInt(this.elementCliqueId) + 1] === 'test') {
                    this.positionTableau[parseInt(this.elementCliqueId) + 1] = this.positionTableau[parseInt(this.elementCliqueId)];
                    this.positionTableau[parseInt(this.elementCliqueId)] = 'test';
                     this.etap++;
                    localStorage.setItem('etap',this.etap);
                    
                }

                if (this.positionTableau[parseInt(this.elementCliqueId) + 4] == 'test') {
                    this.positionTableau[parseInt(this.elementCliqueId) + 4] = this.positionTableau[parseInt(this.elementCliqueId)];
                    this.positionTableau[parseInt(this.elementCliqueId)] = 'test';
                     this.etap++;
                    localStorage.setItem('etap',this.etap);
                }
            }
            if (parseInt(this.elementCliqueId) % 4 === 3) { //au bout du côté droit
                
                if (this.positionTableau[parseInt(this.elementCliqueId) - 1] === 'test') {
                    
                    this.positionTableau[parseInt(this.elementCliqueId) - 1] = this.positionTableau[parseInt(this.elementCliqueId)];
                    this.positionTableau[parseInt(this.elementCliqueId)] = 'test';
                     this.etap++;
                    localStorage.setItem('etap',this.etap);
                    

                }
                if (this.positionTableau[parseInt(this.elementCliqueId) + 4] == 'test') {
                    
                    this.positionTableau[parseInt(this.elementCliqueId) + 4] = this.positionTableau[parseInt(this.elementCliqueId)];
                    this.positionTableau[parseInt(this.elementCliqueId)] = 'test';
                     this.etap++;
                    localStorage.setItem('etap',this.etap);
                }

            }


        }

        //clique element dans quatrième rangée
        if (parseInt(this.elementCliqueId) >= 12) {
             
            if (parseInt(this.elementCliqueId) % 4 != 0 && parseInt(this.elementCliqueId) % 4 != 3) { //dans la deuxième et troisième colonne
                if (this.positionTableau[parseInt(this.elementCliqueId) - 1] == 'test') {
                    this.positionTableau[parseInt(this.elementCliqueId) - 1] = this.positionTableau[parseInt(this.elementCliqueId)];
                    this.positionTableau[parseInt(this.elementCliqueId)] = 'test';
                     this.etap++;
                    localStorage.setItem('etap',this.etap);
                }
                if (this.positionTableau[parseInt(this.elementCliqueId) + 1] == 'test') {
                    this.positionTableau[parseInt(this.elementCliqueId) + 1] = this.positionTableau[parseInt(this.elementCliqueId)];
                    this.positionTableau[parseInt(this.elementCliqueId)] = 'test';
                     this.etap++;
                    localStorage.setItem('etap',this.etap);
                }
                if (this.positionTableau[parseInt(this.elementCliqueId) - 4] == 'test') {
                    this.positionTableau[parseInt(this.elementCliqueId) - 4] = this.positionTableau[parseInt(this.elementCliqueId)];
                    this.positionTableau[parseInt(this.elementCliqueId)] = 'test';
                     this.etap++;
                    localStorage.setItem('etap',this.etap);
                }

            } else {
                if (parseInt(this.elementCliqueId) % 4 == 0) { //au bout du côté gauche
                    if (this.positionTableau[parseInt(this.elementCliqueId) + 1] == 'test') {
                        this.positionTableau[parseInt(this.elementCliqueId) + 1] = this.positionTableau[parseInt(this.elementCliqueId)];
                        this.positionTableau[parseInt(this.elementCliqueId)] = 'test';
                         this.etap++;
                        localStorage.setItem('etap',this.etap);
                    }
                    if (this.positionTableau[parseInt(this.elementCliqueId) - 4] == 'test') {
                        this.positionTableau[parseInt(this.elementCliqueId) - 4] = this.positionTableau[parseInt(this.elementCliqueId)];
                        this.positionTableau[parseInt(this.elementCliqueId)] = 'test';
                         this.etap++;
                        localStorage.setItem('etap',this.etap);
                    }

                } else { //au bout du côté droit
                    
                    if (this.positionTableau[parseInt(this.elementCliqueId) - 1] == 'test') {
                       
                        this.positionTableau[parseInt(this.elementCliqueId) - 1] = this.positionTableau[parseInt(this.elementCliqueId)];
                        this.positionTableau[parseInt(this.elementCliqueId)] = 'test';
                         this.etap++;
                        localStorage.setItem('etap',this.etap);
                    }
                    if (this.positionTableau[parseInt(this.elementCliqueId) - 4] == 'test') {

                        this.positionTableau[parseInt(this.elementCliqueId) - 4] = this.positionTableau[parseInt(this.elementCliqueId)];
                        this.positionTableau[parseInt(this.elementCliqueId)] = 'test';
                         this.etap++;
                        localStorage.setItem('etap',this.etap);
                    }

                }
            }
        }
        localStorage.setItem("travailTableau", this.positionTableau);
        //console.log("show data in class postion and value is " + this.positionTableau[parseInt(this.elementCliqueId)]);
        //console.log("array id " + parseInt(this.elementCliqueId));
    }
}
/**
 * Summary: vérifier 2 tableaux si égaux, vérifier le résultat du jeu
 *
 * @auteur  Zhang Lie    
 * @class validation
 * @date  06/03/2019
 *
 * @method comparerTableau  comparer 2 tableau si egal 
 * @param {tableau}  tableau1      reponse de jeu
 * @param {tableau}  tableau2      valeur de travail tableu après fini jouer ce tableau sera vide 
 * 
 */
class validation{
    constructor(tableau1,tableau2){
        this.tableau1 = tableau1;
        this.tableau2 = tableau2;
    }
    comparerTableau(){
        let counterTableauElement =0;
        let nouvelRecord=0;
        let vieuxRecord=0
        for(let i=0;i<this.tableau1.length;i++){
            if(this.tableau1[i]!=this.tableau2[i]){
                document.getElementById("result").textContent="continue de travailler!";
                return false;
            }
            counterTableauElement++;
        }
        
        if(counterTableauElement==this.tableau1.length)
            document.getElementById("result").textContent="tu l'as fait";
            nouvelRecord = parseInt(localStorage.getItem('etap'));
            let videTableau = [];
            localStorage.setItem('travailTableau',videTableau);
            vieuxRecord = parseInt(localStorage.getItem('record'));
            let nomJouer = prompt("entrez votre nom Svp!");
            localStorage.setItem('nom',nomJouer);
            if(vieuxRecord!=0&&nouvelRecord!=0){
                
                if(vieuxRecord > nouvelRecord){
                    localStorage.setItem('record',nouvelRecord);
                }
            }
            else{
                
                localStorage.setItem('record',nouvelRecord);
            }
            
    }
}

/**
 * Summary: objet instantané par paramètre puis afficher le contenu sur la page
 *
 * @auteur  Zhang Lie    
 * @fonction changerTableau
 * @date  06/03/2019
 *
 * @param {entier}  id      le nombre de index dans tableau sur lequel il faut cliquer 
 * @param {tableau}  travailTableau      valeur de travail tableu après fini jouer ce tableau sera vide 
 * 
 */
function changerTableau(id, travailTableau) { // clique element puis changer valeur de tableu si possible
    var oPosition_a_null = new Position_a_null(id, travailTableau);
    oPosition_a_null.positionActuelle();
    document.getElementById("grid").remove(); //supprimer element grid
    var oDiv = document.createElement("div"); //create element grid
    oDiv.setAttribute("class", "w3-row ");
    oDiv.setAttribute("id", "grid");
    oDiv.setAttribute("style","width: 20%")
    document.body.appendChild(oDiv);
    var oBarley = new Barley();
    oBarley.afficherTableau();
    let response=localStorage.getItem("response").split(",");
    var oValidation =  new validation(response,travailTableau);
    oValidation.comparerTableau();
}

/**
 * Summary: fonction de démarrage du système
 *
 * @auteur  Zhang Lie    
 * @fonction commencer
 * @date  06/03/2019
 *
 * 
 */
function commencer() {
    init();
    var oTest = new Barley();
    oTest.afficherTableau();

}

/**
 * Summary: initialiser le paramètre du système
 *
 * @auteur  Zhang Lie    
 * @fonction init
 * @date  06/03/2019
 *
 * 
 */
function init() {
    var oBarley = new Barley();
    var response = oBarley.numero;
    var etap = 0;
    var record;
    
    var travailTableau = localStorage.getItem('travailTableau');
    
    //tableau pour test
    //var travailTableau = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,'test',15];
    if (travailTableau === null ||travailTableau[0] === "") {

        travailTableau = oBarley.shuffleTableau(response);
        

    }
    // Check browser support
    if (typeof (Storage) !== "undefined") {
        
        // Store
        if (typeof (localStorage.getItem("response")) !== "undefined")
            localStorage.setItem("response", response);
        if (typeof (localStorage.getItem("record")) !== "undefined")
            
            if(parseInt(localStorage.getItem("record"))<=0){
                
                 record = 0;
                 localStorage.setItem("record", record);
            }
           
           
        
        if (typeof (localStorage.getItem("etap")) !== "undefined")
            localStorage.setItem("etap", etap);
        if (typeof (localStorage.getItem("travailTableau")) !== "undefined")
            localStorage.setItem("travailTableau", travailTableau);
            //localStorage.setItem('nom','daka');
        // Retrieve
        //document.getElementById("result").innerHTML = localStorage.getItem("response");
        document.getElementById("record").innerHTML = "Le meilleur record est: " + localStorage.getItem("record");
        document.getElementById("etap").innerHTML = "Vous avez utilisé " + localStorage.getItem("etap") + " étapes maintenant ";
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
}
