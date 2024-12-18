const PLANS = "plans"
const localPlans = localStorage.getItem(PLANS)
const plans = localPlans ? JSON.parse(localPlans) : []

const addPlanCard = document.getElementById("add-plan-card")
const planInput = document.getElementById("add-plan-card-plan")
const dateInput = document.getElementById("add-plan-card-date")
const plansList = document.getElementById("plans-list")
const addPlanButton = document.getElementById("add-plan-card-button")

function addPlanToDocument(plan, index) {
  const planRoot = document.createElement("li")
  planRoot.classList.add("plan-item")
  planRoot.id = "plan-" + index

  const planCompletedCheck = document.createElement("input")
  planCompletedCheck.setAttribute("type", "checkbox")
  planCompletedCheck.id = "completed-check-" + index
  planCompletedCheck.classList.add("completed-check")
  planCompletedCheck.checked = plan.completed
  planCompletedCheck.addEventListener('change', (event) => {
    plans[index].completed = event.currentTarget.checked
    localStorage.setItem(PLANS, JSON.stringify(plans))
  })

  const planCompletedLabel = document.createElement("label")
  planCompletedLabel.setAttribute("for", planCompletedCheck.id)
  planCompletedLabel.textContent = "Выполнено"

  const planUrgentCheck = document.createElement("input")
  planUrgentCheck.setAttribute("type", "checkbox")
  planUrgentCheck.id = "urgent-check-" + index
  planUrgentCheck.classList.add("urgent-check")
  planUrgentCheck.checked = plan.urgent
  planUrgentCheck.addEventListener('change', (event) => {
    plans[index].urgent = event.currentTarget.checked
    localStorage.setItem(PLANS, JSON.stringify(plans))
  })

  const planUrgentLabel = document.createElement("label")
  planUrgentLabel.setAttribute("for", planUrgentCheck.id)
  planUrgentLabel.textContent = "Срочно"

  const planText = document.createElement("div")
  planText.classList.add("plan-text")
  planText.textContent = plan.text

  const planDate = document.createElement("div")
  planDate.classList.add("plan-date")
  planDate.innerText = new Date(plan.date).toLocaleDateString("ru")

  const checkWrapper = document.createElement("div")
  checkWrapper.appendChild(planCompletedCheck)
  checkWrapper.appendChild(planCompletedLabel)

  const urgentWrapper = document.createElement("div")
  urgentWrapper.appendChild(planUrgentCheck)
  urgentWrapper.appendChild(planUrgentLabel)

  planRoot.appendChild(checkWrapper)
  planRoot.appendChild(urgentWrapper)
  planRoot.appendChild(planText)
  planRoot.appendChild(planDate)
  plansList.appendChild(planRoot)
}

function updatePlans() {
  plansList.innerHTML = ""
  plans.sort((a, b) => b.date - a.date)
  plans.forEach((plan, index) => addPlanToDocument(plan, index))
}

function addNewPlan() {
  const newPlan = {
    completed: false,
    urgent: false,
    text: planInput.value,
    date: (dateInput.value ? new Date(dateInput.value) : new Date()).getTime()
  }

  planInput.value = ""
  dateInput.value = null

  plans.push(newPlan)
  localStorage.setItem(PLANS, JSON.stringify(plans))
  updatePlans()
}

if (plans.length) updatePlans()

addPlanButton.addEventListener("click", () => {
  addNewPlan()
})