import './ButtonComponent.scss'

const BUTTON_TYPE_CLASSES = {
    google: 'goggle-sign-in',
    default: 'default',
    inverted: 'inverted'
}



const Button = ({ children, buttonType, ...otherProps }) => {

    return (
        <button
            className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
            {...otherProps}
        >{children}

        </button>
    );
}

export default Button;