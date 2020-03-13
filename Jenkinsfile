pipeline {
   agent any
	stages {
	stage('User Management API Call') {
            steps {
            sh '''
				chmod 400 id_rsa
				ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
				ssh -i id_rsa ubuntu@149.165.169.178 "sudo apt install gnupg2 pass -y && 
				sudo docker login --username=devengers --password=DEVENGERS@2019 &&
				sudo docker pull devengers/um_api &&
				sudo apt-get upgrade -y &&
				sudo apt-get install -y kubectl &&
				sudo kubectl run um-api --image=devengers/um_api --port=8080"
            '''    
            }
        }

        stage('UI Call') {
            steps {
            sh '''
				chmod 400 id_rsa
				ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
				ssh -i id_rsa ubuntu@149.165.169.178 "sudo apt install gnupg2 pass -y && 
				sudo docker login --username=devengers --password=DEVENGERS@2019 &&
				sudo docker pull devengers/ui &&
				sudo apt-get upgrade -y &&
				sudo apt-get install -y kubectl &&
				sudo kubectl run ui --image=devengers/ui --port=3000"
            '''    
            }
        }
        stage('SessionService Call') {
            steps {
            sh '''
				chmod 400 id_rsa
				ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
				ssh -i id_rsa ubuntu@149.165.169.178 "sudo apt install gnupg2 pass -y && 
				sudo docker login --username=devengers --password=DEVENGERS@2019 &&
				sudo docker pull devengers/sessionservice &&
				sudo apt-get upgrade -y &&
				sudo apt-get install -y kubectl &&
				sudo kubectl run sessionservice --image=devengers/sessionservice --port=8300"
            '''    
            }
        }
        stage('Dataretrieval Call') {
            steps {
            sh '''
				chmod 400 id_rsa
				ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
				ssh -i id_rsa ubuntu@149.165.169.178 "sudo apt install gnupg2 pass -y && 
				sudo docker login --username=devengers --password=DEVENGERS@2019 &&
				sudo docker pull devengers/dataretrieval &&
				sudo apt-get upgrade -y &&
				sudo apt-get install -y kubectl &&
				sudo kubectl run dataretrieval --image=devengers/dataretrieval"
            '''    
            }
        }
        stage('DataModelling Call') {
            steps {
            sh '''
				chmod 400 id_rsa
				ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
				ssh -i id_rsa ubuntu@149.165.169.178 "sudo apt install gnupg2 pass -y && 
				sudo docker login --username=devengers --password=DEVENGERS@2019 &&
				sudo docker pull devengers/datamodel &&
				sudo apt-get upgrade -y &&
				sudo apt-get install -y kubectl &&
				sudo kubectl run datamodel --image=devengers/datamodel"
            '''    
            }
        }
        stage('DataAnalysis Call') {
            steps {
            sh '''
				chmod 400 id_rsa
				ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
				ssh -i id_rsa ubuntu@149.165.169.178 "sudo apt install gnupg2 pass -y && 
				sudo docker login --username=devengers --password=DEVENGERS@2019 &&
				sudo docker pull devengers/dataanalysis &&
				sudo apt-get upgrade -y &&
				sudo apt-get install -y kubectl &&
				sudo kubectl run dataanalysis --image=devengers/dataanalysis"
            '''    
            }
        }
    }
}
