import BOOKS_DATA from "../data/data.js"
import createBookTemplate from "./books.js";

const createBookListTemplate = () => {
    let template = "<ul>"
    BOOKS_DATA.map((book) => (template += createBookTemplate(book)));
    template += "</ul>";
    return template;
}

export default createBookListTemplate;