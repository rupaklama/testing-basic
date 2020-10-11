// Enzyme configuration
// setupTests.js - the name of the file is very special for jest to find 
// and automatically execute the code before any other code inside of our project gets loaded
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'; // version of react using here

// new instance of adapter
Enzyme.configure({ adapter: new Adapter( ) })