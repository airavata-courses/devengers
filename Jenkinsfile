pipeline {
   agent any
   tools {nodejs "InstanceNodeJS"}
   stages{
       stage('Build Application') {
            steps {
                sh 'mvn -f db-service/pom.xml clean package'
            }
            post {
                success {
                    echo "Now Archiving the Artifacts...."
                    archiveArtifacts artifacts: '**/*.jar'
                }
            }
        }

        stage('Docker image Build') {
              steps {
                    checkout scm
              sh '''
                  sudo apt --assume-yes install docker.io
                  sudo systemctl start docker
                  sudo systemctl enable docker
                  python -m pip uninstall -y urllib3
  		          python -m pip install urllib3==1.22
                  sudo docker-compose build
              '''
              }
          }

          stage('Docker hub Push Image') {
              steps {
                    checkout scm
              sh '''
                  sudo docker login --username=devengers --password=DEVENGERS@2019
                  sudo docker-compose push
              '''
              }
          }
             
        stage('SessionService --on Kubernetes Master') {
            steps {
            sh '''
		chmod 400 id_rsa
		ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
		ssh -i id_rsa ubuntu@149.165.169.178 "sudo apt install gnupg2 pass -y &&
		sudo apt install git -y &&
		sudo docker login --username=devengers --password=DEVENGERS@2019 &&
		sudo apt-get update &&
		rm -rf devengers &&
		sudo apt-get install -y kubectl &&
		git clone https://github.com/airavata-courses/devengers.git &&
        sudo kubectl delete service sessionservice &&
        sudo kubectl delete deployment sessionservice &&
		cd devengers && git checkout master && cd db-service &&
		sudo kubectl apply -f dbDeployment.yaml --validate=false"
            '''
            }
        }
    }
}
