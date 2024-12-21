const GOALS = "goals"
const localGoals = localStorage.getItem(GOALS)
const goals = localGoals ? JSON.parse(localGoals) : []

const addGoalCard = document.getElementById("add-goal-card")
const goalInput = document.getElementById("add-goal-card-goal")
const yearInput = document.getElementById("add-goal-card-year")
const goalsList = document.getElementById("goals-list")
const addGoalButton = document.getElementById("add-goal-card-button")

function addGoalToDocument(goal, index) {
  const goalRoot = document.createElement("li")
  goalRoot.classList.add("goal-item")
  goalRoot.id = "goal-" + index

  const goalCompletedCheck = document.createElement("input")
  goalCompletedCheck.setAttribute("type", "checkbox")
  goalCompletedCheck.id = "completed-check-" + index
  goalCompletedCheck.classList.add("completed-check")
  goalCompletedCheck.checked = goal.completed
  goalCompletedCheck.addEventListener('change', (event) => {
    goals[index].completed = event.currentTarget.checked
    localStorage.setItem(GOALS, JSON.stringify(goals))
  })

  const goalCompletedLabel = document.createElement("label")
  goalCompletedLabel.setAttribute("for", goalCompletedCheck.id)
  goalCompletedLabel.textContent = "Выполнено"

  const goalYear = document.createElement("div")
  goalYear.classList.add("goal-date")
  goalYear.innerText = "Цель на " + goal.year + " год:"

  const goalText = document.createElement("div")
  goalText.classList.add("goal-text")
  goalText.textContent = goal.text

  const checkWrapper = document.createElement("div")
  checkWrapper.appendChild(goalCompletedCheck)
  checkWrapper.appendChild(goalCompletedLabel)

  goalRoot.appendChild(checkWrapper)
  goalRoot.appendChild(goalYear)
  goalRoot.appendChild(goalText)
  goalsList.appendChild(goalRoot)
}

function updateGoals() {
  goalsList.innerHTML = ""
  goals.sort((a, b) => b.year - a.year)
  goals.forEach((goal, index) => addGoalToDocument(goal, index))
}

function addNewGoal() {
  const newGoal = {
    completed: false,
    text: goalInput.value,
    year: yearInput.value
  }

  goalInput.value = ""

  goals.push(newGoal)
  localStorage.setItem(GOALS, JSON.stringify(goals))
  updateGoals()
}

if (goals.length) updateGoals()
yearInput.value = new Date().getFullYear()

addGoalButton.addEventListener("click", () => {
  addNewGoal()
})