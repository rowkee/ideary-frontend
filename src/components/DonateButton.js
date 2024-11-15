import React from "react";

function DonateButton() {
  return (
    <div>
      <a
        href="https://www.paypal.com/donate/?hosted_button_id=SYU2J66QXLJ42"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="btn btn-primary mt-10">Donate</button>
      </a>
    </div>
  );
}

export default DonateButton;
