import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './App.css';

function App() {
  const header_info = [
    {
      title: "Article title test",
      isLoggedIn: false,
      links: [
        {
          name: "Link 1",
          url: "#"
        },
        {
          name: "Link 2",
          url: "#"
        },
        {
          name: "Link 3",
          url: "#"
        }
      ]
  }
  ];

  const posts = [
    {
      "title": "The Rise of AI in Everyday Life",
      "content": "This post explores how artificial intelligence is no longer a futuristic concept but a part of our daily routines. From smart assistants and personalized recommendations to self-driving cars, we delve into the various ways AI is shaping our world and the ethical considerations that come with its rapid advancement.",
      "url": "#"
    },
    {
      "title": "Mastering the Art of Remote Work",
      "content": "With the shift towards remote work becoming more permanent, this summary offers practical tips and strategies for staying productive and maintaining a healthy work-life balance. We cover everything from setting up an effective home office to communication tools and mental well-being in a virtual environment.",
      "url": "#"
    },
    {
      "title": "Sustainable Living on a Budget",
      "content": "Living sustainably doesn't have to be expensive. This blog post breaks down simple, affordable ways to reduce your environmental footprint. Learn about DIY projects, smart grocery shopping, and energy-saving hacks that benefit both the planet and your wallet.",
      "url": "#"
    }
  ];

  const postColumns = 3;

  return ( 
    <main>
      <Header props={header_info} />
      <MainContent postsList={posts} postColumns={postColumns} />
      <Footer />
    </main>
  )
}

export default App;
