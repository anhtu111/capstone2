import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../NavBar/NavBar";
import "./blog.css";
export default function Blog() {
  const blogs = [
    {
      title: "16 Healthy Bulking Foods For Hard Gainers (With Meal Plan)",
      author: "By Lisa Booth",
      image: "./img/blog/blog-1.jpeg",
      subTitle:
        "You want to pack on muscle mass.  But, you want to focus on quality foods rather than eating everything in sight, which may ultimately be detrimental to your long-term health.",
      desc: "<p>As a nutrition professional who has experienced clients cholesterol levels increasing due to the unhealthy fat and sugar dumped into the most common calorically dense food, I had to discover the healthiest bulking foods for hardgainers.</p> Here is is the top 16 healthy bulking foods for hardgainers: <ul><li>Eggs</li><li>Nuts and seeds</li><li>Beef</li><li>Beans</li><li>Yogurt</li><li>Milk</li><li>Cheese</li><li>Oil</li><li>Avocado</li></ul><strong>Personalizing Your Bulking Nutrition: Everybody is Different</strong><p>Before we dive into nutrient recommendations and the top healthy bulking foods, it is important to consider that your body, metabolism, and genetic make-up is unique. So there is no diet nor meal plan that works for everybody.</p><p>Be realistic about what a reasonable weight gain goal would be for you and your body. Consider where your weight has been as an adult. What do your parents’ body types look like? And at what weight do you feel your personal best?</p><p>As James Clear explains in his book, Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones, true change happens when you commit to the process. That will determine your progress.</p><p>When you take drastic measures to shift your weight too quickly, it can result in unhealthy side effects and damage your metabolism, especially if you’ve struggled with disordered eating in the past, are taking certain medications, or have a medical condition. Make sure to check in with your doctor before making any changes to your diet or fitness plan.</p> ",
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
