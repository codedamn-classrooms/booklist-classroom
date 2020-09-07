// Book Class: Represents a Book
class Book {
	constructor(title, author, isbn) {
		this.title = title
		this.author = author
		this.isbn = isbn
	}
}

const defaultBooks = [
	{
		title: 'Book 1',
		author: 'Brad Traversy',
		isbn: '12345'
	},
	{
		title: 'Book 2',
		author: 'Mehul Mohan',
		isbn: '6789'
	}
]

// UI Class: Handle UI Tasks
class UI {
	static showAlert(message, className) {
		const div = document.createElement('div')
		div.innerText = message
		div.className = `alert alert-${className}`
		document.getElementById('book-form').prepend(div)

		setTimeout(() => {
			div.remove()
		}, 2000)
	}

	static deleteBook(target) {
		if (target.classList.contains('delete')) {
			// we clicked the X icon
			target.parentElement.parentElement.remove()
		}
	}
	static clearFields() {
		const author = document.getElementById('author')
		const title = document.getElementById('title')
		const isbn = document.getElementById('isbn')
		author.value = ''
		title.value = ''
		isbn.value = ''
	}

	static displayBooks() {
		defaultBooks.forEach((book) => UI.addBookToList(book))
	}

	static addBookToList(book) {
		const list = document.getElementById('book-list')

		const row = document.createElement('tr')

		row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `

		list.appendChild(row)
	}
}

// Event: Display Books
UI.displayBooks()

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', addABook, false)

function addABook(e) {
	// prevent actual submission
	e.preventDefault()

	// Get Form Values
	const author = document.getElementById('author').value
	const title = document.getElementById('title').value
	const isbn = document.getElementById('isbn').value

	if (!author || !title || !isbn) {
		UI.showAlert('Please enter correct details', 'danger')
		return
	}

	// Instantiate a new Book object
	const book = new Book(title, author, isbn)

	// Add book object to UI
	UI.addBookToList(book)

	UI.showAlert('Book Added', 'success')

	// Clear fields
	UI.clearFields()
}

document.getElementById('book-list').addEventListener('click', handleRemove)
function handleRemove(e) {
	UI.deleteBook(e.target)
	UI.showAlert('Book Removed', 'success')
}
