# SIGL

## Environnement Docker

### Structure

docker
├── dev
│   ├── back-dev
│   │   └── Dockerfile
│   ├── docker-compose.yml
│   ├── front-dev
│   │   └── Dockerfile
│   └── sonarscanner
│       ├── Dockerfile
│       └── tsconfig.json
├── prod
│   ├── back-dev
│   │   └── Dockerfile
│   ├── certbot
│   │   └── conf
│   ├── docker-compose.yml
│   ├── front-dev
│   │   └── Dockerfile
│   └── nginx
│       └── projet-sigl.conf
└── pull_images.sh

Le répertoire Docker est composé d'un environnement de développement et d'un environnement de production.
L'environnement de développement fonctionne sur vos postes alors que celui de production fonctionne sur le serveur [projet-sigl.fr](https://projet-sigl.fr).<br>

L'environnement de développement comprend :
* Angular
* Django
* La base de données Django
* Sonarqube
* La base de données Sonarqube
* SonarScanner

L'environnement de production comprend :
* Nginx
* Django
* La base de données Django
* Certbot

Le script `pull_images.sh` permet de récupérer les images Docker présentes dans notre registry pour déployer l'environnement de développement.

### Mise en place

Afin de pouvoir déployer l'application dans un environnement Docker en local, il est nécessaire de récupérer les images présentes dans notre [registry](https://gitlab.com/baptiste72/sigl/container_registry).<br>
Pour cela :
- [x] Avoir Git Bash d'installer sur sa machine
- [x] Se placer dans le terminal de Visual Studio en mode Bash
- [x] Lancer le script `pull_images.sh` :

```bash
./docker/pull_images.sh
```
> Vous devez renseigner vos identifiants de connexion **GitLab**.

Il ne reste plus qu'à déclarer un fichier `.env` contenant les identifiants de connexion aux bases de données de Django et de Sonarqube via la commande [suivante](https://discord.com/channels/1019217607875907634/1019217607875907637/1042110988486447115).

Vous pouvez maintenant utiliser les différentes commandes docker et docker compose pour interagir avec l'environnement.

Pour démarrer tous les conteneurs :
```
docker compose -f docker/dev/docker-compose.yml up -d
```

Pour observer l'état des conteneurs :
```
docker ps -a
```

Pour se connecter à un conteneur :
```
docker exec -it container_name sh
```

Pour exécuter une commande dans un conteneur :
```
docker exec container_name command
```

Pour afficher les logs des conteneurs :
```
docker compose logs
```

Pour arrêter et supprimer les conteneurs :
```
docker compose -f docker/dev/docker-compose.yml down
```

Pour supprimer l'environnement :
```
docker system prune -a
```
> La mise en place d'un environnement Docker ne change en rien le processus de développement.

### Sonarqube

Une fois que vous avez démarré tous les conteneurs, vous pouvez vous rendre sur l'interface de [Sonarqube](http://localhost:9000).
Connectez-vous avec `admin` en tant qu'idendtifiant et mot de passe.

Il faut maintenant déclarer un projet dans Sonarqube :
* Entrez le nom du projet : sigl
* Choisissez other pour le langage du projet
* Sélectionnez Linux pour l'OS
* Entrez la clé du projet : sigl

Sonarqube est configuré, il n'y a plus qu'à lancer SonarScanner pour effectuer une analyse statique du code.
Les résultats du scan seront visibles depuis Sonarqube.

Pour scanner le code coté front :
```
docker run --rm \
  -v frontend:/usr/src/frontend \
  dev-sonarscanner \
  -Dsonar.projectKey=sigl \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://${ip}:9000 \
  -Dsonar.login=${token} \
  -Dsonar.exclusions=node_modules \
  -X
```

Pour scanner le code coté back :
```
docker run --rm \
  -v backend:/usr/src/backend \
  dev-sonarscanner \
  -Dsonar.projectKey=sigl \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://${ip}:9000 \
  -Dsonar.login=${token} \
  -X
```
> Remplacer les variables ${ip} et ${token} par l'adresse IP de votre machine et le token généré lors de la création du projet Sonarqube.
