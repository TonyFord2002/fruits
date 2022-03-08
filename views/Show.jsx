const React = require('react')
    class Show extends React.Component {
       render () {
        return (
          <div>
                <h1>Fruits show page</h1>
                The { this.props.fruit.name } is and  { this.props.fruit.color }
        { this.props.fruit.readyToEat ? ` it is ready to eat` : ` it is not ready to eat` }
            </div>
         );
        }
     }

     module.exports  = Show;