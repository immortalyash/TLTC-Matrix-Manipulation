FROM ubuntu:18.04

# Update packages and install python and web server requirements
RUN apt update -y && \
    apt upgrade -y && \
    apt install -y python3-dev python3-pip

# Create workspace
WORKDIR /var/www/matrix

# Copy all files over
COPY --chown=www-data:www-data . /var/www/matrix

# Install all dependencies
RUN pip3 install -r /var/www/matrix/requirements.txt

# Expose port 80 for flask web server
EXPOSE 80/tcp

# Set Locale
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

# Set flask server name
ENV FLASK_APP=/var/www/matrix/server.py

CMD ["python3", "server.py"]