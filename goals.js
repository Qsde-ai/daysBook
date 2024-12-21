const goals = []

const addGoalCard = document.getElementById("add-goal-card")
const goalInput = document.getElementById("add-goal-card-plan")
const yearInput = document.getElementById("add-goal-card-year")
const goalsList = document.getElementById("goals-list")
const addGoalButton = document.getElementById("add-goal-card-button")

function updateGoals() {
  goalsList.innerHTML = ""
  goals.sort((a,b) => a.year - b.year)
  goals.forEach((goal, i) => {
    const goalRoot = document.createElement("li")
    goalRoot.classList.add("goal-item")
    goalRoot.id = "goal-" + i

    const goalCompletedCheck = document.createElement("input")
    goalCompletedCheck.setAttribute("type", "checkbox")
    goalCompletedCheck.id = "completed-check-" + i
    goalCompletedCheck.classList.add("completed-check")

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
  })
}

function addNewGoal() {
  const newGoal = {
    text: goalInput.value,
    year: yearInput.value
  }

  goalInput.value = ""
  yearInput.value = null

  goals.push(newGoal)
  updateGoals()
}

addGoalButton.addEventListener("click", () => {
  addNewGoal()
})

