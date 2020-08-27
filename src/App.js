import React, { useEffect, useState} from 'react';
import Recipe from "./Recipe";
import './App.css';


const App = () => {
  const API_ID="2b1b9ab1";
  const API_KEY = "929433e123cfb7f05e2a4eae8054d1bd";

 const[recipes,setRecipes]=useState([]);
const[search, setSearch]=useState('');
const[query,setQuery]=useState("Apple");


useEffect(() =>{
getRecipes();

},[query]);
const getRecipes= async()=>{
  const response=await fetch(
    `https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`
  );
  const data=await response.json();
  setRecipes(data.hits);
  console.log(data.hits);
}
const updateSearch= e=> {
  setSearch(e.target.value);
}
const getSearch = e =>{
e.preventDefault();
setQuery(search);
setSearch('');
}


return(
  <div className="App">
    <form onSubmit={getSearch}
    className="search-form">
      <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
      <button
      className="search-button" type="submit">Search
      </button>
    </form>
    <div className="recipes">
    {recipes.map(recipe =>(
      <Recipe
      key={recipe.recipe.label}
      title={recipe.recipe.label}
      calories={recipe.recipe.calories}
      image={recipe.recipe.image}
      ingredients={recipe.recipe.ingredients}
      />
    ))};
</div>
  </div>
  );
};
export default App;
