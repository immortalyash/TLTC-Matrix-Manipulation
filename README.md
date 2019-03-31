Getting Started
=

## For Docker
### TODO: add documentation

## For Linux (Debian based) only 
### Install Dependencies
Core dependencies
```
sudo apt-get -y install build-essential python-dev python-setuptools aptitude
sudo easy_install pip
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

### Running Server
```
FLASK_APP=server.py flask run
```