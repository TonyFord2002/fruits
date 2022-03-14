const React = require('react')
    class Show extends React.Component {
       render () {
        return (
          <div>
             <link rel="stylesheet" href="/css/app.css"/>    
                <h1>Fruits show page</h1>
                <h2>The { this.props.fruit.name } is and  { this.props.fruit.color }
        { this.props.fruit.readyToEat ? ` it is ready to eat` : ` it is not ready to eat` }</h2>
            <a href={'/fruits'}>Back to list</a>
            </div>
         );
        }
     }

     module.exports  = Show;