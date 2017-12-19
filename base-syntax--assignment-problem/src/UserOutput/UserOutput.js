import React from 'react';
import "./UserOutput.css";

const usernameStyle = {
    display: 'inline-block',
    color: '#378e8e',
    borderBottom: '.5rem solid #ccc',
    paddingBottom: '1rem',
    letterSpacing: '.07rem',
    fontSize: '2.5rem' 
}
const UserOutput = props => (    
    <div className="UserOutput">
        <p style={ usernameStyle }>{ props.username }</p>
        <p className="UserOutput__p">Lorem ipsum dolor sit amet, ut dicam dolore quidam mea, an eius lorem ponderum est. Ad inani error phaedrum est. Eum ut prodesset efficiantur, et vix saperet qualisque, an exerci corpora periculis his. Pri eros habeo eu. Eos ut animal temporibus, sit in oblique sadipscing.</p>
        <p className="UserOutput__p">Nec no quot epicurei elaboraret, ea nam verterem probatus ocurreret. Eu wisi corpora mea, eum causae malorum no. Mollis nominavi torquatos eu sed. Ne nihil virtute nostrum nam, populo salutatus an vim.</p>
    </div>
);

export default UserOutput;