import React,{Component} from 'react';
import fire from './fire';
import './styles.css';
import logo from './deeve-logo-white.png'
import swal from 'sweetalert';



class Login extends Component{

    constructor(){
        super();
        this.state={
            userid:'',
            password:'',
            loading:false
        }
    }

    changeHandler = (e) =>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    
    loginhandler = (e) =>{
        e.preventDefault();
        this.setState({loading:true});
        fire.auth().signInWithEmailAndPassword(this.state.userid,this.state.password)
            .then((user) =>{
                this.setState({loading:false})
                console.log(user);
            })
            .catch((err)=>{
                this.errorchecker(err);
                console.log(err);
            });
        
    }
    errorchecker = (err) =>{
        const error=err.code;
        this.setState({loading:false});
        const msg=<h3>{error.substring(5)}</h3>
        //alert(error.substring(5));
        swal("Oops!",error.substring(5),"error");
    }

    signuphandler = (e) =>{
        e.preventDefault();
        this.setState({loading:true})
        fire.auth().createUserWithEmailAndPassword(this.state.userid,this.state.password)
            .then((user)=>{
                this.setState({loading:false})
                console.log(user);
            })
            .catch((err)=>{
                this.errorchecker(err);
                console.log(err);
            })
    }

    render(){
        return(
            <div>
                <header className="header">
                    <div className="row">
                        <div className="col-sm-4">
                        <p className="logo">
                            <img src={logo} width="120" height="50"></img>
                        </p>
                        </div>
                        <div className="col-sm-4">
                           
                        </div>
                    </div> 
                      
                </header>
                <br /><br />
                <form>  
                <p className="heading_petdetails">LOGIN</p>
                    <input type="text" id="userid" placeholder="Enter email" 
                        value={this.state.userid}
                        onChange={(e)=>{this.changeHandler(e)}}
                        className="inputfield" required
                            />
                    <br /><br />
                    <input type="password" id="password" placeholder="Enter password" 
                        value={this.state.password}
                        onChange={(e)=>{this.changeHandler(e)}}
                        className="inputfield" required
                            />
                    <br /><br />
                    <button onClick={(e)=>{this.loginhandler(e)}} className="submit_button">
                        Login
                    </button>
                    <button onClick={(e)=>{this.signuphandler(e)}} className="submit_button">
                        Signup
                    </button>
                </form>
                {this.state.loading ? <div class="spinner-border"></div> :<p></p>}
            </div>
        );
    }
}

export default Login;