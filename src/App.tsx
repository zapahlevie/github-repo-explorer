import SearchBar from './components/search/SearchBar';
import SearchInfo from './components/search/SearchInfo';
import UserList from './components/user/UserList';

function App() {
  return (
    <main className="flex flex-col px-4">
      <h1 className="sr-only">Explore GitHub Repositories</h1>
      <SearchBar />
      <SearchInfo />
      <UserList />
    </main>
  );
}

export default App;
