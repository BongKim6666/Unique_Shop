import ShoppingList from "./ShoppingList";
import Contact from "./Contact";
import MainCarousel from "./MainCarousel";

function Home() {
  return (
    <div className="home">
      <MainCarousel />
      <ShoppingList />
      <Contact />
    </div>
  );
}

export default Home;
