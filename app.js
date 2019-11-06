const myApp = angular.module('connexion', []);

myApp.controller("myController", function ($scope, $location, $http) {

    // résultat du formulaire dans $scope.connexion
    $scope.connexion = angular.copy();

    // formulaire 
    $scope.connexionForm = function () {

        // requête http pour s'identifier
        $http.post('/users/login', $scope.connexion)
            .success(onSuccess)
            .error(onError);
    };

    const onSuccess = function (data, status, headers, config) {
        $scope.data = data; // sauvegarde des données dans la propriété data de l'objet $scope
        
        // si le serveur retourne la valeur true (courriel et mot de passe correspondent avec ceux dans la BDD)
        if (data.success) {
            $location.path(data.id); // routage vers l'id de l'utilisateur
            alert("Connexion réussi !");
        } else {
            alert(data.status);
        }
    };

    const onError = function (data, status, headers, config) {
        $scope.error = status;
    }

    // boutton annuler du formulaire de connexion
    $scope.annuler = function () {
        window.location = '/'; // redirection à l'accueil
    }
});