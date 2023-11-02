function openSomething(taskpaperargs) {
  if (!nova.workspace.path) {
    nova.workspace.showInformativeMessage(
      nova.localize("This workspace has no path.")
    );
    return;
  }

  var process = new Process("/usr/bin/open", {
    args: taskpaperargs,
  });

  var lines = [];

  process.onStderr(function (data) {
    if (data) {
      lines.push(data);
    }
  });

  process.onDidExit(function (status) {
    if (status != 0) {
      nova.workspace.showInformativeMessage(
        nova.localize("Error launching app:") +
          "\n\n" +
          lines.join("")
      );
    }
  });

  process.start();
}
function openApp() {
    openSomething(["-a", nova.config.get("taskpaper.app")])
}
function openTodo() {
    openSomething(["-a", nova.config.get("taskpaper.app"), nova.workspace.path + "/todo.taskpaper"])
}
module.exports = openApp;
module.exports = openTodo;

exports.activate = function () {
  // Do work when the extension is activated
};

exports.deactivate = function () {
  // Clean up state before the extension is deactivated
};

nova.commands.register('taskpaper.openApp', async () => {
  openApp();
});
nova.commands.register('taskpaper.openTodo', async () => {
  openTodo();
});
