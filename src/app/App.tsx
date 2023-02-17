import { BrowserRouter } from 'react-router-dom';
import Welcome from './welcome/welcome';

import { Provider} from "react-redux";
import { store } from "./gametype/chess/redux/store";

export default function App() {
  return (
    <Provider store={store}>
        <BrowserRouter>
            <Welcome />
        </BrowserRouter>
    </Provider>
  );
}
