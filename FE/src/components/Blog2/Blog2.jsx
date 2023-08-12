import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../NavBar/NavBar";
import "./blog.css";
export default function Blog2() {
  const blogs = [
    {
      title: "The Best Bulking Leg Workouts: 10 Must-Do Exercises",
      author: "By Mike Dewar",
      image: "./img/blog/blog-2.jpeg",
      subTitle:
        "When looking to gain serious leg size during a bulking process, it is recommended to stick to compound movements like squats, hinges (stiff leg deadlifts) ",
      desc: "<p>Building bigger legs and gaining muscle is one of the main reasons why so many lifters undergo a bulking period. Increased calories often allow for increased training volume, frequencies, and recovery. In short, the more you can train, and recover from that training properly (smart programming and eating enough food), the more you can train, which means the more you can repeat this muscle-building princess. In this article, I’ll review 10 must-do leg exercises if you’re wanting to build bigger legs while bulking. Additionally, I’ll discuss five training techniques that work for beginners and advanced lifers alike to take each of these exercises to the next level. Lastly, I’ll share three leg workouts you can do to gain size and strength in the quadriceps, hamstrings, and calves.</p> <strong>10 Must-Do Leg Exercises for Building Bigger Legs</strong> <ul><li>Back Squats</li><li>Front Squats</li><li>Hack Squats</li><li>Leg Press</li><li> Stiff Leg Deadlifts</li><li>Goodmornings</li><li>Machine Hamstring Curls</li><li>Machine Leg Extensions</li><li>Bulgarian Split Squats</li><li>Walking Lunges</li></ul><strong>Personalizing Your Bulking Nutrition: Everybody is Different</strong><p>Before we dive into nutrient recommendations and the top healthy bulking foods, it is important to consider that your body, metabolism, and genetic make-up is unique. So there is no diet nor meal plan that works for everybody.</p><p>Be realistic about what a reasonable weight gain goal would be for you and your body. Consider where your weight has been as an adult. What do your parents’ body types look like? And at what weight do you feel your personal best?</p><p>As James Clear explains in his book, Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones, true change happens when you commit to the process. That will determine your progress.</p><p>When you take drastic measures to shift your weight too quickly, it can result in unhealthy side effects and damage your metabolism, especially if you’ve struggled with disordered eating in the past, are taking certain medications, or have a medical condition. Make sure to check in with your doctor before making any changes to your diet or fitness plan.</p> ",
    },
  ];

  function BlogPost({ title, author, image, subTitle, desc }) {
    return (
      <div>
        <h2
          style={{
            fontSize: "30px",
            textAlign: "center",
            marginTop: "50px",
            marginBottom: "20px",
          }}
        >
          {title}
        </h2>
        <h3
          style={{
            fontSize: "16px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          {author}
        </h3>
        <div style={{ textAlign: "center" }}>
          <img style={{ width: "80%" }} src={image} alt={title} />
        </div>
        <h5
          style={{
            fontSize: "16px",
            textAlign: "center",
            marginTop: "40px",
          }}
        >
          {subTitle}
        </h5>
        <div
          style={{
            fontSize: "16px",
            marginTop: "40px",
            fontFamily: "Poppins",
            marginBottom: "100px",
            lineHeight: "1.8",
          }}
          dangerouslySetInnerHTML={{ __html: desc }}
        ></div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="blog">
        {blogs.map((blog) => (
          <BlogPost
            title={blog.title}
            author={blog.author}
            image={blog.image}
            subTitle={blog.subTitle}
            desc={blog.desc}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}
