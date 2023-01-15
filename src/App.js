import { Component } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

/**
 * This component represents the entire application.
 * We will break this component into smaller components.
 */

class App extends Component {

  constructor() {
    super();

    // The initial state: So that users don't get error message
    this.state = {
      monsters: [],
      searchField: ''
    };
  }

  /**
   * Mounting is first time a component gets placed onto the DOM.
   * It only happens once throughout the component's lifetime.
   * It's a lifecycle method.
   */
  componentDidMount() {
    // Promise
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) =>
        this.setState(
          () => {
            return { monsters: users };
          }
        )
      );
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();

    this.setState(
      () => {
        /**
         * if the variable name is different from searchField, for example, searchString
         * then we have to return like following
         * return { searchField: searchString };
         * but if it's exactly same as the state field name, you can use this short form.
         */
        return { searchField };
      }
    );
  };

  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter(
      (monster) => {
        return monster.name.toLocaleLowerCase().includes(searchField);
      }
    );

    return (
      <div className="App">
        <h1 className='app-title'>Monsters Rolodex</h1>

        <SearchBox 
          className='monsters-search-box'
          onChangeHandler={onSearchChange} 
          placeholder='Search monsters' />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
