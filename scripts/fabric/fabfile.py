from __future__ import with_statement
from fabric.api import *
from fabric.contrib.console import confirm
from fabric.colors import yellow

www_folder = 'jambo.be'
symlinks = []

# Host configuration blocks:
def production():
    env.hosts = ['deploy@5.79.7.158:9791']

def staging():
    env.hosts = []

# Deploy method:
def deploy():
    git_directory = '/var/www/' + www_folder + '/git'
    shared_directory = '/var/www/' + www_folder + '/shared'
    with cd(git_directory):
        print(yellow("-- Git: pull from origin"))
        run("git pull")

        print(yellow("-- Creating symlinks to writable directories"))
        for symlink in symlinks:
             run("ln -fns " + shared_directory + "/" + symlink + " code/" + symlink)
