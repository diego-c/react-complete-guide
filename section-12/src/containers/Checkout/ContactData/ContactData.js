import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        fields: {
            name: '',
            address: { 
                street: '',
                postalCode: ''
            },
            email: ''
        }
    }

    orderHandler = e => {
        e.preventDefault();
        console.log(this.props.ingredients);
    }

    componentDidMount() {
        window.scroll({
            top: document.body.scrollHeight,
            left: 0,
            behavior: 'smooth'
        })
    }

    render() {
        return (
            <div className = { classes.ContactData }>
                <h4>Enter your contact data below</h4>
                <form action="">
                    <label htmlFor="name">
                        Name: <input id="name" type="text" placeholder="Your name..." />
                    </label>
                    <label htmlFor="email">
                        E-mail: <input id="email" type="email" placeholder="Your e-mail..." />
                    </label>
                    <label htmlFor="address">
                        Address: 
                        <label htmlFor="street">
                            Street: <input id = "street" type="text" placeholder="St..." />
                        </label>
                        <label htmlFor="postalCode">
                            Postal Code: <input id = "postalCode" type="number" placeholder="ZIP..." />
                        </label>
                    </label>
                    <Button
                    btnType = "Success"
                    clicked = { this.orderHandler }>ORDER</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;