"use strict";

const Generator = require("yeoman-generator");
const path = require("path");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument("appname", { type: String, required: false });
    this.option("yarn", {
      description: "Use Yarn as the package manager"
    });
    this.option("docker", {
      description: "Install Docker artifacts including a Dockerfile"
    });

    this.useYarn = this.options.yarn;
    this.docker = this.options.docker;
    this.name = this.options.appname || "Boilerplate-VentureDive";
    this.description = "A boilerplate to scaffold app backends";
    this.version = "1.0.0";
    this.db = "relational";
  }

  initializing() { }

  async prompting() {
    const prompts = [
      {
        type: "input",
        name: "description",
        message: `Define app description [${this.description}]`
      },
      {
        type: "input",
        name: "apiVersion",
        message: `Set Version [${this.version}]`
      },
      {
        type: "list",
        name: "db",
        message: "Select Database Type",
        choices: [
          { name: "Relational", value: "relational" },
          { name: "NoSQL", value: "nosql" }
        ],
        default: "relational"
      },
      {
        type: "list",
        name: "docker",
        message: `Do you want docker? (Y/N)`,
        choices: [
          { name: "Yes", value: true },
          { name: "No", value: false }
        ],
        default: true
      },
      {
        type: "list",
        name: "useYarn",
        message: `Do you want Yarn? (Y/N)`,
        choices: [
          { name: "Yes", value: true },
          { name: "No", value: false }
        ],
        default: false
      }
    ];

    if (!this.options.appname) {
      prompts.unshift({
        type: "input",
        name: "name",
        message: `Define App name [${this.name}]`
      });
    }

    return await this.prompt(prompts).then(r => {
      this.name = r.name ? r.name : this.name;
      this.description = r.description ? r.description : this.description;
      this.version = r.version ? r.version : this.version;
      this.useYarn = r.useYarn,
        this.docker = r.docker,
        this.db = r.db;
    });
  }

  configuring() { }

  default() { }

  get writing() {
    return {
      appStaticFiles() {
        const src = this.sourceRoot() + "/**";
        const dest = this.destinationPath(this.name);
        const relationalFiles = [
          "server/core/db/migrations/exampleSQL.js",
          "server/core/db/seeders/exampleSQL.js",
          "server/core/db/models/exampleSQL.js",
          "server/core/db/models/index.js",
          "server/config/config.js",
          "server/core/repositories/index.js"
        ];

        const noSqlFiles = [
          //"server/core/db/seeders/exampleNoSQL.js",
          "server/core/db/models/exampleNoSQL.js",
          "server/config/mongoose.js",
          "server/core/repositories/nosqlrepo.js"
        ];

        let files = [
          "package.json",
          "README.md",
          ".env",
          ".sequelizerc",
          ".eslintrc.json",
          "server/routes.js",
          "server/config/api.yml",
          "server/index.js",
          "server/config/server.js",
          "server/core/shared/utils/error.handler.js",
          "server/core/shared/utils/logger.js",
          "server/core/modules/example/controller.js",
          "server/core/modules/example/service.js",
          "server/core/modules/example/routes.js",
          "server/core/shared/services/sharedService.js",
          "public/api-explorer/index.html",
          "public/api-explorer/swagger-ui-standalone-preset.js",
          "public/index.html",
          "server/core/repositories/example.js",
          "gitignore"
        ];

        const copyOpts = {
          globOptions: {
            ignore: []
          }
        };

        if (this.db === "relational") {
          files = [...files, ...relationalFiles];
          noSqlFiles.forEach(itemPath =>
            copyOpts.globOptions.ignore.push(src + `/${itemPath}`)
          );
        } else {
          files = [...files, ...noSqlFiles];
          relationalFiles.forEach(itemPath =>
            copyOpts.globOptions.ignore.push(src + `/${itemPath}`)
          );
        }

        copyOpts.globOptions.ignore.push(src + "/server/config/api.yml");

        if (!this.docker) {
          copyOpts.globOptions.ignore.push(
            src + "/+(Dockerfile|.dockerignore)"
          );
        }

        this.fs.copy(src, dest, copyOpts);
        this.fs.copy(this.templatePath(".*"), dest, copyOpts);

        const opts = {
          name: this.name,
          title: this.name,
          description: this.description,
          version: this.version,
          apiRoot: this.apiRoot,
          useYarn: this.useYarn,
          docker: this.docker,
          db: this.db
        };

        files.forEach(f => {
          this.fs.copyTpl(
            this.templatePath(f),
            this.destinationPath(`${this.name}/${f}`),
            opts,
            copyOpts
          );
        });

        this.fs.move(
          this.destinationPath(`${this.name}`, "gitignore"),
          this.destinationPath(`${this.name}`, ".gitignore")
        );

        if (this.db === "nosql") {
          this.fs.move(
            this.destinationPath(`${this.name}`, "server/core/repositories/nosqlrepo.js"),
            this.destinationPath(`${this.name}`, "server/core/repositories/index.js"),
          );

          this.fs.move(
            this.destinationPath(`${this.name}`, "server/core/db/models/exampleNoSQL.js"),
            this.destinationPath(`${this.name}`, "server/core/db/models/example.js"),
          );
        }
        
      }
    };
  }

  conflicts() { }

  install() {
    const appDir = path.join(process.cwd(), this.name);
    process.chdir(appDir);
    if (this.useYarn) {
      this.yarnInstall();
    } else {
      this.npmInstall();
    }
  }

  end() {
    // if (this.useYarn) {
    //   this.spawnCommandSync("yarn", ["lint:fix"]);
    // } else {
    //   this.spawnCommandSync("npm", ["run", "lint:fix"]);
    // }
  }
};
