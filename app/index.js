'use strict';

const path = require('path');
const Generator = require('yeoman-generator');
const mkdir = require('mkdirp');

module.exports = class extends Generator {

  paths() {
      this.destinationRoot();
  }

  prompting() {
    let done = this.async();
    let prompts = [{
        type: 'input',
        name: 'packageName',
        message: 'What is your package name? (e.g. github.com/serinth/myApp):',
        default: 'grpcgw-app'
    }];

    return this.prompt(prompts).then(props => {
        this.goAppPath = props.packageName;
        done();
    });

  }

  writing() {
    let srcDir = this.destinationPath(path.join('src/'));
    let protoDir = this.destinationPath(path.join('src/', "/proto"));
    let protoServicesDir = this.destinationPath(path.join('src/', "/protoServices"));
    let appDir = this.destinationPath(path.join('src/', "/app"));
    let configsDir = this.destinationPath(path.join('src/', "/configs"));

    mkdir.sync(srcDir);
    mkdir.sync(protoDir);
    mkdir.sync(protoServicesDir);
    mkdir.sync(appDir);

    this.fs.copy(
      this.templatePath('_.gitignore'),
      path.join(srcDir, '.gitignore')
    );

    this.fs.copy(
      this.templatePath('_README.md'),
      path.join(srcDir, 'README.md')
    );

    this.fs.copy(
      this.templatePath('_Makefile'),
      path.join(srcDir, 'Makefile')
    );

    this.fs.copy(
      this.templatePath('proto/_healthService.proto'),
      path.join(protoDir, 'healthService.proto')
    );

    this.fs.copy(
      this.templatePath('app/_app.go'),
      path.join(appDir, 'app.go')
    );

    this.fs.copy(
      this.templatePath('configs/_local.toml'),
      path.join(configsDir, 'local.toml')
    );

    let templateContext = {
        goAppPath: this.goAppPath
    };

    this.fs.copyTpl(
      this.templatePath('_main.go'),
      path.join(srcDir, 'main.go'),
      templateContext
    );
    
    this.fs.copyTpl(
      this.templatePath('protoServices/_health.go'),
      path.join(protoServicesDir, 'health.go'),
      templateContext
    );
    
    this.fs.copyTpl(
      this.templatePath('_Dockerfile'),
      path.join(srcDir, 'Dockerfile'),
      templateContext
    );

  }
};
