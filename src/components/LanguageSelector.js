import React, { Component } from "react";
class LanguageSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: 'en'
        };
     }

    render() {
        const { handleChange } = this.props;
        return (
            <div>
                <select className="browser-default custom-select"
                    defaultValue={this.state.lng}
                    onChange={handleChange}>
                    <option value="en">EN</option>
                    <option value="fr">FR</option>
                </select>
            </div>
        );
    }
}

export default LanguageSelector;