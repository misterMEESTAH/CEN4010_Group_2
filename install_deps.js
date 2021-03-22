const { exec } = require("child_process")

exec("cd client && npm install", (error, stdout, stderr ) => {
    if(error){
        console.log(`stderr: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});

exec("npm install", (error, stdout, stderr ) => {
    if(error){
        console.log(`stderr: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});