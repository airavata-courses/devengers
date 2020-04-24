pipeline {
   agent any
   tools {nodejs "InstanceNodeJS"}
   stages{
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
		stage('UI Service --on Kubernetes Master') {
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
		cd devengers && git checkout develop_ui && cd Frontend &&
        sudo kubectl delete service ui &&
		sudo kubectl delete ui &&
		sudo kubectl apply -f uiDeployment.yaml --validate=false"
            '''
            }
        }
    }
}
