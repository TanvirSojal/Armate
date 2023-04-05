# Armate - Azure ARM Template Analyzer

> Currently under alpha development phase

## Features
If you have an ARM Template JSON file. This CLI tool can analyze the file and output,
1. Resource Analytics
   - Total number of resources
   - Total number of resources with `preview` Version
2. Module Analysis
   - Total number of modules (Resource type: `Microsoft.Resources/deployments`)
   - Check whether it has any **duplicate modules**
   - In case of duplicate modules, print their names
   - **Currently, only work with static module names**

## Usage
```
npx armate@latest <arm_template_json_path>
```

## Example

If the current directory contains a `deployment.json`, run:
```
npx armate@latest deployment.json
```

 this tool will analyze it and print the result in the following format:
```
--------------------------------
|      Resource Analytics      |
--------------------------------
> Total Resources: 6
> Preview Versions Used: 1
   [*] Microsoft.Insights/diagnosticSettings : 2021-05-01-preview
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

The example output indicates that the ARM template has 3 duplicate module names. Each of them is used in more than one module.
