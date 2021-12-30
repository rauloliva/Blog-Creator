const NotFound = ({ input, notFoundMessage }) => (
  <div className="search__notFound">
    {notFoundMessage && (
      <h3 className="search__notFound-title">
        There are no blogs that matched with {`'${input}'`}
      </h3>
    )}
    <p className="search__notFound-p">Some search tips:</p>
    <ul className="search__notFound-list">
      <li>Make sure all words are spelled correctly</li>
      <li>Try different keywords</li>
      <li>Try more general keywords</li>
    </ul>
  </div>
);

export default NotFound;
