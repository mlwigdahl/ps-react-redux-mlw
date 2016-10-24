import React, {PropTypes} from 'react';

class LoadingDots extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {frame: 1};
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({ // eslint-disable-line react/no-did-mount-set-state
                frame: this.state.frame + 1
            });
        }, this.props.interval);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { dots, interval, ...newProps } = this.props;
        let theseDots = this.state.frame % (dots + 1);
        let text = '';
        while (theseDots > 0) {
            text += '.';
            theseDots--;
        }
        return <span {...newProps}>{text}&nbsp;</span>;
    }
}

LoadingDots.defaultProps = {
    interval: 300, 
    dots: 3
};

LoadingDots.propTypes = {
    interval: PropTypes.number,
    dots: PropTypes.number
};

export default LoadingDots;
