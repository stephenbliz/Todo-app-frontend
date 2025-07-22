import Main  from './components/main';
import Nav from './components/nav';

export default function Home() {
  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full h-[14vh] lg-[12vh] z-[1000]"
      >
        <Nav />
      </nav>
      <main>
        <Main />
      </main>
    </>
    
  );
}
