const initDeployListener = () => {
  const deployMessageElm = document.getElementById("deploy_message");
  evtSource = new EventSource("/listen-deploying");
  evtSource.onmessage = (evt) => {
    const deployers = JSON.parse(evt.data);
    deployMessageElm.innerText = deployers.length ? "Deploying:" : "";
    deployers.forEach((deployer, inx) => {
      deployMessageElm.innerText += ` ${deployer.name}${
        inx === deployers.length - 1 ? "." : ","
      }`;
    });
  };
};

initDeployListener();
