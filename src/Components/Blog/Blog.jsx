import { useNavigate } from 'react-router-dom';
import './Blog.css';

const Blog = () => {
  const navigate = useNavigate();

  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Tips for Planning Your Dream Vacation",
      excerpt: "Discover the secrets to creating the perfect travel itinerary with AI-powered planning tools.",
      date: "Dec 15, 2025",
      category: "Travel Tips",
      image: "https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 2,
      title: "How AI is Revolutionizing Travel Planning",
      excerpt: "Learn how artificial intelligence is making trip planning faster, smarter, and more personalized.",
      date: "Dec 10, 2025",
      category: "Technology",
      image: "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 3,
      title: "Budget Travel: Explore More, Spend Less",
      excerpt: "Expert strategies for planning amazing trips without breaking the bank.",
      date: "Dec 5, 2025",
      category: "Budget Travel",
      image: "https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 4,
      title: "Top 15 Destinations for 2025",
      excerpt: "Explore the most exciting travel destinations trending this year.",
      date: "Nov 28, 2025",
      category: "Destinations",
      image: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 5,
      title: "Solo Travel Guide: Your Complete Handbook",
      excerpt: "Everything you need to know about traveling alone safely and confidently.",
      date: "Nov 20, 2025",
      category: "Solo Travel",
      image: "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 6,
      title: "Family Vacation Planning Made Easy",
      excerpt: "Tips and tricks for planning stress-free family trips that everyone will enjoy.",
      date: "Nov 15, 2025",
      category: "Family Travel",
      image: "https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  return (
    <div className="blog-container">
      <nav className="blog-navbar">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          EMWare <span>AI</span>
        </div>
        <div className="nav-buttons">
          <button className="btn home-btn" onClick={() => navigate("/")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Home
          </button>
          <button className="btn plan-btn" onClick={() => navigate("/form")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Plan Trip
          </button>
        </div>
      </nav>

      <div className="blog-content">
        <header className="blog-header">
          <h1 className="blog-title">Travel Planning Blog</h1>
          <p className="blog-subtitle">Expert tips, guides, and inspiration for your next adventure</p>
        </header>

        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article key={post.id} className="blog-card">
              <div className="blog-image-wrapper">
                <img src={post.image} alt={post.title} className="blog-image" />
                <span className="blog-category">{post.category}</span>
              </div>
              <div className="blog-card-content">
                <div className="blog-meta">
                  <span className="blog-date">{post.date}</span>
                </div>
                <h2 className="blog-card-title">{post.title}</h2>
                <p className="blog-excerpt">{post.excerpt}</p>
                <button className="read-more-btn">
                  Read More
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
