interface InterfaceBackboxContent {
  handleClickButton: () => void,
  title: string,
  paragraphText: string,
  buttonText: string,
}

const BackboxContent = ({ handleClickButton, title, paragraphText, buttonText }: InterfaceBackboxContent) => {
  return (
    <div className="backbox--content">
      <div className="textcontent">
        <p className="title">{title}</p>
        <p>{paragraphText}</p>
        <button onClick={handleClickButton} className="btn">{buttonText}</button>
      </div>
    </div>
  );
};

export default BackboxContent