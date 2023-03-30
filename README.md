# Armate - Azure ARM Template Analyzer

> Currently under alpha development phase

## Features
If you have a ARM Template JSON file. This CLI tool can analyze the file and print,
- Total number of modules
- Check whether it has any duplicate modules.
- In case of duplicate modules, print their names so that it can be searched and edited
- Currently only work with static module names

## Command
Run the following command 
```
armate deployment.json
```

If the directory contains a `deployment.json`, this tool will analyze it and print result like the following,
```
--------------------------------
|       Module Analytics       |
--------------------------------
> Total Modules:  15
> Module Names are Unique?  false
> Duplicate Module Names
   [*] storage_deployment
```

The output means, there are more than one module that use `storage_deployment` as name.