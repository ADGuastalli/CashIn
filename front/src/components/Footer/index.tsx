import * as React from "react";

function Footer() {
  return (
    <div>
      <footer className="footer footer-center p-10 text-center border-t-2 border-black/5 text-base-content rounded shadow-sm">
        <div>
          <p>
            Copyright © {new Date().getFullYear()} - All rights reserved by
            CASHIN
          </p>
        </div>
      </footer>
    </div>
  );
}
export default Footer;
