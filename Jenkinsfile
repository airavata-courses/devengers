pipeline {
   agent any
   tools {nodejs "InstanceNodeJS"}
   stages {
 
	stage('Adding PostGres Call') {
            steps {
            sh '''
				chmod 400 id_rsa
				ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
				ssh -i id_rsa ubuntu@149.165.169.178 "sudo apt install gnupg2 pass -y && 
				sudo docker login --username=devengers --password=DEVENGERS@2019 &&
				sudo apt-get upgrade -y &&
				sudo apt-get install -y kubectl &&
				sudo kubectl run \
  				postgres \
				 --image postgres:11 \
 				 --rm --attach --restart=Never \
  				-it \
  				-- sh -c 'exec psql
				-e "POSTGRES_MULTIPLE_DATABASES=dataretrieval_db,datamodelling_db,dataresult_db" \
				-e "POSTGRES_USER=postgres"
				-e "POSTGRES_PASSWORD=postgres"'"
            '''    
            }
        }   
    }
}
