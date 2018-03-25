'use strict';

const path = require('path');
const Generator = require('yeoman-generator');
const mkdir = require('mkdirp');

module.exports = class extends Generator {

  paths() {
      this.destinationRoot(process.env.GOPATH);
  }

  prompting() {
    let done = this.async();
    let prompts = [{
        type: 'input',
        name: 'applicationName',
        message: 'What is the name of your application? (e.g. myApp):',
        default: 'grpcgw-app'
    }, {
        type: 'input',
        name: 'repo',
        message: 'What is your URL repository? (e.g. github.com/me):'
    }];

    return this.prompt(prompts).then(props => {
        if (props.repo.substr(-1) != '/') {
          props.repo += '/';
        }
        this.goAppPath = props.repo + props.applicationName;
        done();
    });

  }

  writing() {
    let srcDir = this.destinationPath(path.join('src/', this.goAppPath));
    let protoDir = this.destinationPath(path.join('src/', this.goAppPath, "/proto"));
    let protoServicesDir = this.destinationPath(path.join('src/', this.goAppPath, "/protoServices"));
    
    mkdir.sync(srcDir);
    mkdir.sync(protoDir);
    mkdir.sync(protoServicesDir);

    this.fs.copy(
        this.templatePath('_.gitignore'),
        path.join(srcDir, '.gitignore')
    );
    this.fs.copy(
        this.templatePath('_README.md'),
        path.join(srcDir, 'README.md')
    );
    this.fs.copy(
      this.templatePath('_Dockerfile'),
      path.join(srcDir, 'Dockerfile')
    );
    this.fs.copy(
      this.templatePath('_Makefile'),
      path.join(srcDir, 'Makefile')
    );

    this.fs.copy(
      this.templatePath('protoServices/_health.go'),
      path.join(protoServicesDir, 'health.go')
    );

    this.fs.copy(
      this.templatePath('proto/_healthService.proto'),
      path.join(protoDir, 'healthService.proto')
    );

    let templateContext = {
        goAppPath: this.goAppPath
    };

    this.fs.copyTpl(
        this.templatePath('_main.go'),
        path.join(srcDir, 'main.go'),
        templateContext
    );

  }
};