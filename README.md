# Task-board
A website where you can store all of your tasks and move then from in progress and finished.
GIVEN a task board to manage a project
You can open the task board
Then the list of project tasks is displayed in columns representing the task progress state (Not Yet Started, In Progress, Completed)
You then view the task board for the project
Then each task is color coded to indicate whether it is nearing the deadline (yellow) or is overdue (red)
When you click on the button to define a new task
Then you can enter the title, description and deadline date for the new task into a modal dialog
When you click the save button for that task
Then the properties for that task are saved in localStorage
When you drag a task to a different progress column
The task's progress state is updated accordingly and will stay in the new column after refreshing
When you click the delete button for a task
The task is removed from the task board and will not be added back after refreshing
When you refresh the page
Then the saved tasks persist and appends to the screen