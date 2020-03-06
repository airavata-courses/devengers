FROM python:3

RUN mkdir datamodelling 
COPY . datamodelling
WORKDIR datamodelling

RUN pip install --upgrade pip
RUN pip install -r requirements.txt


CMD python datamodelling.py
