import { useEffect, useState } from "react";

const Sandbox = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      <h2>React Testing Library Example</h2>
      <p>You can search me with regular expression</p>
      {showError && <p>Error Message</p>}
      <ul>
        <li>item 1</li>
        <li>item 2</li>
        <li>item 3</li>
        <li>item 4</li>
      </ul>
      {showMessage && <p>Async Message</p>}
    </div>
  );
};
export default Sandbox;
