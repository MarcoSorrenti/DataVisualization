import ReactGA from 'react-ga';

export default function GAEvent(category, action, label) {
    ReactGA.event({category, action, label});
}