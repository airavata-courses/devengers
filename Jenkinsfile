pipeline {
   agent any
	stages {
	stage('User Management API Call') {
            steps {
            sh '''
				chmod 400 id_rsa
				ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
				ssh -i id_rsa.pub ubuntu@149.165.169.178 "sudo apt install gnupg2 pass && 
				sudo docker login --username=devengers --password=DEVENGERS@2019 &&
				sudo docker pull devengers/um_api &&
				sudo apt-get update &&
				sudo apt-get install -y kubectl &&
				sudo kubectl run um_api --image devengers/um_api"
            '''    
            }
        }
    }
}
