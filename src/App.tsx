import Sidebar from "./components/Sidebar";
import Portfolio from "./components/Portfolio";
import Volunteering from "./components/Volunteering";
import About from "./components/About";
import Blog from "./components/Blog";
import Contact from "./components/Contact";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface transition-colors">
      <Sidebar />

      {/* Main Content */}
      <main className="lg:ml-[280px]">
        {/* Add top padding on mobile for the fixed header bar */}
        <div className="pt-14 lg:pt-0">
          <Portfolio />
          <Volunteering />
          <About />
          <Blog />
          <Contact />
        </div>
      </main>
    </div>
  );
};

export default App;
