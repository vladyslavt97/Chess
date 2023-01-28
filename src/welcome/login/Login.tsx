import { ChangeEvent, Component, FormEvent} from 'react';
import { Validation } from '../components/validation';
import { IncorrectData } from '../components/incorrectdata';
import { Link } from 'react-router-dom';

export default function Login() {
    const handleInputChange = (event: any) => {
        const property = event.target.name;
        this.setState({ ...this.state, [property]: event.target.value });
    }

    const handleSubmit = (evt: any) => {
        console.log('clicked');
        evt.preventDefault();

        fetch('/api/login/', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: this.state.email, password: this.state.password }),
        })
            .then((response) => 
                response.json())
            .then((data) => {
                if(data.validation === true){
                    console.log('generate the error');
                    // this.setState({validation: true, incorrectData: false});
                } else if(data.incorrectData === true){
                    // this.setState({validation: false, incorrectData: true});
                } else {
                    console.log("all good. Go to app page..?");
                    location.replace('/');
                    // location.reload();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

  return <div>
            {/* {validation && <Validation />}
            {incorrectData && <IncorrectData />} */}

            <form onSubmit={handleSubmit} id="registration-form">
                <div>
                    <span>Email: </span>
                    <input name="email" onChange={handleInputChange} />
                    <b className='mandatory-field'>*</b>
                </div>
                <div>
                    <span>Password: </span>
                    <input type="password" name="password" onChange={handleInputChange} />
                    <b className='mandatory-field'>*</b>
                </div>
                <button type='submit'>Login</button><br />
                <h3> You might want to <Link to="/" id='login'>Register</Link> first...</h3><br />
                <h3>Did you forget your <Link to="/reset" >password</Link>?</h3>
            </form>
        </div>
}
