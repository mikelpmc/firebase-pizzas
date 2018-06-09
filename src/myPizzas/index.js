import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import './index.scss';

const defaultImage =
    'https://cdn.dribbble.com/users/60266/screenshots/1926787/ricos-quesos-pizza_1x.jpg';

class MyPizzas extends Component {
    render() {
        const { pizzas, deletePizza, user } = this.props;

        return (
            <div className="myPizzas">
                <Typography
                    gutterBottom
                    variant="headline"
                    component="h2"
                    align="center"
                >
                    {pizzas.length > 0
                        ? 'My Pizzas'
                        : 'Click on CREATE to add pizzas!'}
                </Typography>
                <div className="myPizzas-container">
                    {Object.keys(pizzas).map(id => {
                        const pizza = pizzas[id];
                        return (
                            <Card key={id} className="myPizzas-card">
                                <CardMedia
                                    className="myPizzas-media"
                                    image={pizza.image || defaultImage}
                                    title="Pizza"
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="headline"
                                        component="h1"
                                    >
                                        {pizza.name}
                                    </Typography>
                                    <Typography component="p">
                                        {pizza.desc}
                                    </Typography>
                                </CardContent>
                                <CardActions disableActionSpacing>
                                    {user && (
                                        <Button
                                            color="primary"
                                            type="submit"
                                            onClick={() => deletePizza(id)}
                                        >
                                            Delete
                                        </Button>
                                    )}
                                </CardActions>
                            </Card>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default MyPizzas;
