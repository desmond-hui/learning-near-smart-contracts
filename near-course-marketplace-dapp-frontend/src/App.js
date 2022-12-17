import './App.css';
import { signIn } from './utils/near';
import { useCallback, useEffect, useState } from 'react';
import { getCourses } from './utils/courses';
import Courses from './components/Courses';
import AddCourse from './components/AddCourse';

function App() {
  const nearAccount = window.walletConnection.account();

  const [courses, setCourses] = useState([]);

  const fetchCourses = useCallback(async () => {
    if (nearAccount.accountId) {
      setCourses(await getCourses());
    }
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="App">
      <h1>My React Dapp</h1>

      {nearAccount.accountId ? (
        <h2>Connected to NEAR Wallet</h2>
      ) : (
        <button onClick={signIn}>Connect to NEAR Wallet</button>
      )}

      {nearAccount.accountId
        ? courses.forEach((course) => console.log(course))
        : console.log('Not connected to NEAR wallet')}

      <Courses courses={courses} />
      <AddCourse />
    </div>
  );
}

export default App;
