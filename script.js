class App extends React.Component {
    render() {
        return (
            <Stopwatch></Stopwatch>
    );
    }
}

class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            runningWatch: false,
            intervalID: '',
            results: [],
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
        this.timer = this.timer.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
        this.save = this.save.bind(this);
        this.clear = this.clear.bind(this);
        this.format = this.format.bind(this);
    }
    timer() {
        this.setState((state) => ({
            miliseconds: state.miliseconds + 1
        }));
        if(this.state.miliseconds >=100) {
            this.setState((state) => ({
                miliseconds: 0,
                seconds: state.seconds +1
            }));
        }
        if(this.state.seconds >=60) {
            this.setState((state) => ({
                seconds: 0,
                minutes: state.minutes +1
            }));
        }
    }
    format(timeValue) {
        let formatedTimeValue = timeValue.toString();
        if(formatedTimeValue.length < 2) {
            formatedTimeValue = '0' + formatedTimeValue;
        }
        return formatedTimeValue;
    }
    start() {
        if(!this.state.runningWatch) {
            this.setState((state) => ({
                runningWatch: true,
                intervalID: setInterval(this.timer,10)
            }));
        }
    }
    stop() {
        if(this.state.runningWatch) {
            clearInterval(this.state.intervalID);
            this.setState((state) => ({
                runningWatch: false,
                intervalID: ''
            }));
        }
    }
    reset() {
        this.stop();
        this.setState((state) => ({
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        }));
    }
    save() {
        const savedResult = {
            minutes: this.format(this.state.minutes),
            seconds: this.format(this.state.seconds),
            miliseconds: this.format(this.state.miliseconds)
        };
        let currentStateResults = this.state.results;
        currentStateResults.push(savedResult);
        this.setState((state) => ({
            results: currentStateResults
        }));
    }
    clear() {
        this.setState((state) => ({
            results: []
        }));
    }
    render() {
        return (
            <div>
            <Display>
            {this.format(this.state.minutes)}:
        {this.format(this.state.seconds)}:
        {this.format(this.state.miliseconds)}
    </Display>
        <Controls
        onReset={this.reset}
        onStart={this.start}
        onStop={this.stop}
        onSave={this.save}
        onClear={this.clear}
        />
        <Results results={this.state.results}/>
        </div>
    );
    }
}

class Display extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='display'>{this.props.children}</div>
    );
    }
}

class Controls extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <nav className='navigation'>
                <ControlButton onClick={this.props.onStart}>Start</ControlButton>
                <ControlButton onClick={this.props.onStop}>Stop</ControlButton>
                <ControlButton onClick={this.props.onSave}>Save</ControlButton>
                <ControlButton onClick={this.props.onReset}>Reset</ControlButton>
                <ControlButton onClick={this.props.onClear}>Clear</ControlButton>
            </nav>
    );
    }
}

class ControlButton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <a href='#' onClick={this.props.onClick}>{this.props.children}</a>
    );
    }
}

class Results extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const data = this.props.results;
        const savedTimes = data.map(function(result, index) {
            return(
                <Result key={index}>{result.minutes}:{result.seconds}:{result.miliseconds}</Result>
        );
        });

        return (
            <ul>
            {savedTimes}
            </ul>
    );
    }
}

class Result extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <li>{this.props.children}</li>
    );
    }
}

const app = React.createElement(App);
ReactDOM.render(app, document.getElementById('app'));