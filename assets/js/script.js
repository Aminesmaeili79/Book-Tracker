var library = [];

// ADDING TOTAL AND FINISHED TO THE DOM
const totalBooks = document.querySelector(".stats-info-total");
const finishedBooks = document.querySelector(".stats-info-finished");

// ADDING BOOKSHELF TO THE DOM
const books = document.querySelector(".books");

// attachReadButtonListeners();

const createBook = function (title, author, pages, isRead) {
	// CREATING BOOK CARD - .book
	const bookCard = document.createElement("div");
	bookCard.classList.add("relative", "book");

	// CREATING BOOK INFORMATION DIVS - .book-info
	// for title
	const bookCardInfoForTitle = document.createElement("div");
	bookCardInfoForTitle.classList.add("book-info");
	// for author
	const bookCardInfoForAuthor = document.createElement("div");
	bookCardInfoForAuthor.classList.add("book-info");

	// CREATING BOOK INFORMATION CONTENTS
	// .book-info-title for title
	const bookCardInfoTitle = document.createElement("h2");
	bookCardInfoTitle.classList.add("book-info-title");

	// .book-info-title for author
	const bookCardInfoAuthor = document.createElement("h2");
	bookCardInfoAuthor.classList.add("book-info-title");

	// .book-info-heading for title
	const bookCardInfoHeadingTitle = document.createElement("h2");
	bookCardInfoHeadingTitle.classList.add("book-info-heading", "heading-title");

	// .book-info-heading for author
	const bookCardInfoHeadingAuthor = document.createElement("h2");
	bookCardInfoHeadingAuthor.classList.add(
		"book-info-heading",
		"heading-author"
	);

	// .book-info-heading for pages
	const bookCardInfoHeadingPages = document.createElement("h2");
	bookCardInfoHeadingPages.classList.add("book-info-heading");

	// SHOULD ADD .heading-title and .heading-author

	// CREATING BOOK STATUS AND PAGES DIVS - .book-info-status-items
	const bookCardInfoStatusItems = document.createElement("div");
	bookCardInfoStatusItems.classList.add("book-info-status-items");

	// .book-info-pages
	const bookCardInfoPages = document.createElement("h2");
	bookCardInfoPages.classList.add("book-info-pages");

	// .book-info-heading span
	const bookCardInfoPagesCount = document.createElement("span");

	// .book-info-status
	const bookCardInfoStatus = document.createElement("div");
	bookCardInfoStatus.classList.add("book-info-status");

	// .book-info-read-status
	const bookCardInfoReadStatus = document.createElement("h3");
	bookCardInfoReadStatus.classList.add("book-info-read-status");

	// ADDING DIVS AND INFO TO BOOK CARD
	// ADDING REMOVE BUTTON
	bookCard.innerHTML = `<svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    class='svg-remove-book'
>
    <title>window-close</title>
    <path
        d='M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z'
    />
</svg>`;
	// ADDING TITLE
	bookCardInfoTitle.innerText = "Title:";
	bookCardInfoForTitle.appendChild(bookCardInfoTitle);

	bookCardInfoHeadingTitle.classList.add("heading-title");
	bookCardInfoHeadingTitle.innerText = title;
	bookCardInfoForTitle.appendChild(bookCardInfoHeadingTitle);

	bookCard.appendChild(bookCardInfoForTitle);
	// ADDING AUTHOR
	bookCardInfoAuthor.innerText = "Author:";
	bookCardInfoForAuthor.appendChild(bookCardInfoAuthor);

	bookCardInfoHeadingAuthor.classList.add("heading-author");
	bookCardInfoHeadingAuthor.innerText = author;
	bookCardInfoForAuthor.appendChild(bookCardInfoHeadingAuthor);

	bookCard.appendChild(bookCardInfoForAuthor);
	// ADDING BOOK PAGES AND READ STATUS
	bookCardInfoPagesCount.innerText = pages.toString();
	bookCardInfoHeadingPages.innerText =
		bookCardInfoPagesCount.innerText + " Pages";

	bookCardInfoPages.appendChild(bookCardInfoHeadingPages);
	bookCardInfoStatusItems.appendChild(bookCardInfoPages);

	if (isRead) {
		bookCardInfoReadStatus.classList.add("status-read");
		bookCardInfoReadStatus.innerText = "Read";
	} else {
		bookCardInfoReadStatus.classList.add("status-unread");
		bookCardInfoReadStatus.innerText = "Unread";
	}

	bookCardInfoStatus.appendChild(bookCardInfoReadStatus);
	bookCardInfoStatusItems.appendChild(bookCardInfoStatus);

	bookCard.appendChild(bookCardInfoStatusItems);

	// ADDING BOOK TO THE BOOKSHELF
	books.appendChild(bookCard);

	// ADDING BOOK TO THE LIBRARY LIST
	library.push(bookCard);

	attachReadButtonListeners(bookCardInfoReadStatus);

	attachUpdateTotal(library);
	attachUpdateFinished(library);

	attachBookRemove(bookCard);

	return bookCard;
};

// ADDING MODAL, MODAL OPEN AND CLOSE BUTTON TO THE DOM
// .modal
const modal = document.querySelector(".modal");
// .book-add
const modalOpen = document.querySelector(".book-add");
// .close-modal
const modalClose = document.querySelector(".close-modal");

// APPEARING AND DISAPPEARING OF MODAL
modalOpen.addEventListener("click", () => {
	modal.classList.add("display-modal");
});
modalClose.addEventListener("click", () => {
	modal.classList.remove("display-modal");
});

// ADDING FORM AND INPUTS OF BOOK INFORMATION TO THE DOM
const bookInfoForm = document.querySelector("#form");
const bookInputTitle = document.querySelector("#title");
const bookInputAuthor = document.querySelector("#author");
const bookInputPages = document.querySelector("#pages");
const bookInputIsRead = document.querySelector("#is-read");
bookInfoForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const book = createBook(
		bookInputTitle.value,
		bookInputAuthor.value,
		bookInputPages.value,
		bookInputIsRead.checked
	);
	// CLEARING INPUT FIELDS
	const inputs = Array.from(document.querySelectorAll("input"));
	inputs.forEach((input) => (input.value = ""));
	const inputCheckBox = document.querySelector("input#is-read");
	inputCheckBox.checked = false;
	//CLOSING MODAL
	modal.classList.remove("display-modal");
});

// CHANGE THE STATUS OF THE BOOK
function attachReadButtonListeners(bookCardInfoReadStatus) {
	bookCardInfoReadStatus.addEventListener("click", () => {
		if (bookCardInfoReadStatus.innerText === "Read") {
			bookCardInfoReadStatus.innerText = "Unread";
			bookCardInfoReadStatus.classList.remove("status-read");
			bookCardInfoReadStatus.classList.add("status-unread");
		} else if (bookCardInfoReadStatus.innerText === "Unread") {
			bookCardInfoReadStatus.innerText = "Read";
			bookCardInfoReadStatus.classList.remove("status-unread");
			bookCardInfoReadStatus.classList.add("status-read");
		}
		attachUpdateFinished(library);
	});
}

function attachBookRemove(book) {
	book.children[0].addEventListener("click", () => {
		books.removeChild(book);
		library.splice(library.indexOf(book));
		attachUpdateTotal(library);
		attachUpdateFinished(library);
	});
}
function attachUpdateTotal(library) {
	totalBooks.innerText = library.length;
}
function attachUpdateFinished(library) {
	finishedCount = 0;
	library.forEach((book) => {
		if (
			book.children[3].children[1].children[0].classList.contains("status-read")
		) {
			finishedCount++;
		}
	});
	finishedBooks.innerText = finishedCount;
}
