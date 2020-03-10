FROM python:3

RUN mkdir datamodelling 
COPY . datamodelling
WORKDIR /datamodelling

RUN pip install --upgrade pip
RUN pip install -r requirements.txt


CMD ["./wait-for-it.sh" , "rabbitmq:5672" , "--strict" , "--timeout=30" , "--" , "python3", "datamodelling.py"]