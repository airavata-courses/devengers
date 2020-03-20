FROM python:3

RUN mkdir dataretrieval 
COPY . dataretrieval
WORKDIR /dataretrieval

RUN pip install --upgrade pip
RUN pip install -r requirements.txt


CMD ["python3", "dataretrieval.py"]