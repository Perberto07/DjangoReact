import Navigation from './Navigation';

const HeaderMain = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between h-16 px-6">
        <h1 className="text-xl font-semibold text-gray-800">Header ng Store</h1>
        
        {/* Semantic Navigation */}
        <nav role="navigation" aria-label="Main navigation">
          <Navigation />
        </nav>
      </div>
    </header>
  );
};

export default HeaderMain;
