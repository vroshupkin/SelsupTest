import './App.css';
import React from 'react';

interface Color {
    r: number,
    g: number,
    b: number 
}

interface Param<TYPE = string> {
    id: number,
    name: string,
    type?: TYPE
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[];
    colors?: Color[];
}

interface Props {
    params: Param[];
    model: Model;
}

interface State {
  model: Model
}

export class ParamEditor extends React.Component<Props, State> 
{
  state = {
    model: this.props.model
  };
  
  private inputHandler = (ind: number) => (e: React.ChangeEvent<HTMLInputElement>) => 
  {
    const model = Object.assign({}, this.state.model);
    model.paramValues[ind].value = e.target.value;
    this.setState({ model });
  };

  render(): React.ReactNode 
  {
    const style = {
      display: 'flex', gap: '8px', justifyContent: 'space-between'
    };
    
    return(
      <>
        {this.props.params.map((param, ind) => 
          <div key={ind} style={style}>
            <div>{param.name}</div>
            <input 
              type="text"
              onChange={this.inputHandler(ind)}
              value={model.paramValues[ind].value} 
            />
          </div>
        )}

        <button onClick={() => alert(JSON.stringify(this.getModel()))}>Получить модель</button>

      </>
    );
  }
  public getModel(): Model 
  {
    return this.state.model;
  }
}

const params = 
[
  {
    'id': 1,
    'name': 'Назначение'
  },
  {
    'id': 2,
    'name': 'Длина'
  }
];
const model = 
{
  'paramValues': [
    {
      'paramId': 1,
      'value': 'повседневное'
    },
    {
      'paramId': 2,
      'value': 'макси'
    }
  ]
};
function App() 
{
  return (
    <>
      <ParamEditor params={params} model={model}/>
    </>
  );
}

export default App;
