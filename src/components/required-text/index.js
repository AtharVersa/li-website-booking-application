import './RequiredText.css';

const RequiredText = ({ text }) => {
  return (
    <>
      <h2>*<span>{text}</span></h2>
    </>
  )
}

export default RequiredText
