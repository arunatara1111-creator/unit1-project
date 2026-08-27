import React from "react";

function Home() {
  return (
    <main className="home">

      <section className="hero">

        <h2>Helping Kids Thrive</h2>

        <p>
          Understanding ADHD and Building Confidence
        </p>

        <p>
          Simple tools and supportive routines for children,
          parents, teachers, and healthcare professionals.
        </p>

      </section>


      <section>

        <h2>What is ADHD?</h2>

        <p>
          ADHD is a neurodevelopmental condition that can affect
          attention, organization, activity level, impulse control,
          and emotional regulation.
        </p>

      </section>


      <section>

        <h2>ADHD Strengths</h2>

        <div className="cards">

          <div>Creativity</div>
          <div>Passion</div>
          <div>Energy</div>
          <div>Problem Solving</div>
          <div>Curiosity</div>
          <div>Empathy</div>

        </div>

      </section>


      <section>

        <h2>Michael Phelps</h2>

        <p>
          Turning Challenges Into Strengths
        </p>

        <p>
          Michael Phelps has spoken publicly about growing up
          with ADHD and how swimming helped him channel his energy.
        </p>

        <div className="video">

          <iframe
            src="https://www.youtube.com/embed/XGynNTwUq3Y"
            title="Michael Phelps ADHD Story"
            allowFullScreen
          />

        </div>

      </section>


      <section>

        <h2>You Can Succeed</h2>

        <p>
          ADHD is one part of a person. It does not define
          their potential.
        </p>

        <p className="message">
          Small Steps. Big Progress.
        </p>

      </section>

    </main>
  );
}

export default Home;