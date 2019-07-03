# armed-repsonse
PoC for armed response and Panic management system

API
1. After cloning the repository, open in IDE (preferrably vs code) and run npm install
2. Debug (F5) - contents of .vscode/launh.json should be:
                    
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Debug Serverless",
            "cwd": "${workspaceFolder}",
            "runtimeExecutable": "npm",
            "runtimeArgs": [
                "run",
                "debug"
            ],
            "outFiles": [
                "${workspaceFolder}/handler.js"
            ],
            "port": 9229,
            "sourceMaps": true
        }
    ]
}

NB: Running serverless offline throws ModelOverWrite error after the first api call

UI
Pull the container from docker hub
     - docker pull selebalo101/armed-response-ui
Run the container locally
     - docker run --name armedresponse -p 80:80 selebalo101/armed-response-ui
     
Log in:
  - username: user@armedresponse.co.za
  - password: armedresponse@123
