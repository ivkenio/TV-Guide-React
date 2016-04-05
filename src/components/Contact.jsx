import React, { Component } from 'react';

export default class Contact extends Component {
  onSubmit(props) {

  }

  render() {
    return (
      <form //onSubmit={handleSubmit(this.onSubmit.bind(this))}
        className="col-xs-12 contact-form" style={{ marginTop: 10 }}
      >
        <h4 className="contact-form-title">Giv os din mening</h4>
        <input type="text" className="contact-form-input" placeholder="Navn" />
        <input type="text" className="contact-form-input" placeholder="E-mail" />
        <select name="" id="" className="contact-form-input">
          <option value="Generel ris/ros">Generel ris/ros</option>
          <option value="Fejl eller mangler på sitet">Fejl eller mangler på sitet</option>
          <option value="Det redaktionelle indhold">Det redaktionelle indhold</option>
        </select>
        <textarea name="" id="" cols="30" rows="10" className="contact-form-input"></textarea>
        <button className="contact-button">Send Kommentar</button>
      </form>
    );
  }
}
