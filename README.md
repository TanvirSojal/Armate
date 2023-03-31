# Armate - Azure ARM Template Analyzer

> Currently under alpha development phase

## Features
If you have a ARM Template JSON file. This CLI tool can analyze the file and print,
- Total number of modules (Resource type: `Microsoft.Resources/deployments`)
- Check whether it has any duplicate modules.
- In case of duplicate modules, print their names so that it can be searched and edited
- Currently only work with static module names

## Command
```
npx armate <arm_template_file_path>
```

## Usage

If current directory contains a `deployment.json`, run:
```
npx armate deployment.json
```

 this tool will analyze it and print result in the following format:
```
--------------------------------
|       Module Analytics       |
--------------------------------
> Total Modules: 15
> Module Names are Unique?  false
> Duplicate Module Names: 3
   [*] service_plan_deployment
   [*] analytics_deployment
   [*] storage_deployment
```

The example output indicates that the ARM template has 3 duplicate module names. Each of them are used in more than one module.