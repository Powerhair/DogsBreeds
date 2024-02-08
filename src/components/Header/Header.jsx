import "./Header.scss";

function Header({ showQuiz, showContent, showTest, showSearch }) {
  return (
    <div className="header">
      <button className="header__button" onClick={showTest}>
        Кто ты в мире собак?
      </button>
      <button className="header__button" onClick={showContent}>
        Случайные факты о собаках
      </button>
      <button className="header__button" onClick={showQuiz}>
        Собачий квиз!
      </button>
      <button className="header__button" onClick={showSearch}>
        Найди свою породу
      </button>
    </div>
  );
}

export default Header;
