# Team Devengers
ADS Project Spring 2020: Team Devengers

We have created 4 Instances on Jetstream:
1. Jenkins-Master
2. Kubernetes-Master
3. Worker-Node-1
4. Worker-Node-2

Follow the wiki page to:

1. Setup Instances on Jetstream.
2. Setup Ansible & Kubernetes Cluster.
3. Setup CI/CD Jenkins Pipeline.

Wiki Page Link:
https://github.com/airavata-courses/devengers/wiki/Setting-Up-Instances,-Kubernetes-Cluster,-Jenkins

After following the above steps , you will have 4 Instances, Kubernetes-Cluster
consisting of 1 master and 2 slave created and a Jenkins CI/CD Pipeline setup.

If you are skipping the above steps: You could use our configuration-

1. Jenkins Instance IP : 149.165.168.197
2. Kubernetes Master IP : 149.165.169.178
3. Kubernetes Worker Node 1 IP: 149.165.169.133
4. Kubernetes Worker Node 2 IP: 149.165.169.83

To run the project by single command:

Put a dummy commit onto the master node and access the URL: 149.165.168.197:8090

Once Prompted with Login Screen use the following credentials:

Username: DevengersJenkins

Password: kaustubh

After login, you will see a build that was automatically triggered by your dummy
commit.

Once the build is successfull acesss the Application through

Application URL : http://149.165.169.178:32177
