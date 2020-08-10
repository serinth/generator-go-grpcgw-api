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
    
    let templateContext = {
      goAppPath: this.goAppPath
    };
    let _this = this;

    
    // Top Level source files
    let srcDir = this.destinationPath(path.join('src/'));
    mkdir.sync(srcDir);
    const srcFiles = ['_.gitignore', '_README.md', '_Makefile'];
    
    srcFiles.forEach(f => {
      _this.fs.copy(
        _this.templatePath(f),
        path.join(srcDir,f.replace(/^_/g, ''))
      );
    });

    // Template files requiring package context in Top level source
    const srcTemplateFiles = ['_main.go', '_Dockerfile'];

    srcTemplateFiles.forEach(f => {
      _this.fs.copyTpl(
        _this.templatePath(f),
        path.join(srcDir,f.replace(/^_/g, '')),
        templateContext
      );
    });
  
    // Proto files
    let protoDir = this.destinationPath(path.join('src/', '/proto'));
    mkdir.sync(protoDir);

    _this.fs.copy(
      _this.templatePath('proto/_healthService.proto'),
      path.join(protoDir, 'healthService.proto')
    );

    // Application Bootstrap
    let appDir = this.destinationPath(path.join('src/', '/app'));
    mkdir.sync(appDir);

    _this.fs.copy(
      _this.templatePath('app/_app.go'),
      path.join(appDir, 'app.go')
    );


    // Configurations which bootstrap loads
    let configsDir = this.destinationPath(path.join('src/', '/configs'));
    mkdir.sync(configsDir);

    _this.fs.copy(
      _this.templatePath('configs/_local.toml'),
      path.join(configsDir, 'local.toml')
    );
    
    // Proto services
    let protoServicesDir = this.destinationPath(path.join('src/', '/protoServices'));
    mkdir.sync(protoServicesDir);

    this.fs.copyTpl(
      this.templatePath('protoServices/_health.go'),
      path.join(protoServicesDir, 'health.go'),
      templateContext
    );
    
    // Helm Chart
   
    let helmDir = this.destinationPath(path.join('src/', 'helmChart'));
    let helmTemplateDir = this.destinationPath(path.join('src/', '/helmChart', '/templates'));
    mkdir.sync(helmDir);
    mkdir.sync(helmTemplateDir);

    const helmFiles = ['_values.yaml', '_Chart.yaml'];
    const helmTemplateFiles = ['__helpers.tpl', '_dbConnectionStringSecret.yaml', '_deployment.yaml', '_NOTES.txt', '_service.yaml'];

    helmFiles.forEach(f => {
      _this.fs.copy(
        _this.templatePath('helmChart/', f),
        path.join(helmDir,f.replace(/^_/g, ''))
      );
    });

    helmTemplateFiles.forEach(f => {
      _this.fs.copy(
        _this.templatePath('helmChart/templates/', f),
        path.join(helmTemplateDir,f.replace(/^_/g, ''))
      );
    });


  }
};
