function AppViewModel() {
	var a = this;
  	a.tasks = ko.observableArray();
  	a.editTask = ko.observable();

  	a.newTask = {
		text: ko.observable(""),
		isChecked: ko.observable(false),
	};

	a.init = function() {

	}

	a.clearAll = function() {
		a.tasks.removeAll();
	}

	a.addTask = function() {
		a.newTask.task_id = ko.observable(Date.now());
		a.newTask.position = ko.observable(a.tasks().length); 
		a.tasks.push(new a.TaskModel(a.newTask));
		a.newTask.text("");
	}

	a.updateTask = function() {
		var task = ko.utils.arrayFirst(a.tasks(), function(task) {
		    return task.task_id() == a.editTask().task_id();
		});
		a.tasks.replace(task, a.editTask());
	}

	a.TaskModel = function(t) {
		var tm = this;
		if (typeof t != "undefined") {
			tm.task_id = ko.observable(t.task_id());
			tm.position = ko.observable(t.position())
			tm.text = ko.observable(t.text());
			tm.isChecked = ko.observable(t.isChecked());
		}
		else {
			tm.task_id = ko.observable(Date.now());
			tm.position = ko.observable(a.dailyTasks().length)
			tm.text = ko.observable("");
			tm.isChecked = ko.observable(false);
		}

		tm.removeTask = function() {
			a.tasks.remove(function (task) {
			  return task.task_id() == tm.task_id(); 
			});
		};

		tm.openEditTask = function(data, index) {
			a.editTask(tm);
		};
	};

	a.init();
}

ko.applyBindings(new AppViewModel(), document.getElementById("app"));