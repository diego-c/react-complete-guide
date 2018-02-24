export default function generateInput(inputtype, config) {
    let value = '';
    if (inputtype === 'select') value = config.options[0].value;
    if (inputtype === 'input' && config.type === 'email' && this.props.auth) {
        config.defaultValue = this.props.auth.email;
        value = this.props.auth.email;
    } 
    return { inputtype, config, value, touched: false };
}