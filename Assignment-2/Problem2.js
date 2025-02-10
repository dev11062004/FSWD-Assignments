// Array to store the expense objects
let expenses = [];

// Function to add an expense
const addExpense = () => {
    try {
        // Get input values from the form
        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const expenseDate = new Date(document.getElementById('expenseDate').value);

        // Validate input
        if (!description.trim()) {
            throw new Error("Description cannot be empty.");
        }
        if (isNaN(amount) || amount <= 0) {
            throw new Error("Amount must be a positive number.");
        }
        if (isNaN(expenseDate.getTime())) {
            throw new Error("Invalid date.");
        }

        // Create a new expense object
        const newExpense = { description, amount, date: expenseDate };

        // Add the new expense to the array
        expenses.push(newExpense);

        // Clear form inputs
        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';
        document.getElementById('expenseDate').value = '';

        // Display the updated list of expenses and total
        displayExpenses();
        updateTotalExpenses();
    } catch (error) {
        alert(error.message);
    }
};

// Function to calculate the total expenses using reduce()
const updateTotalExpenses = () => {
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    document.getElementById('totalExpenses').textContent = total.toFixed(2);
};

// Function to display expenses in the list
const displayExpenses = () => {
    const listElement = document.getElementById('expenseList');
    listElement.innerHTML = ''; // Clear current list

    expenses.forEach(expense => {
        const listItem = document.createElement('li');
        listItem.textContent = `${expense.description} - $${expense.amount.toFixed(2)} - ${expense.date.toLocaleDateString()}`;
        listElement.appendChild(listItem);
    });
};

// Function to filter expenses by date range
const filterByDate = () => {
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        alert("Please enter a valid date range.");
        return;
    }

    const filteredExpenses = expenses.filter(expense => {
        return expense.date >= startDate && expense.date <= endDate;
    });

    const listElement = document.getElementById('expenseList');
    listElement.innerHTML = ''; // Clear current list

    filteredExpenses.forEach(expense => {
        const listItem = document.createElement('li');
        listItem.textContent = `${expense.description} - $${expense.amount.toFixed(2)} - ${expense.date.toLocaleDateString()}`;
        listElement.appendChild(listItem);
    });
};

// Simulate fetching the expense report asynchronously using a Promise
const fetchExpenseReport = () => {
    const fetchReportPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (expenses.length === 0) {
                reject("No expenses available for the report.");
            } else {
                resolve(expenses);
            }
        }, 2000); // Simulate delay (2 seconds)
    });

    // Handle the result of the promise
    fetchReportPromise
        .then((report) => {
            console.log("Expense Report:", report);
            alert("Expense report fetched successfully! Check the console.");
        })
        .catch((error) => {
            console.error(error);
            alert(error);
        });
};
