const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the pioneering ${chalk.red('generator-frontend-best-practice-boilerplate')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'folderName',
        message: 'What would you like to name the folder?',
        default: 'BoilerPlate-Frontend-Best-Practice'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath(),
      this.destinationPath(this.props.folderName)
    );
    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath(this.props.folderName+'/.gitignore')
    );
    this.fs.copy(
      this.templatePath('.*'),
      this.destinationPath(this.props.folderName)
    );
  }

  install() {
    this.npmInstall()
    this.npmInstall(['next'], { 'save': true });
  }
};
