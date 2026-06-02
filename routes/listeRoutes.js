////////////// USER //////////////
//Voir les users
http://localhost:3000/api/users/userGet

//Créer un user
http://localhost:3000/api/users/userCreate
syntaxe:
{
    "firstName": "Sonia",
        "lastName": "Heagenwood",
            "email": "sonia.eagenwood@outlook.fr",
                "password": "soniaHeagengardelapeche",
                    "roles": [
                        "ROLE_MANAGER"
                    ]
}

Listes:
{
    "email": "sonia.eagenwood@outlook.fr",
        "password": "soniaHeagengardelapeche"
}

{
    "email": "adenis.peuplier@outlook.fr",
        "password": "vivelesvents"
}
///
{
    "email": "antoine.lemeunier@outlook.fr",
        "password": "ons'enfout"
}
{
    "email": "james.lebrun@outlook.fr",
        "password": "aucoeurdespaquerettes"
}
{

    "email": "octavia.borsdorf@outlook.fr",
        "password": "oplasgies"
}
{
    "email": "benjamin.button@outlook.fr",
        "password": "otriton"
}





//Connexion
http://localhost:3000/api/users/login
{
    "email": "sonia.eagenwood@outlook.fr",
        "password": "soniaHeagengardelapeche"
}


////////////// PROJECT //////////////

//Récupère tous
http://localhost:3000/api/projet/projetGetAll

//Créer un projet
http://localhost:3000/api/projet/projetCreate
syntaxe:
{
    "title": "Affectation de pôle",
        "description": "Retrouver les discordances de faille sur rotor",
            "status": "Actif",
                "owner": "6a15a2e27c24e7466ce35145",
                    "members": [
                        "6a15a2457c24e7466ce35144",
                        "6a15b44a45825ac3b875ede0"
                    ]
}

//Lire le project en fonct° de l'id
http://localhost:3000/api/projet/(rentrer l'id du projet ici)
