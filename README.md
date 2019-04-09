Getting Started
=

**Important Links -** 
* Docker Hub - https://hub.docker.com/r/yashballani/matrix
* GitHub - https://github.com/immortalyash/TLTC-Matrix-Manipulation/

# Using Docker (Recommended)
### For Windows 10
Installation of docker is out of scope for this application but you can follow the link below to install it.
[Click here](https://docs.docker.com/docker-for-windows/install/) for the guide.

**Note-** You need to use Linux container (once docker is installed) in docker to allow successful deployment of the 
application.

#### Use docker image from docker hub
Pull docker image from docker hub, open linux container in docker to use the following commands
```
docker pull yashballani/matrix:latest
```

Run docker image
```
docker run -d -p 80:80 yashballani/matrix
``` 

**Access Website:** Open web browser and visit http://localhost

### For Linux (Debian based) only
Install Docker
```
sudo snap install docker
```

#### Method 1: Use docker image from docker hub
Pull docker image from docker hub
```
sudo docker pull yashballani/matrix:latest
```

Run docker image
```
sudo docker run -d -p 80:80 yashballani/matrix
``` 

**Access Website:** Open web browser and visit http://localhost

#### Method 2: Alternate Method (Build from source)
Install Git
```
sudo apt install git -y
```

Clone repository
```
git clone https://github.com/immortalyash/TLTC-Matrix-Manipulation.git
```

Build docker image
```
sudo docker build -t matrix:latest .
```

Run docker image
```
sudo docker run -d -p 80:80 matrix
```

**Access Website:** Open web browser and visit http://localhost

# Using Virtual Environment
### For Linux (Debian based) only 
#### Install Dependencies
Core dependencies
```
sudo apt-get -y install build-essential python3-dev python3-pip
sudo pip install virtualenv virtualenvwrapper
```

**Note-** Add these lines to ~/.bashrc for virtualenvwrapper and restart terminal
```
# Virtual Environment
export WORKON_HOME=$HOME/.virtualenvs
export PROJECT_HOME=$HOME/Devel
source /usr/local/bin/virtualenvwrapper.sh
```

Create your own Virtual Environment and work on
```
mkvirtualenv matrix
workon matrix
```

App Dependencies
```
pip install -r requirements.txt
```

#### Running Server
```
FLASK_APP=server.py flask run
```

**Access Website:** Open web browser and visit http://localhost:5000