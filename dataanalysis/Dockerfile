FROM python:3

RUN mkdir dataanalysis 
COPY . dataanalysis
WORKDIR dataanalysis

RUN pip install --upgrade pip
RUN pip install -r requirements.txt


CMD python dataanalysis.py
