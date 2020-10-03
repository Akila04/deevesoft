import React,{Component} from 'react';
import fire from './fire';
import Login from './Login';
import Secondpage from './Secondpage'

class Firstpage extends Component{
    constructor(){
        super();
        this.state={
            user:{}
        }
    }

    componentDidMount(){
        this.authListener();
    }

    authListener(){
        fire.auth().onAuthStateChanged((user)=>{
            if(user){
                localStorage.setItem("username",user.email);
                this.setState({user});
            }
            else{
                this.setState({user:null});
            }
                
        })
    }

    render(){
        return(
            <div className="bodypage">
                {this.state.user ? <Secondpage /> : <Login />}
            </div>
        );
    }
}

export default Firstpage;