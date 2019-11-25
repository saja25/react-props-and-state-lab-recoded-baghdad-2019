import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }
  handelChange=(event)=>{
    this.setState({
      filters:{
        ...this.state.filters,
        type:event.target.value
      }
    })
  }
  fetchPets=()=>{
    let result;
    if(this.state.filters.type==='all'){
     return result=fetch('/api/pets')
    }else if(this.state.filters.type==='cat'){
      return result=fetch('/api/pets?type=cat')
    }else if(this.state.filters.type==='dog'){
      return result=fetch('/api/pets?type=dog')
    }else if(this.state.filters.type==='micropig'){
      return result=fetch('/api/pets?type=micropig')
    }
    this.setState({
      pets:result
    })
  }
  handelAdppt=(petId)=>{
    let pets=this.state.pets.map((element)=>{
      if(element.id===petId){
        return { ...element, isAdopted: true }
      }return element   
    })
    this.setState({ pets });
  }
  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handelChange} onFindPetsClick={this.fetchPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.handelAdppt} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
