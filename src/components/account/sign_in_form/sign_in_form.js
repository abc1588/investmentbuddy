import React, {Component} from 'react';


class SignIn extends Component{

    handleSignIn = (values)=>{
        console.log('Form Values:',values);

        this.props.signIn(values);
    };

    render(){
        return (
            <div className='col s6 container'>
                <div className='card card-padout'>
                    <form>
                        <div className='input-field'>
                            <input className='input' id='email' name='email' type='text'/>
                            <label htmlFor='email'>Email</label>
                        </div>
                        <div className='input-field'>
                            <input id='password' name='password' type='text' className=''/>
                            <label htmlFor='password'>Password</label>
                        </div>
                        <button className='btn btn-small black'>Sign In</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default SignIn;
