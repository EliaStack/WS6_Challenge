//Créer une tâche
http://localhost:3000/api/task/taskCreate
syntaxe :
{
    "title": "Tâche 1 : Test de création",
    "description": "Il faut décrire en gros",
    "priority": "low", 
    "status": "open", 
    "project": "6a310f2cf2e50cb9dccb8bf9" ,
    "assignee": "6a1ea98dafcd4190a759c79f",
    "tags": "6a31475e834c174cb162eb1d"
}

//Récupérer une tâche
http://localhost:3000/api/task/(rentrer l'id de la tâche ici)

//Modifier
http://localhost:3000/api/task/(rentrer l'id de la tâche ici)
syntaxe :
{
        "priority": "hight"
}

//Récupérer tout
http://localhost:3000/api/task/taskGetAll

//Delete une tâche
http://localhost:3000/api/task/(rentrer l'id de la tâche ici)


//Associer un tag à une tâche 
http://localhost:3000/api/task/(id de la tâche)/tags/add/(id du tag)


//Dissocier un tag d'une tâche 
http://localhost:3000/api/task/(id de la tâche)/tags/add/(id du tag)






