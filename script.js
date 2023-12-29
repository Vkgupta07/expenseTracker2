// Function to add an expense
function addExpense(event) {
    event.preventDefault();
  
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
  
    // Create expense object
    const expense = {
      amount,
      category,
      description
    };
  
    // Checking if expenses exist in local storage or not
    let expenses = localStorage.getItem('expenses');
    if (expenses) {
      expenses = JSON.parse(expenses);
    } else {
      expenses = [];
    }
  
    // Add new expense
    expenses.push(expense);
  
    // Saving expenses to local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));
  
    // Clear form inputs with reset function
    document.getElementById('expenseForm').reset();
  
    // Refresh expense list
    displayExpenses();
  }
  
  // Function to delete an expense
  function deleteExpense(index) {
    let expenses = JSON.parse(localStorage.getItem('expenses'));
  
    // Remove expense at the specified index
    expenses.splice(index, 1);
  
    // Save updated expenses to local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));
  
    // Refresh expense list
    displayExpenses();
  }

  // Function to edit an expense
function editExpense(index) {
    let expenses = JSON.parse(localStorage.getItem('expenses'));
  
    // Get the expense object at the specified index
    const expense = expenses[index];
console.log("expenses",expense.amount)
    // Update the expense properties using prompt or input fields
    const updatedAmount = document.getElementById('amount').value = expense.amount;
    const updatedCategory = document.getElementById('category').value = expense.category;
    const updatedDescription = document.getElementById('description').value= expense.description;


    // Update the expense object
    expense.amount = updatedAmount;
    expense.category = updatedCategory;
    expense.description = updatedDescription;
  
    // Save updated expenses to local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));
  
    // Refresh expense list
    displayExpenses();
  }
  
  // Function to display expenses
  function displayExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const expensesList = document.getElementById('expenses');
  
    // Clear existing list
    expensesList.innerHTML = '';
  
    // Display each expense
    expenses.forEach((expense, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<strong>${expense.amount}</strong> - ${expense.category} (${expense.description})`;
      
      // Create delete button
      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.classList.add('delete-btn');
      deleteButton.addEventListener('click', () => deleteExpense(index));
      
      // Create edit button
      const editButton = document.createElement('button');
      editButton.innerText = 'Edit';
      editButton.classList.add('edit-btn');
      editButton.addEventListener('click', () => editExpense(index));
      
      // Append delete and edit buttons to list item
      listItem.appendChild(deleteButton);
      listItem.appendChild(editButton);
  
      expensesList.appendChild(listItem);
    });
  }
  
  // Event listener for form submit
  document.getElementById('expenseForm').addEventListener('submit', addExpense);
  
  // Display existing expenses on page load
  displayExpenses();
  