import React from "react";

function Details() {
  return (
    <main className="home">

      <section>
        <h2>About Bright Steps</h2>

        <p>
          Bright Steps is a supportive application designed
          to help children with ADHD build positive daily
          routines, stay organized, and track their progress.
        </p>
      </section>


      <section>
        <h2>What Does Bright Steps Do?</h2>

        <div className="cards">

          <div>
            <h3>Daily Routines</h3>
            <p>
              Children can follow their daily tasks
              step by step.
            </p>
          </div>

          <div>
            <h3>Track Progress</h3>
            <p>
              Children can see completed tasks and
              their daily progress.
            </p>
          </div>

          <div>
            <h3>Build Confidence</h3>
            <p>
              Positive feedback encourages children
              to celebrate their achievements.
            </p>
          </div>

          <div>
            <h3>Parent Support</h3>
            <p>
              Parents can monitor routines and
              support their child's progress.
            </p>
          </div>

        </div>
      </section>


      <section>
        <h2>Who Can Use Bright Steps?</h2>

        <div className="cards">

          <div>Children</div>
          <div>Parents</div>
          
        </div>
      </section>


      <section>
        <h2>How Bright Steps Works</h2>

        <p>1. The child views their daily tasks.</p>

        <p>2. The child completes each task.</p>

        <p>3. Completed tasks are recorded.</p>

        <p>4. Parents can review progress.</p>

        <p>5. The child builds consistent daily habits.</p>
      </section>


      <section>
        <h2>Our Goal</h2>

        <p>
          Bright Steps aims to provide a simple and
          supportive environment where children can
          develop routines, improve organization,
          and celebrate their progress.
        </p>

        <p className="message">
          Small Steps. Big Progress.
        </p>
      </section>

    </main>
  );
}

export default Details;