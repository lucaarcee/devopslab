pipeline {
    agent { label 'docker-builder' } // Esto asegura que corra en BUILD-NODE

    environment {
        APP_NAME = "devops-app"
        // Cambia estas IPs por las tuyas reales si son distintas
        BUILD_NODE_IP = "192.168.109.93" 
        APP_NODE_IP   = "192.168.106.234"
        USER          = "vagrant"
    }

    stages {
        stage('Build Image') {
            steps {
                echo "Construyendo imagen en BUILD-NODE..."
                sh "docker build -t ${APP_NAME} ."
                // Guardamos la imagen en un archivo .tar para transportarla
                sh "docker save ${APP_NAME} > ${APP_NAME}.tar"
            }
        }

        stage('Transfer to App-Node') {
            steps {
                echo "Enviando imagen a APP-NODE..."
                // Enviamos el .tar de una VM a la otra
                sh "scp ${APP_NAME}.tar ${USER}@${APP_NODE_IP}:~/"
            }
        }

        stage('Deploy') {
            steps {
                echo "Desplegando en APP-NODE..."
                sh """
                ssh ${USER}@${APP_NODE_IP} "
                    docker load < ~/${APP_NAME}.tar &&
                    docker stop ${APP_NAME} || true &&
                    docker rm ${APP_NAME} || true &&
                    docker run -d -p 3000:3000 --name ${APP_NAME} ${APP_NAME}
                "
                """
            }
        }
    }
    
    post {
        success {
            echo "¡Despliegue exitoso! La app debería estar en http://${APP_NODE_IP}:3000"
        }
    }
}