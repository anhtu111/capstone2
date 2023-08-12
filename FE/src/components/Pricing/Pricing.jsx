import React from "react";
import "./Pricing.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
export default function Pricing() {
  return (
    <div>
      <NavBar />
      <div className="container-pricing">
        <div className="image-main">
          <img src="./img/pricing-menu.webp" />
        </div>
        <div className="tickets-title">Our Pricing</div>

        <div className="tickets">
          {/* 1 */}
          <div className="ticket">
            <img src="./img/ticket/class-pass.svg" />
            <div className="ticket-title">Class Pass</div>
            <p>
              A class pass offers one session to one class OR one time weight
              room use
            </p>
            <button>Book Trial</button>
          </div>
          {/* 2 */}
          <div className="ticket">
            <img src="./img/ticket/day-pass.svg" />
            <div className="ticket-title">Day Pass</div>
            <p>
              A Day pass offers one session to one class OR one time weight room
              use
            </p>
            <button>Book Trial</button>
          </div>
          {/* 3 */}
          <div className="ticket">
            <img src="./img/ticket/premium.svg" />
            <div className="ticket-title">Premium</div>
            <p>
              A class pass offers one session to one class OR one time weight
              room use
            </p>
            <button>Book Trial</button>
          </div>
          {/* 4 */}
          <div className="ticket">
            <img src="./img/ticket/basic.svg" />
            <div className="ticket-title">Basic</div>
            <p>2 sessions a week (8 sessions a month only) for one sport</p>
            <button>Book Trial</button>
          </div>
          {/* 5 */}
          <div className="ticket">
            <img src="./img/ticket/Unlimited.svg" />
            <div className="ticket-title">Unlimited</div>
            <p>
              <ul>
                <li>
                  Access to all sports <li>Unlimited sessions to classes </li>
                  <li>Swimming pool access (Open 6AM-5PM)</li>
                  <li>Free towel rental </li>
                  <li>Complimentaryfitness assessment</li>
                </li>
              </ul>
            </p>
            <button>Book Trial</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
