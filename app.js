import express from 'express';
import createHomepageTemplate from './views/index.js';
import createBookListTemplate from './views/list.js';
import BOOKS_DATA from './data/data.js';
import createBookTemplate from './views/books.js';

// create app
const app = express();
app.use(express.urlencoded({extended: false}));

// static assets
app.use(express.static('public'));

// routes
app.get('/', (req, res) => {
  res.send(createHomepageTemplate());
});
app.get('/books', (req, res) => {
  res.send(createBookListTemplate());
});

app.post('/books', (req, res) => {
	const { title, author } = req.body;
  const newBook = {
    id: `${Number(BOOKS_DATA[BOOKS_DATA.length - 1].id) + 1}`, // find the last book in the list and add one to it's id
    title: title,
    author: author
  }
  BOOKS_DATA.push(newBook);

  res.redirect(`/books/${newBook.id}`);
});

app.get('/books/:id', (req, res) => {
  const {id} = req.params;

  const book = BOOKS_DATA.find(bookid => bookid.id === id);
  res.send(createBookTemplate(book));
})

app.delete('/books/:id', (req, res) => {
  const {id} = req.params;

  const deletedBookindex = BOOKS_DATA.findIndex(book => book.id === id);
  BOOKS_DATA.splice(deletedBookindex, 1);
  res.send();
});


// listen to port
app.listen(3000, () => {
  console.log('App listening on port 3000');
});