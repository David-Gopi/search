// write code to search from the given API enbpoint.optimize code using debouncing in react
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const debounce = (func, delay) => {
      let timeoutId;
      return function (...args) {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
              func.apply(this, args);
          }, delay);
      };
  };
  const handleSearch = async () => {
      setLoading(true);
      try {
          const response = await fetch(
              `http://api.weatherapi.com/v1/current.json?key=4401f9a7f70a4d6f9cf74538241803&q=${searchQuery}&aqi=no`
          );
           // Check if response status is not OK
          const data = await response.json();
          setSearchResults(data);
      } catch (error) {
          console.error("Error fetching data:", error);
      } finally {
          setLoading(false);
      }
  };
  // Debounced version of handleSearch
  const debouncedHandleSearch = debounce(handleSearch, 3000);
  const handleInputChange = (event) => {
      setSearchQuery(event.target.value);
      debouncedHandleSearch(); 
  }