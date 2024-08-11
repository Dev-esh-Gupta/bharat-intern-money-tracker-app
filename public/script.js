let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById("category_select");
const amountInput = document.getElementById("amount_input");
const infoInput = document.getElementById("info");
const dateInput = document.getElementById("date_input");
const addBtn = document.getElementById("add_btn");
const expenseTableBody = document.getElementById("expense-table-body");
const totalAmountCell = document.getElementById("total-amount");

function renderExpenses() {
  expenseTableBody.innerHTML = ""; // Clear existing rows
  expenses.forEach((expense) => {
    const newRow = expenseTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const infoCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
      expenses.splice(expenses.indexOf(expense), 1);
      if (expense.category === "Income") {
        totalAmount -= expense.amount;
      }
      if (expense.category === "Expense") {
        totalAmount += expense.amount;
      }

      totalAmountCell.textContent = totalAmount;
      expenseTableBody.removeChild(newRow);
    });

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    infoCell.textContent = expense.info;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
  });
}

addBtn.addEventListener("click", function () {
  const category = categorySelect.value;
  const info = infoInput.value;
  const amount = Number(amountInput.value);
  const date = dateInput.value;

  if (category === "") {
    alert("please select a category");
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    alert("please enter a valid amount");
    return;
  }
  if (info === "") {
    alert("please enter a valid amount info");
    return;
  }
  if (date === "") {
    alert("please select a date");
    return;
  }

  const expense = { category, amount, info, date };
  expenses.push(expense);

  if (category === "Income") {
    totalAmount += amount;
  }
  if (category === "Expense") {
    totalAmount -= amount;
  }
  totalAmountCell.textContent = totalAmount;

  renderExpenses();
});

renderExpenses(); // Initial render if expenses array is pre-filled
