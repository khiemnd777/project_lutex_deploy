const child_process = require("child_process");
const DeployerConfig = require("./deployer-config");

const getDeployers = () => {
  return DeployerConfig.getDeployers();
};

const getDeployersIsDeploying = (deployers) => {
  const theDeployers = [];
  for (let name in deployers) {
    const item = deployers[name];
    if (item.deploying) {
      theDeployers.push({ name: name });
    }
  }
  return theDeployers;
};
let pusher;
const listenDeploying = (req, res) => {
  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });
  pusher = setInterval(() => {
    const theDeployers = getDeployersIsDeploying(getDeployers());
    res.write(`data: ${JSON.stringify(theDeployers)}\n\n`);
  }, 1000);

  res.on("close", () => {
    console.log("lost connection");
    clearInterval(pusher);
  });
};

const deploy = (req, res) => {
  const name = req.body?.name;
  const target = req.body?.target;
  const deployers = getDeployers();
  const deployConfig = deployers[name];
  if (!deployConfig) {
    res.redirect(204, "/");
    return;
  }
  if (deployConfig.deploying) {
    res.redirect(303, "/");
    return;
  }
  deployConfig.deploying = true;
  const spawn = child_process.spawn;
  const child = spawn("powershell.exe", [
    `${deployConfig.path} --target=${target}`,
  ]);
  child.stdout.on("data", function (data) {
    console.log(`Powershell Data: ${data}`);
  });
  child.stderr.on("data", function (data) {
    console.log(`Powershell Errors: ${data}`);
  });
  child.on("exit", function () {
    deployConfig.deploying = false;
    console.log("Powershell Script finished");
  });
  child.stdin.end(); //end input
  res.redirect(301, "/");
};

module.exports = {
  deploy: deploy,
  listenDeploying: listenDeploying,
};
