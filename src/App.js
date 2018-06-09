import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import materialApp from './materialApp';

import { db, auth, provider } from './firebase';

import MyPizzas from './myPizzas';
import AddPizza from './addPizza';

const dbPizzas = db.collection('pizzas');

const styles = {
    root: {
        flexGrow: 1
    },
    flex: {
        flex: 1
    }
};

class App extends Component {
    state = {
        user: null,
        create: false,
        pizzas: {},
        page: 'list'
    };

    componentDidMount() {
        this.getPizzas();
    }

    getPizzas = () => {
        dbPizzas.onSnapshot(snap => {
            const pizzas = {};

            snap.forEach(pizza => {
                const { name, desc, image } = pizza.data();

                pizzas[pizza.id] = {
                    name,
                    desc,
                    image
                };
            });

            this.setState({
                pizzas
            });
        });
    };

    addPizza = newPizza => {
        dbPizzas.doc().set(newPizza);
    };

    deletePizza = id => {
        dbPizzas.doc(id).delete();
    };

    handleClickCreate = () => {
        this.setState({ page: 'create' });
    };

    handleLogin = () => {
        auth.signInWithPopup(provider).then(res => {
            const { displayName: name, photoURL: avatar } = res.user;
            const user = { name, avatar };

            this.setState({
                user
            });
        });
    };

    handleLogout = () => {
        auth.signOut().then(() => {
            this.setState({
                user: null
            });
        });
    };

    render() {
        const { pizzas, page, user } = this.state;
        const { classes } = this.props;

        return (
            <div className="appContainer">
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="title"
                            color="inherit"
                            className={classes.flex}
                        >
                            Firebase Pizza
                        </Typography>
                        <Button
                            color="inherit"
                            onClick={() => {
                                this.setState({ page: 'list' });
                            }}
                        >
                            List
                        </Button>
                        {user && (
                            <Button
                                color="inherit"
                                onClick={() => {
                                    this.setState({ page: 'create' });
                                }}
                            >
                                Create
                            </Button>
                        )}

                        {user ? (
                            <Button color="inherit" onClick={this.handleLogout}>
                                Logout <Avatar src={user.avatar} />
                            </Button>
                        ) : (
                            <Button color="inherit" onClick={this.handleLogin}>
                                Login
                            </Button>
                        )}
                    </Toolbar>
                </AppBar>
                {page === 'list' ? (
                    <MyPizzas
                        pizzas={pizzas}
                        deletePizza={this.deletePizza}
                        user={user}
                    />
                ) : (
                    <AddPizza addPizza={this.addPizza} />
                )}
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired
};

export default materialApp(withStyles(styles)(App));
